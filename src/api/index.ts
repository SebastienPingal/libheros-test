import { authApiRepository } from '@/api/auth'
import { todoListsApiRepository } from '@/api/todoLists'

export function useApi() {
  return {
    auth: authApiRepository(),
    todoLists: todoListsApiRepository(),
  }
}
