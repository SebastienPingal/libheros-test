<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const userStore = useUserStore()
const todoListsStore = useTodoListsStore()

const { user } = storeToRefs(userStore)
const { todoLists } = storeToRefs(todoListsStore)

// Responsive
const isSidebarOpen = defineModel<boolean>()
const breakpoints = useBreakpoints(breakpointsTailwind)
watch(breakpoints.md, (value: boolean) => {
  isSidebarOpen.value = value
}, { immediate: true })

function closeSidebarOnMobile() {
  if (breakpoints.md.value) return

  isSidebarOpen.value = false
}

// Sections related
const route = useRoute()

watch(() => route.path, () => {
  closeSidebarOnMobile()
})

const items = computed(() => [
  ...todoLists.value.map((list: ITodoList) => ({
    label: list.title,
    icon: 'i-ci-list-check',
    route: `/todo-list/${list.id}`,
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
      <router-link
        class="m-0 flex w-full items-center gap-2 rounded-none p-0"
        :to="item.route"
      >
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
      </router-link>
    </template>
    <template #end>
      <NewListButton class="w-full" />
    </template>
  </menu>
</template>

<style scoped>
:deep(.p-menu-list) {
  @apply m-0 rounded-none bg-red-100 p-0 dark:bg-surface-900;
}
</style>
