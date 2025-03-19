import { ref } from 'vue'
import api from '@/services/api'
import type { Plant } from '@/types'

export function usePlants() {
  const plants = ref<Plant[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string>('')

  const fetchPlants = async () => {
    loading.value = true
    error.value = ''
    try {
      const { data } = await api.get('plants')

      if (Array.isArray(data) && data.length) {
        plants.value = data.map((plant) => ({
          ...plant,
          description: plant.description || 'Pas de description disponible.',
          image: plant.image || '/default-plant.jpg',
          lastWatered: plant.last_watering || 'Date inconnue',
        }))
      } else {
        error.value = 'Aucune plante trouvée.'
        plants.value = []
      }
    } catch (e) {
      error.value = 'Erreur lors du chargement des plantes.'
    } finally {
      loading.value = false
    }
  }

  fetchPlants() // auto-call à l'initialisation

  return { plants, loading, error, fetchPlants }
}
