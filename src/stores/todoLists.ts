import { defineStore } from 'pinia'

export const useTodoListsStore = defineStore('todoLists', () => {
  const todoLists = ref<ITodoList[]>([])

  return { todoLists }
})
