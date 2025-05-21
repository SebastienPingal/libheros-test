<script setup lang="ts">
import TodoSidebar from '@/components/sidebar/TodoSidebar.vue'

const todoListsStore = useTodoListsStore()
const { selectedTodoList, selectedTodo } = storeToRefs(todoListsStore)
const { updateTodo } = todoListsStore

const displayedTodos = computed(() => {
  if (!selectedTodoList.value) return []

  return [...selectedTodoList.value.todos]
    .filter(todo => !todo.completed)
    .sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    })
})

const hiddenTodos = computed(() => {
  if (!selectedTodoList.value) return []

  return [...selectedTodoList.value.todos]
    .filter(todo => todo.completed)
    .sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
})

const isNewTodoDialogOpen = ref(false)
const isSidebarOpen = ref(false)

watch(selectedTodo, () => {
  isSidebarOpen.value = !!selectedTodo.value
})
</script>

<template>
  <div class="relative">
    <Card class="m-4 max-w-2xl">
      <template #title>
        <h1>{{ selectedTodoList?.title }}</h1>
      </template>
      <template #content>
        <div class="flex flex-col gap-2">
          <TodoItem
            v-for="todo in displayedTodos"
            :key="todo.id"
            :todo
            @click="selectedTodo = todo"
            @update:completed="updateTodo(todo.id, { completed: $event })"
          />

          <Button
            class="flex items-center justify-center gap-2 rounded-md"
            @click="isNewTodoDialogOpen = true"
          >
            <span class="i-ci-plus" />
            Nouvelle tâche
          </Button>

          <Panel
            v-if="hiddenTodos.length > 0"
            collapsed
            header="Tâches complétées"
            toggleable
          >
            <div class="flex flex-col gap-2">
              <TodoItem
                v-for="todo in hiddenTodos"
                :key="todo.id"
                :todo
                @click="selectedTodo = todo"
                @update:completed="updateTodo(todo.id, { completed: $event })"
              />
            </div>
          </Panel>
        </div>
      </template>
    </Card>

    <TodoSidebar
      :is-open="isSidebarOpen"
      @close="isSidebarOpen = false"
    />

    <NewTodoDialog
      v-if="selectedTodoList"
      v-model:visible="isNewTodoDialogOpen"
      :selected-todo-list-id="selectedTodoList.id"
      @close="isNewTodoDialogOpen = false"
    />
  </div>
</template>
