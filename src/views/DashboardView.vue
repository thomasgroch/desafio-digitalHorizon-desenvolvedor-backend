<template>
  <div class="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md">
    <h2>Dashboard</h2>
    <p class="text-neutral-500 py-3">Greetings, welcome.</p>

    <ul title="Users">
      <li v-for="(user, k) in users" :key="user.id">
        <div class="bg-gray-100 p-3 mb-3 rounded-md">
          <div class="flex justify-between">
            <p>
              {{ user.name }}<span class="text-sm pl-2 text-neutral-500">({{ user.id }})</span>
            </p>
            <span class="flex justify-end text-neutral-500">#{{ k + 1 }}</span>
          </div>
          <span>{{ user.email }}</span>
          <span class="flex justify-end text-neutral-500">{{
            format(parseISO(user.registered_at), 'dd/MM/yyyy kk:mm')
          }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from '@/plugins/axios.js'
import { format, parseISO } from 'date-fns'

const users = ref([])

onMounted(async () => {
  try {
    const response = await axios('/users')
    const { data } = await response
    users.value = data.users
  } catch (err) {
    console.error(err)
    return false
  }
})
</script>

<style type="text/css">
ul[title]::before {
  content: attr(title);
  display: block;
  font-weight: bold;
  padding: 4px;
}
</style>
