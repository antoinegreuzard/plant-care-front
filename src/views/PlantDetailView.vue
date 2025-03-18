<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center text-gray-500">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <div v-else-if="plant" class="bg-white shadow-lg rounded-lg p-6">
      <img
        :src="plant.image || '/default-plant.jpg'"
        alt="Plante"
        class="w-full h-60 object-cover rounded"
      />
      <h1 class="text-2xl font-bold mt-4">{{ plant.name }}</h1>
      <p class="text-gray-600 mt-2">{{ plant.description || 'Aucune description disponible.' }}</p>

      <div class="mt-4">
        <h2 class="text-xl font-semibold">Détails d'entretien</h2>
        <ul class="list-disc ml-4 text-gray-700">
          <li><strong>Type:</strong> {{ plant.plant_type || 'Inconnu' }}</li>
          <li><strong>Dernier arrosage:</strong> {{ plant.lastWatered || 'Non défini' }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import api from '@/services/api'
import type { Plant } from '@/types'
import router from '@/router'

const plant = ref<Plant | null>(null)
const loading = ref(true)
const error = ref('')
const route = useRoute()

const fetchPlant = async () => {
  loading.value = true
  error.value = ''
  plant.value = null

  try {
    const token = localStorage.getItem('jwt')
    if (!token) {
      await router.push('/login')
      return
    }

    const response = await api.get(`plants/${route.params.id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    // Transformation des données pour correspondre à l'interface Plant
    plant.value = {
      id: response.data.id,
      name: response.data.name,
      plant_type: response.data.plant_type,
      description: response.data.description || 'Aucune description disponible.',
      image: response.data.image || '/default-plant.jpg',
      lastWatered: response.data.last_watering || 'Non défini',
    }
  } catch (err) {
    console.error('Erreur lors de la récupération de la plante:', err)
    error.value = 'Erreur lors du chargement des données.'
  } finally {
    loading.value = false
  }
}

// Recharger la plante si l'ID change (ex: navigation entre plantes)
watchEffect(() => {
  if (route.params.id) {
    fetchPlant()
  }
})

onMounted(fetchPlant)
</script>
