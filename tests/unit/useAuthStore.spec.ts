import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../../src/stores/authStore'
import { describe, test, expect, beforeEach } from 'vitest'

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Login met à jour l\'état de connexion', () => {
    const store = useAuthStore()
    store.setToken('fake_token')
    expect(store.isAuthenticated).toBe(true)
  })

  test('Logout supprime le token', () => {
    const store = useAuthStore()
    store.clearToken()
    expect(store.isAuthenticated).toBe(false)
  })
})
