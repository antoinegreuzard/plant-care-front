import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '../../src/stores/authStore'

describe('authStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('Set et clear les tokens', () => {
    const store = useAuthStore()

    store.setTokens('abc', 'refresh123')
    expect(store.token).to.eq('abc')

    store.clearTokens()
    expect(store.token).to.be.null
  })
})
