<script setup lang="ts">
const todoListsStore = useTodoListsStore()
const { todoLists } = storeToRefs(todoListsStore)
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const api = useApi()

const active = ref(false)
const newListTitle = ref('')

const canSaveNewTodoList = computed(() => {
  const title = newListTitle.value.trim()

  // TODO handle displaying error message
  return title.length > 0 && !todoLists.value.some((list: ITodoList) => list.title.toLowerCase() === title.toLowerCase())
})

async function createTodoList() {
  if (!canSaveNewTodoList.value) return
  if (!user.value?.id) return

  const response = await api.todoLists.create(newListTitle.value)
  if (response.data.value) {
    todoLists.value.push(response.data.value)
    newListTitle.value = ''
    active.value = false
  }
}
</script>

<template>
  <div class="w-full">
    <Inplace
      v-model:active="active"
      class="w-full"
    >
      <template #display>
        <Button class="w-full rounded-none">
          <span class="text-sm">
            nouvelle liste
          </span>
          <Icon name="i-ci-plus" />
        </Button>
      </template>
      <template #content>
        <div class="flex flex-col gap-2">
          <InputText v-model="newListTitle" class="rounded-none" placeholder="Nomez votre liste" />
          <Button
            v-if="newListTitle"
            class="rounded-none"
            :disabled="!canSaveNewTodoList"
            @click="createTodoList"
          >
            <span class="text-sm">créer</span>
            <Icon name="i-ci-plus" />
          </Button>
        </div>
      </template>
    </Inplace>
  </div>
</template>

<style scoped>
:deep(.p-inplace-display) {
  @apply w-full rounded-none p-0 m-0;
}
</style>
