<script setup lang="ts">
const props = defineProps<{
  todo: ITodo
}>()

const emit = defineEmits<{
  'update:completed': [completed: boolean]
}>()

const completed = computed({
  get: () => props.todo.completed,
  set: value => emit('update:completed', value),
})
</script>

<template>
  <div class="flex w-full items-center">
    <Checkbox
      v-model="completed"
      binary
      class="mr-2"
      @update:checked="emit('update:completed', $event)"
    />
    <Button
      class="grow justify-start"
      variant="text"
    >
      <span>{{ todo.title }}</span>
    </Button>
  </div>
</template>
