<script setup>
import CryptoJS from 'crypto-js'

const toast = useToast()

const userStore = useUserStore()
const { token, user } = storeToRefs(userStore)

const loginForm = ref({
  email: '',
  password: '',
})

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const api = useApi()

async function handleLogin() {
  const hashedPassword = CryptoJS.SHA256(loginForm.value.password).toString()
  const response = await api.auth.login({
    ...loginForm.value,
    password: hashedPassword,
  })
  token.value = response.data.value.token
}

async function handleRegister() {
  const { name, email, password, confirmPassword } = registerForm.value
  if (!name || !email || !password || !confirmPassword) return
  if (password !== confirmPassword) return

  const hashedPassword = CryptoJS.SHA256(password).toString()
  const { confirmPassword: _, ...data } = registerForm.value
  const response = await api.auth.register(
    { ...data, password: hashedPassword },
    toast,
  )
  token.value = response.data.value.token
}

async function handleGetMe() {
  const response = await api.auth.me(token.value, toast)
  user.value = response.data.value
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-8">
    <Card>
      <template #content>
        <h2 class="text-xl font-bold">👤 User Profile</h2>
        <p v-if="token">
          <span class="font-semibold">Token provided</span>
        </p>
        <p v-if="user">
          <span class="font-semibold">Name:</span> {{ user.name }}
          <span class="font-semibold">Email:</span> {{ user.email }}
        </p>
        <Button severity="secondary" @click="handleGetMe">🔄 Refresh Profile</Button>
      </template>
    </Card>

    <Card>
      <template #content>
        <Tabs value="0">
          <TabList class="mb-8">
            <Tab value="0">Login</Tab>
            <Tab value="1">Register</Tab>
          </TabList>

          <!-- Login -->
          <TabPanel value="0">
            <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
              <InputText v-model="loginForm.email" placeholder="Email" />
              <Password v-model="loginForm.password" :feedback="false" placeholder="Password" />
              <Button type="submit">Login</Button>
            </form>
          </TabPanel>

          <!-- Register -->
          <TabPanel value="1">
            <form class="flex flex-col gap-4" @submit.prevent="handleRegister">
              <InputText v-model="registerForm.name" placeholder="Name" />
              <InputText v-model="registerForm.email" placeholder="Email" />
              <Password v-model="registerForm.password" :feedback="false" placeholder="Password" />
              <Password v-model="registerForm.confirmPassword" :feedback="false" placeholder="Confirm Password" />
              <Button type="submit">Register</Button>
            </form>
          </TabPanel>
        </Tabs>
      </template>
    </Card>
  </div>
</template>
