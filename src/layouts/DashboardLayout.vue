<template>
  <div class="mx-auto flex flex-col items-center">
    <h1>Desafio Desenvolvedor Backend</h1>
    <router-view />
  </div>
  <nav class="flex justify-center py-5">
    <router-link to="/">Login</router-link>
    <router-link to="/dashboard">Dashboard</router-link>
    <a href="#" @click.prevent="logout">Logout</a>
  </nav>
  <Footer />
</template>

<script setup>
import Footer from '../components/Footer.vue'
import { useRouter } from 'vue-router'
import { useStorage } from '@vueuse/core'
const router = useRouter()

const logout = async () => {
  const state = useStorage('app-store', { token: '' })
  state.value.token = ''
  router.replace({ name: 'Login' })
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
