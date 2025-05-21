import { authApiRepository } from '@/api/auth'
import { todoListsApiRepository } from '@/api/todoLists'
import { todoApiRepository } from '@/api/todo'

export function useApi() {
  return {
    auth: authApiRepository(),
    todoLists: todoListsApiRepository(),
    todo: todoApiRepository(),
  }
}
