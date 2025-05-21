<script setup lang="ts">
import useDateFormatter from '~/composables/useDateFormatter'

defineProps<{
  isOpen?: boolean
}>()

const todoListsStore = useTodoListsStore()
const { selectedTodo, selectedTodoList } = storeToRefs(todoListsStore)
const { updateTodo } = todoListsStore

const originalTitle = computed(() => selectedTodo.value?.title)
const originalDescription = computed(() => selectedTodo.value?.description)
const originalExpirationDate = computed(() => selectedTodo.value?.expirationDate)

const newTitle = ref(originalTitle.value)
const newDescription = ref(originalDescription.value)
const newExpirationDate = ref(originalExpirationDate.value)

const titleInplaceActive = ref(false)
const descriptionInplaceActive = ref(false)
const expirationDateInplaceActive = ref(false)

const isDataChanged = computed(() => {
  if (newTitle.value !== originalTitle.value) return true
  if (newDescription.value !== originalDescription.value) return true

  return false
})

function selectAllText(event: FocusEvent) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  target.select()
}

const formatedDate = computed(() => useDateFormatter(selectedTodo.value?.createdAt))

watch(selectedTodo, () => {
  newTitle.value = originalTitle.value
  newDescription.value = originalDescription.value
  titleInplaceActive.value = false
  descriptionInplaceActive.value = false
})

async function saveTodoChanges() {
  if (!selectedTodo.value?.id) return

  await updateTodo(selectedTodo.value.id, {
    title: newTitle.value,
    description: newDescription.value,
    expirationDate: newExpirationDate.value,
  })

  selectedTodo.value = null
}
</script>

<template>
  <div
    class="fixed right-0 top-0 flex h-full w-96 flex-col gap-4 bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out"
    :class="isOpen ? 'translate-x-0' : 'translate-x-full'"
  >
    <div class="flex items-start justify-between">
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
      <Button
        icon="i-ci-close-lg"
        severity="secondary"
        @click="selectedTodo = null"
      />
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

    <Inplace v-model:active="expirationDateInplaceActive">
      <template #display>
        <p class="w-full">Doit être terminé le  {{ useDateFormatter(originalExpirationDate) }}</p>
      </template>
      <template #content>
        <DatePicker v-model="newExpirationDate" />
      </template>
    </Inplace>

    <Button
      v-if="isDataChanged"
      class="w-full"
      icon="i-ci-save"
      label="Sauvegarder"
      @click="saveTodoChanges"
    />
  </div>
</template>
