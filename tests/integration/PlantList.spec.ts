import { mount } from '@vue/test-utils'
import HomeView from '../../src/views/HomeView.vue'
import { createTestingPinia } from '@pinia/testing'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'

vi.mock('../../src/composables/usePlants', () => ({
  usePlants: vi.fn(() => ({
    plants: ref([{ id: 1, name: 'Aloe Vera', plant_type: 'succulent' }]),
    loading: ref(false),
    error: ref('')
  }))
}))

describe('HomeView', () => {
  beforeEach(() => {
    createTestingPinia({ createSpy: vi.fn })
  })

  test('Affiche les plantes chargées', async () => {
    const wrapper = mount(HomeView, { global: { plugins: [createTestingPinia({ createSpy: vi.fn })] } })
    expect(wrapper.text()).toContain('Aloe Vera')
  })
})
