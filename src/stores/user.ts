import { defineStore } from 'pinia'
import { useTodoListStore } from './todoList'

const api = useApi()
export const useUserStore = defineStore('user', () => {
  const todoListStore = useTodoListStore()
  const { todoLists } = storeToRefs(todoListStore)

  const token = ref('')
  const user = ref<IUser | null>(null)

  watch(token, async (newToken) => {
    if (newToken) {
      const response = await api.auth.me()
      const { todoLists: fetchedTodoLists, ...fetchedUser } = response.data.value
      user.value = fetchedUser
      todoLists.value = fetchedTodoLists
    }
    else {
      user.value = null
    }
  })

  return { token, user }
}, { persist: true })
