import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'
import type { Plant } from '@/types'

export const usePlantStore = defineStore('plantStore', () => {
  const plants = ref<Plant[]>([])
  const loading = ref(false)
  const error = ref('')

  async function loadPlants() {
    loading.value = true
    error.value = ''

    try {
      const { data } = await api.get<Plant[]>('/plants')
      plants.value = data
    } catch {
      error.value = 'Erreur lors du chargement des plantes.'
    } finally {
      loading.value = false
    }
  }

  return { plants, loading, error, loadPlants }
})
