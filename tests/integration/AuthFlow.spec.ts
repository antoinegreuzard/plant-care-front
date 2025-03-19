import { mount } from '@vue/test-utils'
import AddPlantView from '../../src/views/AddPlantView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '../../src/stores/authStore'
import { describe, test, expect, vi, beforeEach } from 'vitest'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn()
  })),
  RouterLink: {
    template: '<div><slot/></div>'
  }
}))


describe('AuthFlow', () => {
  beforeEach(() => {
    // Active Pinia avant chaque test
    createTestingPinia({ createSpy: vi.fn })
  })

  test('Redirige vers /add-plant après connexion', async () => {
    const pinia = createTestingPinia({ createSpy: vi.fn })
    const authStore = useAuthStore(pinia)
    authStore.setToken('token')

    const wrapper = mount(AddPlantView, { global: { plugins: [pinia] } })
    expect(wrapper.text()).toContain('Ajouter une nouvelle plante')
  })
})
