<script setup lang="ts">
const router = useRouter()

function goBack() {
  router.back()
}

function goHome() {
  router.push('/')
}
</script>

<template>
  <div class="flex h-full flex-col items-center justify-center p-4">
    <Card class="max-w-md">
      <template #header>
        <div class="text-primary flex items-center justify-center py-5 text-9xl font-bold">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>
      </template>
      <template #content>
        <div class="flex flex-col items-center gap-6 p-4 text-center">
          <h1 class="text-2xl font-bold">Page not found</h1>
          <p class="text-surface-600 dark:text-surface-400">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div class="flex flex-wrap gap-2">
            <Button
              icon="i-ci-arrow-left-lg"
              label="Go Back"
              outlined
              @click="goBack"
            />
            <Button icon="i-ci-house-01" label="Go Home" @click="goHome" />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
