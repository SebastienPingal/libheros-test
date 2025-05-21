<script setup lang="ts">
import TodoSidebar from '@/components/sidebar/TodoSidebar.vue'

const route = useRoute()
const id = computed(() => (route.params as { id: string }).id)

const todoListsStore = useTodoListsStore()
const { todoLists } = storeToRefs(todoListsStore)

const selectedTodoList = computed(() => todoLists.value.find(list => list.id === id.value))
const selectedTodo = ref<ITodo | null>(null)
const newTodo = ref<Partial<ITodo>>({
  title: 'Nouvelle tâche',
  description: 'Description de la tâche',
  completed: false,
})

// Menu state
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function saveTodo() {
  // TODO: Implement save functionality
  isMenuOpen.value = false
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
            @click="toggleMenu"
          >
            <span class="i-ci-plus" />
            Nouvelle tâche
          </button>
        </div>
      </template>
    </Card>

    <TodoSidebar
      :is-open="isMenuOpen"
      :todo="newTodo"
      :todo-list-title="selectedTodoList?.title"
      @close="isMenuOpen = false"
      @save="saveTodo"
      @update:todo="newTodo = $event"
    />
  </div>
</template>
