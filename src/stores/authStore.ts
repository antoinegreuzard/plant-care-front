import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: !!localStorage.getItem('jwt')
  }),
  actions: {
    login(token: string) {
      localStorage.setItem('jwt', token)
      this.isAuthenticated = true
    },
    logout() {
      localStorage.removeItem('jwt')
      this.isAuthenticated = false
    }
  }
})
