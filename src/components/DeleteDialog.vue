<script setup lang="ts">
const props = defineProps<{
  title: string
  message: string
}>()

const emit = defineEmits<{
  (e: 'delete'): void
  (e: 'cancel'): void
}>()

const isVisible = defineModel<boolean>('isVisible')

function handleDelete() {
  emit('delete')
  isVisible.value = false
}

function handleCancel() {
  emit('cancel')
  isVisible.value = false
}
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    :draggable="false"
    :header="title"
    :resizable="false"
  >
    <p>{{ message }}</p>
    <template #footer>
      <Button label="Annuler" severity="secondary" @click="handleCancel" />
      <Button label="Supprimer" severity="danger" @click="handleDelete" />
    </template>
  </Dialog>
</template>
