import { mount } from '@vue/test-utils'
import LoginView from '../../src/views/LoginView.vue'
import { createTestingPinia } from '@pinia/testing'
import api from '../../src/services/api'
import { vi } from 'vitest'

vi.mock('@/services/api')

describe('LoginView', () => {
  test('Affiche un message d\'erreur si identifiants incorrects', async () => {
    api.post.mockRejectedValue(new Error())

    const wrapper = mount(LoginView, { global: { plugins: [createTestingPinia()] } })

    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.text()).toContain('Identifiants incorrects')
  })
})
