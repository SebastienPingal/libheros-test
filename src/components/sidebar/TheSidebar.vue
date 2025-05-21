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
    route: `/todo-lists/${list.id}`,
  })),
])
</script>

<template>
  <Menu
    class="rounded-none shadow-lg"
    :model="items"
  >
    <template #start>
      <button v-if="user" v-ripple class="relative flex w-full flex-col items-start gap-1 overflow-hidden rounded-none border-0 bg-transparent p-2 pl-4 transition-colors duration-200">
        <span>{{ user.name }}</span>
        <span class="text-sm">{{ user.email }}</span>
      </button>
    </template>
    <template #item="{ item }">
      <router-link
        class="flex w-full items-center gap-2"
        :to="item.route"
      >
        <Button
          class="w-full"
          :icon="item.icon"
          :label="typeof item.label === 'function' ? item.label() : (item.label || '')"
        />
      </router-link>
    </template>
    <template #end>
      <NewListButton class="w-full" />
    </template>
  </menu>
</template>
