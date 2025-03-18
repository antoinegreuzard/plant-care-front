import { mount } from '@vue/test-utils'
import AddPlantView from '../../src/views/AddPlantView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '../../src/stores/authStore'
import { describe, test, expect, vi } from 'vitest'

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() }))
}))

describe('AuthFlow', () => {
  test('Redirige vers /add-plant après connexion', async () => {
    const authStore = useAuthStore()
    authStore.login('token')

    const wrapper = mount(AddPlantView, { global: { plugins: [createTestingPinia()] } })

    expect(wrapper.text()).toContain('Ajouter une nouvelle plante')
  })
})
