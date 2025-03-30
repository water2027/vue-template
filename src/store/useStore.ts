import { defineStore } from 'pinia'

import { ref, unref } from 'vue'

import eventEmitter from '@/utils/eventEmitter'

// 管理token
export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')

  eventEmitter.on('TOKEN:GET', (_req, resp) => {
    resp.token = token.value
  })

  eventEmitter.on('API:UN_AUTH', () => {
    logout()
  })

  eventEmitter.on('API:LOGOUT', () => {
    logout()
  })

  const logout = () => {
    token.value = ''
    userInfo.value = undefined
  }

  const userInfo = ref<UserInfo>()

  const setUser = (user: UserInfo) => {
    const newUser = unref(user)
    userInfo.value = newUser
  }

  return { userInfo, setUser }
})
