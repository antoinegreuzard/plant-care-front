import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('authStore', () => {
  const token = ref(localStorage.getItem('jwt') || null)
  const refresh = ref(localStorage.getItem('refresh') || null)

  const isAuthenticated = computed(() => !!token.value)

  const setTokens = (accessToken: string, refreshToken: string) => {
    token.value = accessToken
    refresh.value = refreshToken
    localStorage.setItem('jwt', accessToken)
    localStorage.setItem('refresh', refreshToken)
  }

  const clearTokens = () => {
    token.value = null
    refresh.value = null
    localStorage.removeItem('jwt')
    localStorage.removeItem('refresh')
  }

  return { token, refresh, isAuthenticated, setTokens, clearTokens }
})
