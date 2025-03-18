import { mount } from '@vue/test-utils'
import NavbarComponent from '@/components/NavbarComponent.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '@/stores/authStore'

describe('NavbarComponent', () => {
  test('Affiche \'Connexion\' si l\'utilisateur n\'est pas connecté', () => {
    const wrapper = mount(NavbarComponent, {
      global: { plugins: [createTestingPinia()] }
    })
    expect(wrapper.text()).toContain('Connexion')
  })

  test('Affiche \'Déconnexion\' si l\'utilisateur est connecté', async () => {
    const authStore = useAuthStore()
    authStore.isAuthenticated = true

    const wrapper = mount(NavbarComponent, {
      global: { plugins: [createTestingPinia()] }
    })

    expect(wrapper.text()).toContain('Déconnexion')
  })
})
