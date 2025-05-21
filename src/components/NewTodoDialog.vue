<script setup lang="ts">
const props = defineProps<{
  selectedTodoListId: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const api = useApi()
const toast = useToast()

const visible = ref(true)

const todoListsStore = useTodoListsStore()
const { todoLists } = storeToRefs(todoListsStore)

const title = ref('')
const description = ref('')
const expirationDate = ref(null)

async function createTodo() {
  if (!expirationDate.value) {
    toast.add({
      summary: 'Erreur',
      detail: 'La date d\'expiration est obligatoire',
      severity: 'error',
    })

    return
  }
  const response = await api.todo.create(props.selectedTodoListId, title.value, description.value, expirationDate.value)
  const selectedTodoList = todoLists.value.find(todoList => todoList.id === props.selectedTodoListId)
  if (selectedTodoList) {
    selectedTodoList.todos.push(response.data.value)
  }
  title.value = ''
  description.value = ''
  expirationDate.value = null
  visible.value = false
  emit('close')
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :draggable="false"
    header="Nouvelle tâche"
  >
    <form class="flex flex-col gap-4" @submit.prevent="createTodo">
      <InputText v-model="title" placeholder="Titre" required />
      <Textarea v-model="description" placeholder="Description" />
      <DatePicker v-model="expirationDate" placeholder="Date d'expiration" required />
      <Button type="submit">
        <span class="i-ci-plus" />
        Créer
      </Button>
    </form>
  </Dialog>
</template>
