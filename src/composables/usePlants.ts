import { ref, onMounted } from 'vue'
import api from '@/services/api'
import type { Plant } from '@/types'
import router from '@/router'

export function usePlants() {
  const plants = ref<Plant[]>([]) // ✅ Typage correct
  const loading = ref(true)
  const error = ref('')

  const fetchPlants = async () => {
    try {
      const token = localStorage.getItem('jwt')
      if (!token) {
        await router.push('/login')
        return
      }

      const response = await api.get('plants/', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (Array.isArray(response.data.results)) {
        plants.value = response.data.results.map((plant: Plant) => ({
          id: plant.id,
          name: plant.name,
          plant_type: plant.plant_type,
          description: plant.description || 'Pas de description disponible.',
          image: plant.image || '/default-plant.jpg',
          lastWatered: plant.last_watering || 'Date inconnue',
        }))
      } else {
        error.value = 'Aucune plante.'
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = "Une erreur inconnue s'est produite."
      }
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchPlants)

  return { plants, loading, error }
}
