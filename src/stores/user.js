import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    email: 'leo@gmail.com',
    password: '123'
  })
})
