import { describe, test, expect, vi } from 'vitest'
import { ref, nextTick } from 'vue'
import { usePlants } from '../../src/composables/usePlants'

vi.mock('../../src/services/api', () => ({
  default: {
    get: vi.fn()
  }
}))

vi.mock('../../src/composables/usePlants', () => ({
  usePlants: vi.fn(() => ({
    plants: ref([]),
    fetchPlants: vi.fn(),
    loading: ref(false),
    error: ref('')
  }))
}))

describe('usePlants', () => {
  test('Récupère les plantes depuis l\'API', async () => {
    const { plants, fetchPlants } = usePlants()
    await fetchPlants()
    await nextTick()

    expect(plants.value).toEqual([{ id: 1, name: 'Aloe Vera', plant_type: 'succulent' }])
  })
})
