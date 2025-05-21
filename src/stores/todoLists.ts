import { defineStore } from 'pinia'

export const useTodoListsStore = defineStore('todoLists', () => {
  const todoLists = ref<ITodoList[]>([])
  const route = useRoute()

  const selectedTodo = ref<ITodo | null>(null)

  const selectedTodoListId = computed(() => (route.params as { id: string }).id)
  const selectedTodoList = computed(() => todoLists.value.find(list => list.id === selectedTodoListId.value))

  const api = useApi()

  async function updateTodo(todoId: string, data: Partial<ITodo>) {
    if (!selectedTodoList.value) return

    try {
      const response = await api.todo.update(todoId, data)
      if (!response.data.value) return

      const todoIndex = selectedTodoList.value.todos.findIndex(t => t.id === todoId)
      if (todoIndex !== -1) {
        selectedTodoList.value.todos[todoIndex] = response.data.value
      }

      return response.data.value
    }
    catch (error) {
      console.error('📛 Error updating todo:', error)
    }
  }

  async function createTodo(expirationDate: Date, title: string, description: string) {
    const response = await api.todo.create(selectedTodoListId.value, title, description, expirationDate)
    const selectedTodoList = todoLists.value.find(todoList => todoList.id === selectedTodoListId.value)
    if (selectedTodoList) {
      selectedTodoList.todos.push(response.data.value)
    }
  }

  return { todoLists, selectedTodo, selectedTodoList, updateTodo, createTodo }
})
