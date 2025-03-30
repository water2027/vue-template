import { createRouter, createWebHistory } from 'vue-router'

import eventEmitter from '@/utils/eventEmitter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../layout/DefaultLayout.vue'),
      children: [],
    },
    {
      path: '/auth/',
      name: 'auth',
      component: () => import('../layout/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/auth/RegisterView.vue'),
        },
      ],
    },
  ],
})

const logout = () => {
  router.push('/auth/login')
}

eventEmitter.on('API:UN_AUTH', () => {
  logout()
})

eventEmitter.on('API:LOGOUT', () => {
  logout()
})

export default router
