<script setup lang="ts">
import { useHead } from '@unhead/vue'

const route = useRoute()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const pageWithNavigation = computed(() =>
  route.name && !['/maintenance', '/[...404]'].includes(route.name),
)

const isSidebarOpen = ref(false)

useHead({
  title: () => {
    switch (import.meta.env.VITE_MODE) {
      case 'development':
        return 'DEV Liste de Tâches'
      case 'int':
        return 'INT Liste de Tâches'
      default:
        return 'Liste de Tâches'
    }
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <div class="flex bg-surface-50 dark:bg-surface-950">
    <ConfirmDialog dismissable-mask />

    <TheSidebar v-if="user && pageWithNavigation" v-model="isSidebarOpen" class="h-screen w-64" />
    <div class="flex grow flex-col overflow-hidden">
      <BaseToast />
      <RouterView
        class="bg-surface-100 px-2 py-6 dark:bg-surface-900 md:mr-4 md:px-6 md:py-8"
        :style="{ minHeight: `calc(100vh)` }"
      />
    </div>
  </div>
</template>
