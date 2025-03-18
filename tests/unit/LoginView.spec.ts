import { describe, test, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from '../../src/views/LoginView.vue'
import { createTestingPinia } from '@pinia/testing'
import api from '../../src/services/api'

vi.mock('../../src/services/api', () => ({
  post: vi.fn()
}))

describe('LoginView', () => {
  test('Affiche un message d\'erreur si identifiants incorrects', async () => {
    api.post.mockRejectedValue(new Error())

    const wrapper = mount(LoginView, {
      global: { plugins: [createTestingPinia({ createSpy: vi.fn })] }
    })

    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.text()).toContain('Identifiants incorrects')
  })
})
