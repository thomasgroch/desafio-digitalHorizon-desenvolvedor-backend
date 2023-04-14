import { createRouter, createWebHistory } from 'vue-router'
import { useStorage } from '@vueuse/core'
import axios from '@/plugins/axios.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      component: () => import('@/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/DashboardView.vue')
        }
      ],
      beforeEnter: async (to, from) => {
        const state = useStorage('app-store', { token: '' })
        try {
          const response = await axios.post('/validate_token')
          if (response.data.user_id) {
            return true
          }
        } catch (err) {
          console.error(err)
        }
        state.value.token = ''
        return { name: 'Login' }
      }
    },

    {
      path: '/auth',
      name: 'Auth',
      component: () => import('@/layouts/AuthenticationLayout.vue'),
      children: [
        {
          path: '/',
          name: 'Login',
          component: () => import('@/views/LoginView.vue')
        },
        {
          path: '/register',
          name: 'Register',
          component: () => import('@/views/RegisterView.vue')
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        }
      ],
      beforeEnter: async (to, from) => {
        const state = useStorage('app-store', { token: '' })

        if (!state.value.token) {
          return true
        }

        if (to.params.token) {
          state.value.token = to.params.token
          return true
        }
        return { name: 'Dashboard' }
      }
    }
  ]
})

export default router
