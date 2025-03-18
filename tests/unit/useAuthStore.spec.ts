import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../../src/stores/authStore'

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('Login met à jour l\'état de connexion', () => {
    const store = useAuthStore()
    store.login('fake_token')
    expect(store.isAuthenticated).toBe(true)
  })

  test('Logout supprime le token', () => {
    const store = useAuthStore()
    store.logout()
    expect(store.isAuthenticated).toBe(false)
  })
})
