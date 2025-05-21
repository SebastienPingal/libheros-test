import { defineStore } from 'pinia'
import { useTodoListsStore } from './todoLists'
import { router } from '~/router'

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
      router.push('/')
    }
    else {
      user.value = null
    }
  })

  function logout() {
    token.value = ''
    user.value = null
    router.push('/login')
  }

  return { token, user, logout }
}, { persist: true })
