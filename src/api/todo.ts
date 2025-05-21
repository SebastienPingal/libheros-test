import type { ToastServiceMethods } from 'primevue'

export function todoApiRepository() {
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

  function create(todoListId: string, title: string, description: string) {
    return useApiFetch<ITodo>(
      `/todos/todo-list/${todoListId}`,
      {
        method: 'POST',
        body: JSON.stringify({ title, description }),
      },
      {
        success: {
          summary: 'Todo created successfully',
          detail: 'Todo created successfully',
        },
        error: {
          summary: 'Todo creation failed',
          detail: 'Todo creation failed',
        },
      },
      toast,
    ).json()
  }

  function update(todoId: string, data: Partial<ITodo>) {
    return useApiFetch<ITodo>(
      `/todos/${todoId}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
      },
      {
        success: {
          summary: 'Todo updated successfully',
          detail: 'Todo updated successfully',
        },
        error: {
          summary: 'Todo update failed',
          detail: 'Todo update failed',
        },
      },
      toast,
    ).json()
  }

  function remove(todoId: string) {
    return useApiFetch<void>(
      `/todos/${todoId}`,
      { method: 'DELETE' },
    ).json()
  }

  return {
    create,
    update,
    remove,
  }
}
