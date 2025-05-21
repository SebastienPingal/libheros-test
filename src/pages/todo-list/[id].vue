<script setup lang="ts">
import TodoSidebar from '@/components/sidebar/TodoSidebar.vue'

const route = useRoute()
const api = useApi()

const selectedTodoListId = computed(() => (route.params as { id: string }).id)
const selectedTodoId = ref<string | null>(null)

const todoListsStore = useTodoListsStore()
const { todoLists } = storeToRefs(todoListsStore)

const selectedTodoList = computed(() => todoLists.value.find(list => list.id === selectedTodoListId.value))
const selectedTodo = computed(() => selectedTodoList.value?.todos.find(todo => todo.id === selectedTodoId.value))

// Menu state
const isMenuOpen = ref(false)

async function createTodo() {
  if (!selectedTodoList.value) return

  const response = await api.todo.create(selectedTodoList.value.id, 'Nouvelle tâche', 'Description de la tâche')
  if (response.data.value) {
    selectedTodoList?.value?.todos.push(response.data.value)
    selectedTodoId.value = response.data.value.id
    isMenuOpen.value = true
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
          <div v-for="todo in selectedTodoList?.todos" :key="todo.id" class="flex items-center gap-2">
            {{ todo.title }}
          </div>
          <button
            class="flex items-center justify-center gap-2 rounded-md bg-blue-500 p-2 text-white"
            @click="createTodo"
          >
            <span class="i-ci-plus" />
            Nouvelle tâche
          </button>
        </div>
      </template>
    </Card>

    <TodoSidebar
      v-if="selectedTodo"
      :is-open="isMenuOpen"
      :todo="selectedTodo"
      @close="isMenuOpen = false"
    />
  </div>
</template>
