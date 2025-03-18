import { describe, test, expect, vi } from 'vitest'
import { nextTick } from 'vue'
import { usePlants } from '../../src/composables/usePlants'
import api from '../../src/services/api'

vi.mock('../../src/services/api', () => ({
  default: {
    get: vi.fn()
  }
}))

describe('usePlants', () => {
  test('Récupère les plantes depuis l\'API', async () => {
    const plantsData = [{ id: 1, name: 'Aloe Vera', plant_type: 'succulent' }]
    api.get.mockResolvedValue({ data: plantsData })

    const { plants, fetchPlants } = usePlants()
    await fetchPlants()
    await nextTick()

    expect(plants.value).toEqual(plantsData)
  })
})
