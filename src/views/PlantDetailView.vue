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
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import type { Plant } from '@/types'

const plant = ref<Plant | null>(null)
const loading = ref(true)
const error = ref('')
const route = useRoute()
const router = useRouter()

const fetchPlant = async (id: string | string[]) => {
  loading.value = true
  error.value = ''
  plant.value = null

  try {
    const { data } = await api.get<Plant>(`plants/${id}/`)
    plant.value = {
      ...data,
      description: data.description || 'Aucune description disponible.',
      image: data.image || '/default-plant.jpg',
      lastWatered: data.last_watering || 'Non défini',
    }
  } catch (err) {
    console.error(err)
    error.value = 'Erreur lors du chargement des données.'
    await router.push('/')
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.id,
  (newId) => {
    if (newId) fetchPlant(newId)
  },
  { immediate: true },
)
</script>
