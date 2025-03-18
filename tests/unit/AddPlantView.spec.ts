import { mount } from '@vue/test-utils'
import AddPlantView from '../../src/views/AddPlantView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'
import api from '../../src/services/api'
import { describe, test, expect, vi, beforeEach } from 'vitest'

vi.mock('../../src/services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn()
  }
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn()
  })),
  RouterLink: { template: '<div><slot/></div>' }
}))

describe('AddPlantView', () => {
  let push

  beforeEach(() => {
    vi.clearAllMocks()
    useRouter.mockReturnValue({ push: vi.fn() })
  })

  test('Redirige vers /login si non authentifié', async () => {
    mount(AddPlantView, { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } })

    expect(push).toHaveBeenCalledWith('/login')
  })

  test('Affiche message après ajout de plante', async () => {
    api.default.post.mockResolvedValue({ status: 201 })

    const wrapper = mount(AddPlantView, { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } })

    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.text()).toContain('Plante ajoutée avec succès !')
  })
})
