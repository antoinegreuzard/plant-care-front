import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(!!localStorage.getItem('jwt'))

  function login(token: string) {
    localStorage.setItem('jwt', token)
    isAuthenticated.value = true
  }

  function logout() {
    localStorage.removeItem('jwt')
    isAuthenticated.value = false
  }

  return { isAuthenticated, login, logout }
})
