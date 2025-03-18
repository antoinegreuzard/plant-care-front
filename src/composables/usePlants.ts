import { ref, onMounted } from 'vue'
import api from '@/services/api'

export function usePlants() {
  const plants = ref([])
  const loading = ref(true)
  const error = ref('')

  const fetchPlants = async () => {
    try {
      const response = await api.get('plants/')
      plants.value = response.data
    } catch (err) {
      error.value = 'Impossible de récupérer les plantes.'
    } finally {
      loading.value = false
    }
  }

  onMounted(fetchPlants)

  return { plants, loading, error }
}
