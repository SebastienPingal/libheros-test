<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const userStore = useUserStore()
const todoListStore = useTodoListStore()

const { user } = storeToRefs(userStore)
const { todoLists } = storeToRefs(todoListStore)

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
  ...todoLists.value.map(list => ({
    label: list.title,
    icon: 'i-ci-list-check',
    route: `/todo-lists/${list.id}`,
  })),
  {
    icon: 'i-ci-add-plus',
    label: 'Create Todo List',
    route: '/test',
  },
])
</script>

<template>
  <Menu :model="items">
    <template v-if="user" #start>
      <button v-ripple class="relative flex w-full flex-col items-start gap-1 overflow-hidden rounded-none border-0 bg-transparent p-2 pl-4 transition-colors duration-200">
        <span>{{ user.name }}</span>
        <span class="text-sm">{{ user.email }}</span>
      </button>
    </template>
    <template #item="{ item }">
      <router-link
        class="flex gap-2"
        :to="item.route"
      >
        <span :class="item.icon" />
        <span>{{ item.label }}</span>
      </router-link>
    </template>
  </Menu>
</template>
