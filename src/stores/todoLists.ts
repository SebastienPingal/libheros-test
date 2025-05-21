import { defineStore } from 'pinia'

export const useTodoListsStore = defineStore('todoLists', () => {
  const todoLists = ref<ITodoList[]>([])
  const selectedTodoList = ref<ITodoList | null>(null)

  return { todoLists, selectedTodoList }
})
