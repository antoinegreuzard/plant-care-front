import { mount } from '@vue/test-utils'
import AddPlantView from '@/views/AddPlantView.vue'
import { createTestingPinia } from '@pinia/testing'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import { vi } from 'vitest'

vi.mock('@/services/api')

describe('AddPlantView', () => {
  test('Redirige vers /login si non authentifié', async () => {
    const push = vi.fn()
    useRouter.mockReturnValue({ push })

    mount(AddPlantView, { global: { plugins: [createTestingPinia()] } })

    expect(push).toHaveBeenCalledWith('/login')
  })

  test('Affiche message après ajout de plante', async () => {
    api.post.mockResolvedValue({ status: 201 })

    const wrapper = mount(AddPlantView, { global: { plugins: [createTestingPinia()] } })

    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.text()).toContain('Plante ajoutée avec succès !')
  })
})
