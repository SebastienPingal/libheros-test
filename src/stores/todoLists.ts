import { defineStore } from 'pinia'

export const useTodoListsStore = defineStore('todoLists', () => {
  const api = useApi()
  const userStore = useUserStore()
  const { user } = storeToRefs(userStore)

  const todoLists = ref<ITodoList[]>([])
  const selectedTodoList = ref<ITodoList | null>(null)

  async function createTodoList(title: string) {
    if (!user.value?.id) return
    const response = await api.todoLists.create(title, user.value.id)
    todoLists.value.push(response.data.value)
  }

  return { todoLists, selectedTodoList, createTodoList }
})
