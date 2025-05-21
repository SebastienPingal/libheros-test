import { defineStore } from 'pinia'
import { useTodoListsStore } from './todoLists'

const api = useApi()
export const useUserStore = defineStore('user', () => {
  const todoListsStore = useTodoListsStore()
  const { todoLists } = storeToRefs(todoListsStore)

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
