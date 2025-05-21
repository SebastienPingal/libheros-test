<script setup lang="ts">
const props = defineProps<{
  selectedTodoListId: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const visible = ref(true)
const toast = useToast()

const todoListsStore = useTodoListsStore()

const title = ref('')
const description = ref('')
const expirationDate = ref(null)

const { createTodo } = todoListsStore

function handleCreateTodo() {
  if (!expirationDate.value) {
    toast.add({
      summary: 'Erreur',
      detail: 'La date d\'expiration est obligatoire',
      severity: 'error',
    })

    return
  }

  createTodo(expirationDate.value, title.value, description.value)
  visible.value = false
  title.value = ''
  description.value = ''
  expirationDate.value = null
  emit('close')
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    :draggable="false"
    header="Nouvelle tâche"
  >
    <form class="flex flex-col gap-4" @submit.prevent="handleCreateTodo">
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
