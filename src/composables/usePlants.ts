import { ref } from 'vue'
import api from '@/services/api'
import type { Plant } from '@/types'

interface ApiResponse {
  results: Plant[]
  count: number
  next: string | null
  previous: string | null
}

export function usePlants() {
  const plants = ref<Plant[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string>('')

  const fetchPlants = async () => {
    loading.value = true
    error.value = ''

    try {
      const { data } = await api.get<ApiResponse>('/plants/')

      plants.value = data.results.map((plant) => ({
        ...plant,
        description: plant.description || 'Pas de description disponible.',
        image: plant.image || '/default-plant.jpg',
        last_watering: plant.last_watering || 'Date inconnue',
      }))

      if (data.results.length === 0) {
        error.value = 'Aucune plante trouvée.'
      }
    } catch (err) {
      console.error(err)
      error.value = 'Erreur lors du chargement des plantes.'
    } finally {
      loading.value = false
    }
  }
  fetchPlants() // Chargement automatique initial

  return { plants, loading, error, fetchPlants }
}
