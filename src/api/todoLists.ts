import type { ToastServiceMethods } from 'primevue'

export function todoListsApiRepository() {
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

  function getAll(userId: string) {
    return useApiFetch<ITodoList[]>(
      `/todo-lists/${userId}`,
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

  function create(title: string, userId: string) {
    return useApiFetch<ITodoList>(
      `/todo-lists/${userId}`,
      {
        method: 'POST',
        body: JSON.stringify(title),
      },
      {
        success: {
          summary: '📝 Todo list created successfully',
          detail: 'Your new todo list has been created',
        },
        error: {
          summary: '❌ Todo list creation failed',
          detail: 'Unable to create todo list. Please try again.',
        },
      },
      toast,
    ).json()
  }

  function update(todoList: ITodoList) {
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

  function remove(id: string) {
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
    getAll,
    create,
    update,
    remove,
  }
}
