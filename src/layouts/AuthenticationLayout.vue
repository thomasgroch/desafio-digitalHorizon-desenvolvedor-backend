<template>
  <div class="mx-auto flex flex-col items-center">
    <h1>Desafio Desenvolvedor Backend</h1>
    <router-view></router-view>

    <nav class="flex justify-center py-5">
      <router-link to="/">Login</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>
  </div>
  <Footer />
</template>

<script setup>
import Footer from '../components/Footer.vue'
</script>

<style type="text/css">
.overlay {
  position: absolute;
  top: 0;
  right: -32%;
  width: 50%;
  height: 100%;
  clip-path: ellipse(25% 70% at 50% 50%);
  background-color: white;
  overflow: hidden;
  z-index: 1;
}
</style>
