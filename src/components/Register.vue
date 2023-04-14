<template>
  <form
    class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md"
    @submit.prevent="registerUser"
  >
    <h2>Register</h2>
    <div v-if="error" class="text-red-500 mt-4">{{ error }}</div>
    <div class="mb-4">
      <label class="block mb-1 font-medium" for="name">Full name</label>
      <input
        class="w-full px-3 py-2 border border-gray-400 rounded"
        type="text"
        id="name"
        v-model="name"
        required
        placeholder="John Doe"
      />
    </div>
    <div class="mb-4">
      <label class="block mb-1 font-medium" for="email">E-mail</label>
      <input
        class="w-full px-3 py-2 border border-gray-400 rounded"
        type="email"
        id="email"
        v-model="email"
        required
        placeholder="john@example.com"
      />
    </div>
    <div class="mb-4">
      <label class="block mb-1 font-medium" for="password">Password</label>
      <input
        class="w-full px-3 py-2 border border-gray-400 rounded"
        type="password"
        id="password"
        v-model="password"
        placeholder="********"
        required
      />
    </div>
    <div class="flex justify-end">
      <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" type="submit">
        Register
      </button>
    </div>
    <p class="mt-6 text-sm text-center text-gray-400">
      Already have an account? <router-link to="/">Login</router-link>.
    </p>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from '@/plugins/axios.js'
import { useRouter } from 'vue-router'
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')

const registerUser = async () => {
  try {
    const response = await axios.post('/signup', {
      name: name.value,
      email: email.value,
      password: password.value
    })
    name.value = ''
    email.value = ''
    password.value = ''
    error.value = ''
    router.replace({ name: 'Login' })
  } catch (err) {
    console.error(err)
    return false
  }
}
</script>
