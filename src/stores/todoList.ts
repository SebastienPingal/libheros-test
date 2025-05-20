import { defineStore } from 'pinia'

export const useTodoListStore = defineStore('todoList', () => {
  const todoLists = ref<ITodoList[]>([])
  const selectedTodoList = ref<ITodoList | null>(null)

  return { todoLists, selectedTodoList }
})
