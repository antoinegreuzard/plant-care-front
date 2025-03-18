import { ref, onMounted } from 'vue'
import api from '@/services/api'
import type { Plant } from '@/types'

export function usePlants() {
  const plants = ref<Plant[]>([]) // ✅ Typage correct
  const loading = ref(true)
  const error = ref('')

  const fetchPlants = async () => {
    try {
      const response = await api.get('plants/')

      if (Array.isArray(response.data)) {
        plants.value = response.data.map(plant => ({
          id: plant.id,
          name: plant.name,
          plant_type: plant.plant_type,
          description: plant.description || 'Pas de description disponible.',
          image: plant.image || '/default-plant.jpg',
          lastWatered: plant.lastWatered || 'Date inconnue'
        }))
      } else {
        error.value = 'Aucune plante.'
      }

    } catch (err) {
      error.value = 'Impossible de récupérer les plantes.'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchPlants)

  return { plants, loading, error }
}
