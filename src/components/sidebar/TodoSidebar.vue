<script setup lang="ts">
import useDateFormatter from '~/composables/useDateFormatter'

const props = defineProps<{
  isOpen: boolean
  todo: ITodo
}>()

const emit = defineEmits<{
  saveChanges: [{
    title: string
    description: string
  }]
}>()

const originalTitle = computed(() => props.todo.title)
const originalDescription = computed(() => props.todo.description)

const newTitle = ref(originalTitle.value)
const newDescription = ref(originalDescription.value)

const titleInplaceActive = ref(false)
const descriptionInplaceActive = ref(false)

const isDataChanged = computed(() => {
  if (newTitle.value !== originalTitle.value) return true
  if (newDescription.value !== originalDescription.value) return true

  return false
})

function selectAllText(event: FocusEvent) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  target.select()
}

const formatedDate = useDateFormatter(props.todo.createdAt)

watch(props, () => {
  newTitle.value = originalTitle.value
  newDescription.value = originalDescription.value
  titleInplaceActive.value = false
  descriptionInplaceActive.value = false
})

function saveChanges() {
  console.log('saveChanges')
  emit('saveChanges', {
    title: newTitle.value,
    description: newDescription.value,
  })
}
</script>

<template>
  <div
    class="fixed right-0 top-0 flex h-full w-96 flex-col gap-4 bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div>
      <Inplace v-model:active="titleInplaceActive">
        <template #display>
          <h2 class="text-xl font-bold">{{ originalTitle }}</h2>
        </template>
        <template #content>
          <InputText
            v-model="newTitle"
            autofocus
            @focus="selectAllText"
          />
        </template>
      </Inplace>
      <p class="text-sm text-gray-500">
        Créé le {{ formatedDate }}
      </p>
    </div>

    <Inplace v-model:active="descriptionInplaceActive">
      <template #display>
        <p class="w-full">{{ originalDescription }}</p>
      </template>
      <template #content>
        <Textarea
          v-model="newDescription"
          auto-resize
          autofocus
          class="w-full"
          @focus="selectAllText"
        />
      </template>
    </Inplace>

    <Button
      v-if="isDataChanged"
      class="w-full"
      icon="i-ci-save"
      label="Sauvegarder"
      @click="saveChanges"
    />
  </div>
</template>
