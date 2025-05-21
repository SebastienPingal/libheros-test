<script setup lang="ts">
const route = useRoute()
const id = computed(() => (route.params as { id: string }).id)

const todoListsStore = useTodoListsStore()
const { todoLists } = storeToRefs(todoListsStore)

const selectedTodoList = computed(() => todoLists.value.find(list => list.id === id.value))

// Menu state
const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="relative">
    <Card class="m-4 max-w-2xl">
      <template #title>
        <h1>{{ selectedTodoList?.title }}</h1>
      </template>
      <template #content>
        <div class="flex flex-col gap-2">
          <div v-for="todo in selectedTodoList?.todos" :key="todo.id" class="flex items-center gap-2">
            {{ todo.title }}
          </div>
          <button
            class="flex items-center justify-center gap-2 rounded-md bg-blue-500 p-2 text-white"
            @click="toggleMenu"
          >
            <span class="i-ci-plus" />
            Nouvelle tâche
          </button>
        </div>
      </template>
    </Card>

    <div
      class="fixed right-0 top-0 h-full w-80 bg-white shadow-lg transition-transform duration-300 ease-in-out"
      :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="border-b p-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">Détails de la liste</h2>
          <button class="p-2" @click="toggleMenu">
            <span class="i-ci-close text-lg" />
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-4 p-4">
        <div class="flex flex-col gap-2">
          <label class="font-medium">Titre</label>
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-medium">Description</label>
        </div>
        <div class="flex justify-end">
          <Button icon="i-ci-save" label="Sauvegarder" />
        </div>
      </div>
    </div>
  </div>
</template>
