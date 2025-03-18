import { mount } from '@vue/test-utils'
import NavbarComponent from '../../src/components/NavbarComponent.vue'
import { createTestingPinia } from '@pinia/testing'
import { useAuthStore } from '../../src/stores/authStore'
import { describe, test, expect, vi } from 'vitest'

vi.mock('vue-router', () => ({
  RouterLink: { template: '<div><slot/></div>' }
}))

describe('NavbarComponent', () => {
  test('Affiche \'Connexion\' si l\'utilisateur n\'est pas connecté', () => {
    const wrapper = mount(NavbarComponent, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    })
    expect(wrapper.text()).toContain('Connexion')
  })

  test('Affiche \'Déconnexion\' si l\'utilisateur est connecté', async () => {
    const pinia = createTestingPinia({ createSpy: vi.fn })
    const authStore = useAuthStore(pinia)
    authStore.isAuthenticated = true

    const wrapper = mount(NavbarComponent, {
      global: { plugins: [pinia] }
    })

    expect(wrapper.text()).toContain('Déconnexion')
  })
})
