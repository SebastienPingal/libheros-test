<script setup lang="ts">
import TodoSidebar from '@/components/sidebar/TodoSidebar.vue'

const route = useRoute()
const api = useApi()

const todoListsStore = useTodoListsStore()
const { todoLists } = storeToRefs(todoListsStore)

const selectedTodoListId = computed(() => (route.params as { id: string }).id)
const selectedTodoId = ref<string | null>(null)

const selectedTodoList = computed(() => todoLists.value.find(list => list.id === selectedTodoListId.value))
const selectedTodo = computed(() => {
  if (!selectedTodoList.value) return null

  return selectedTodoList.value.todos.find(todo => todo.id === selectedTodoId.value)
})

// Sort todos by creation date (oldest first, most recent last)
const displayedTodos = computed(() => {
  if (!selectedTodoList.value) return []

  return [...selectedTodoList.value.todos]
    .filter(todo => !todo.completed)
    .sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
})

const hiddenTodos = computed(() => {
  if (!selectedTodoList.value) return []

  return [...selectedTodoList.value.todos]
    .filter(todo => todo.completed)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
})

// Menu state
const isMenuOpen = ref(false)

// Open menu when selectedTodoId changes from null to non-null
watch(selectedTodoId, (newValue) => {
  if (newValue !== null) {
    isMenuOpen.value = true
  }
})

async function createTodo() {
  if (!selectedTodoList.value) return

  const response = await api.todo.create(selectedTodoList.value.id, 'Nouvelle tâche', 'Vous pouvez modifier la description de la tâche et le titre en cliquant sur le champ correspondant')
  if (response.data.value) {
    selectedTodoList?.value?.todos.push(response.data.value)
    selectedTodoId.value = response.data.value.id
  }
}

async function updateTodo(todo: ITodo, data: Partial<ITodo>) {
  if (!selectedTodoList.value) return

  try {
    const response = await api.todo.update(todo.id, data)
    if (!response.data.value) return

    const todoIndex = selectedTodoList.value.todos.findIndex(t => t.id === todo.id)
    if (todoIndex !== -1) {
      selectedTodoList.value.todos[todoIndex] = response.data.value
    }
  }
  catch (error) {
    console.error('❌ Error updating todo:', error)
  }
}
</script>

<template>
  <div class="relative">
    <Card class="m-4 max-w-2xl">
      <template #title>
        <h1>{{ selectedTodoList?.title }}</h1>
      </template>
      <template #content>
        <div class="flex flex-col gap-2">
          <TodoItem
            v-for="todo in displayedTodos"
            :key="todo.id"
            :todo
            @click="selectedTodoId = todo.id"
            @update:completed="updateTodo(todo, { completed: $event })"
          />

          <Button
            class="flex items-center justify-center gap-2 rounded-md"
            @click="createTodo"
          >
            <span class="i-ci-plus" />
            Nouvelle tâche
          </Button>

          <Panel
            v-if="hiddenTodos.length > 0"
            collapsed
            header="Tâches complétées"
            toggleable
          >
            <div class="flex flex-col gap-2">
              <TodoItem
                v-for="todo in hiddenTodos"
                :key="todo.id"
                :todo
                @click="selectedTodoId = todo.id"
                @update:completed="updateTodo(todo, { completed: $event })"
              />
            </div>
          </Panel>
        </div>
      </template>
    </Card>

    <TodoSidebar
      v-if="selectedTodo"
      :is-open="isMenuOpen"
      :todo="selectedTodo"
      @close="isMenuOpen = false"
      @save-changes="updateTodo(selectedTodo, $event)"
    />
  </div>
</template>
