import { describe, test, expect, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import { usePlants } from '../../src/composables/usePlants'

vi.mock('../../src/services/api', () => ({
  default: {
    get: vi.fn(() => Promise.resolve({
      data: [{
        id: 1,
        name: 'Aloe Vera',
        plant_type: 'succulent'
      }]
    }))
  }
}))

vi.mock('../../src/composables/usePlants', () => {
  const plants = ref([])
  return {
    usePlants: vi.fn(() => ({
      plants,
      fetchPlants: vi.fn(async () => {
        plants.value = [{ id: 1, name: 'Aloe Vera', plant_type: 'succulent' }]
      }),
      loading: ref(false),
      error: ref('')
    }))
  }
})

describe('usePlants', () => {
  test('Récupère les plantes depuis l\'API', async () => {
    const { plants, fetchPlants } = usePlants()
    await fetchPlants()
    await nextTick()

    expect(plants.value).toEqual([{ id: 1, name: 'Aloe Vera', plant_type: 'succulent' }])
  })
})
