import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(localStorage.getItem('jwt') || '')

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('jwt', newToken)
  }

  const clearToken = () => {
    token.value = null
    localStorage.removeItem('jwt')
  }

  return { token, isAuthenticated, setToken, clearToken }
})
