import axios from 'axios'
import { useStorage } from '@vueuse/core'

const instance = axios.create({
  baseURL: 'http://localhost:5000/'
})

instance.interceptors.request.use((config) => {
  const state = useStorage('app-store', { token: '' })
  if (state.value.token) {
    config.headers.Authorization = `Bearer ${state.value.token}`
  }
  return config
})

export default instance
