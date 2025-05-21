<script setup lang="ts">
import { useHead } from '@unhead/vue'

const route = useRoute()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const pageWithNavigation = computed(() =>
  route.name && !['/maintenance', '/[...404]'].includes(route.name),
)

useHead({
  title: 'Liste de Tâches',
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
  <div class="flex h-screen overflow-hidden bg-surface-50 dark:bg-surface-950">
    <ConfirmDialog dismissable-mask />

    <TheSidebar v-if="user && pageWithNavigation" />
    <div class="flex grow flex-col overflow-hidden">
      <BaseToast />
      <RouterView
        class="overflow-y-auto bg-surface-100 px-2 py-6 dark:bg-surface-900 md:mr-4 md:px-6 md:py-8"
        :style="{ minHeight: `calc(100vh)` }"
      />
    </div>
  </div>
</template>
