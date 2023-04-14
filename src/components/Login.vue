<template>
  <form @submit.prevent="submit" class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
    <h2>Login</h2>
    <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>
    <div class="mb-4">
      <label class="block mb-1 font-medium" for="email"> E-mail </label>
      <input
        v-model="form.email"
        class="w-full px-3 py-2 border border-gray-400 rounded"
        type="email"
        name="email"
        autofocus
        autocomplete="email"
        autocapitalize="none"
        autocorrect="off"
        placeholder="john@example.com"
        required
      />
    </div>
    <div class="mb-4">
      <label class="block mb-1 font-medium" for="password"> Password </label>
      <input
        v-model="form.password"
        class="w-full px-3 py-2 border border-gray-400 rounded"
        type="password"
        name="password"
        placeholder="********"
        required
      />
    </div>
    <div class="flex justify-end">
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" type="submit">
        Login
      </button>
    </div>
    <p class="mt-6 text-sm text-center text-gray-400">
      Not registered yet? <router-link to="/register">Register</router-link>.
    </p>
  </form>
</template>

<script setup>
import axios from '@/plugins/axios.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'

const form = ref({ email: '', password: '' })
const error = ref('')
const router = useRouter()

const submit = async () => {
  const { email, password } = form.value
  const state = useStorage('app-store', { token: '' })
  try {
    const response = await axios.post('/login', { email, password })
    const { data } = await response
    state.value.token = data.access_token
    router.replace({ name: 'Dashboard' })
  } catch (err) {
    if (err.response && err.response.status === 401) {
      error.value = err.response.data.message
      return false
    }
    error.value = 'Unauthorized'
    console.error(err)
    return false
  }
}
</script>
