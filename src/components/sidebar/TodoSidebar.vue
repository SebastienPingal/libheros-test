<script setup lang="ts">
const props = defineProps<{
  isOpen: boolean
  todo: Partial<ITodo>
}>()

function selectAllText(event: FocusEvent) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  target.select()
}
</script>

<template>
  <div
    class="fixed right-0 top-0 flex h-full w-96 flex-col gap-4 bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <Inplace>
      <template #display>
        <h2 class="text-xl font-bold">{{ todo.title }}</h2>
      </template>
      <template #content>
        <InputText
          autofocus
          :model-value="todo.title"
          @focus="selectAllText"
          @update:model-value="updateTodo('title', $event)"
        />
      </template>
    </Inplace>

    <Inplace>
      <template #display>
        <label class="w-full font-medium">Description</label>
      </template>
      <template #content>
        <Textarea
          autofocus
          class="w-full"
          :model-value="todo.description"
          @focus="selectAllText"
          @update:model-value="updateTodo('description', $event)"
        />
      </template>
    </Inplace>

    <Button
      class="w-full"
      icon="i-ci-save"
      label="Sauvegarder"
      @click="saveTodo"
    />
  </div>
</template>
