import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../../src/stores/authStore'
import { describe, test, expect, beforeEach } from 'vitest'

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Login met à jour l\'état de connexion', () => {
    const store = useAuthStore()
    store.setTokens('fake_token', 'fake_refresh_roken')
    expect(store.isAuthenticated).toBe(true)
  })

  test('Logout supprime le token', () => {
    const store = useAuthStore()
    store.clearTokens()
    expect(store.isAuthenticated).toBe(false)
  })
})
