import { mount } from '@vue/test-utils'
import HomeView from '../../src/views/HomeView.vue'
import { createTestingPinia } from '@pinia/testing'
import { usePlants } from '../../src/composables/usePlants'
import { vi } from 'vitest'

vi.mock('@/composables/usePlants')

describe('HomeView', () => {
  test('Affiche les plantes chargées', async () => {
    usePlants.mockReturnValue({
      plants: [{ id: 1, name: 'Aloe Vera', plant_type: 'succulent' }],
      loading: false,
      error: ''
    })

    const wrapper = mount(HomeView, { global: { plugins: [createTestingPinia()] } })
    expect(wrapper.text()).toContain('Aloe Vera')
  })
})
