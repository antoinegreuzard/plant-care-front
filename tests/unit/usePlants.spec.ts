import { usePlants } from '@/composables/usePlants'
import { ref } from 'vue'
import { vi } from 'vitest'
import api from '@/services/api'

vi.mock('@/services/api')

describe('usePlants', () => {
  test('Récupère les plantes depuis l\'API', async () => {
    const plants = [{ id: 1, name: 'Aloe Vera', plant_type: 'succulent' }]
    api.get.mockResolvedValue({ data: plants })

    const { plants: fetchedPlants } = usePlants()
    expect(fetchedPlants.value).toEqual(plants)
  })
})
