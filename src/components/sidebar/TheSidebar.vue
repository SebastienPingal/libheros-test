<script setup lang="ts">
import type { MenuItem } from 'primevue/menuitem'

const userStore = useUserStore()
const todoListsStore = useTodoListsStore()

const { user } = storeToRefs(userStore)
const { todoLists } = storeToRefs(todoListsStore)
const { deleteTodoList } = todoListsStore

const isDeleteDialogVisible = ref(false)
const itemToDelete = ref<MenuItem | null>(null)

const items = computed(() => [
  ...todoLists.value.map((list: ITodoList) => ({
    label: list.title,
    icon: 'i-ci-list-check',
    route: `/todo-list/${list.id}`,
    id: list.id,
  })),
])
</script>

<template>
  <Menu
    class="m-0 rounded-none p-0 shadow-lg"
    :model="items"
  >
    <template #start>
      <button v-ripple class="relative flex w-full flex-col items-start gap-1 overflow-hidden rounded-none border-0 bg-transparent p-2 pl-4 transition-colors duration-200">
        <span>{{ user?.name }}</span>
        <span class="text-sm">{{ user?.email }}</span>
      </button>
    </template>
    <template #item="{ item }">
      <div class="flex w-full items-center justify-between">
        <router-link
          class="m-0 flex h-10 w-full items-center gap-2 rounded-none"
          :to="item.route"
        >
          <span :class="item.icon" />
          <span>{{ item.label }}</span>
        </router-link>
        <Button
          aria-label="Supprimer la liste"
          icon="i-ci-trash-empty"
          rounded
          severity="danger"
          text
          @click="isDeleteDialogVisible = true; itemToDelete = item"
        />
      </div>
    </template>
    <template #end>
      <NewListButton class="w-full" />
    </template>
  </menu>
  <DeleteDialog
    v-model:is-visible="isDeleteDialogVisible"
    :message="`Voulez-vous vraiment supprimer la liste ${itemToDelete?.label} ? Cela supprimera toutes les tâches associées.`"
    :title="`Supprimer la liste ${itemToDelete?.label}`"
    @cancel="isDeleteDialogVisible = false"
    @delete="deleteTodoList(itemToDelete?.id)"
  />
</template>

<style scoped>
:deep(.p-menu-list) {
  @apply m-0 rounded-none bg-red-100 p-0 dark:bg-surface-900;
}
</style>
