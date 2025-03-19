import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const isAuthenticated = ref(!!localStorage.getItem('jwt'))

  const login = (jwt: string) => {
    localStorage.setItem('jwt', jwt)
    isAuthenticated.value = true
  }

  const logout = () => {
    localStorage.removeItem('jwt')
    isAuthenticated.value = false
  }

  return { isAuthenticated, login, logout }
})
