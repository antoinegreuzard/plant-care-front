import { mount } from '@vue/test-utils'
import LoginView from '@/views/LoginView.vue'
import AddPlantView from '@/views/AddPlantView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { vi } from 'vitest'

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
