import type { ToastServiceMethods } from 'primevue'

export function todoListApiRepository() {
  let toast: ToastServiceMethods | undefined
  try {
    toast = useToast()
  }
  catch (e) {
    if (e instanceof Error && e.message.includes('No PrimeVue Toast provided')) {
      console.warn('⚠️ No PrimeVue Toast provided! Proceeding without toast notification.')
      toast = undefined
    }
  }

  function getTodoLists() {
    return useApiFetch<ITodoList[]>(
      '/todo-lists',
      {
        method: 'GET',
      },
      {
        success: {
          summary: 'Todo lists fetched successfully',
          detail: 'Todo lists fetched successfully',
        },
        error: {
          summary: 'Todo lists fetch failed',
          detail: 'Todo lists fetch failed',
        },
      },
      toast,
    ).json()
  }

  function createTodoList(todoList: ITodoList) {
    return useApiFetch<ITodoList>(
      '/todo-lists',
      {
        method: 'POST',
        body: JSON.stringify(todoList),
      },
      {
        success: {
          summary: 'Todo list created successfully',
          detail: 'Todo list created successfully',
        },
        error: {
          summary: 'Todo list creation failed',
          detail: 'Todo list creation failed',
        },
      },
      toast,
    ).json()
  }

  function updateTodoList(todoList: ITodoList) {
    return useApiFetch<ITodoList>(
      `/todo-lists/${todoList.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(todoList),
      },
      {
        success: {
          summary: 'Todo list updated successfully',
          detail: 'Todo list updated successfully',
        },
        error: {
          summary: 'Todo list update failed',
          detail: 'Todo list update failed',
        },
      },
      toast,
    ).json()
  }

  function deleteTodoList(id: string) {
    return useApiFetch<void>(
      `/todo-lists/${id}`,
      {
        method: 'DELETE',
      },
      {
        success: {
          summary: 'Todo list deleted successfully',
          detail: 'Todo list deleted successfully',
        },
      },
      toast,
    ).json()
  }

  return {
    getTodoLists,
    createTodoList,
    updateTodoList,
    deleteTodoList,
  }
}
