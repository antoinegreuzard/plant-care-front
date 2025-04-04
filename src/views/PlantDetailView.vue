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

      <div v-if="!isEditing">
        <h1 class="text-2xl font-bold mt-4">{{ plant.name }}</h1>
        <p class="text-gray-600 mt-2">{{ plant.description }}</p>

        <div class="mt-4">
          <h2 class="text-xl font-semibold">Détails d'entretien</h2>
          <ul class="list-disc ml-4 text-gray-700">
            <li><strong>Type :</strong> {{ plant.plant_type }}</li>
            <li><strong>Emplacement :</strong> {{ plant.location || 'Non défini' }}</li>
            <li><strong>Fréquence d'arrosage :</strong> {{ plant.watering_frequency }} jours</li>
            <li><strong>Dernier arrosage :</strong> {{ plant.last_watering || 'Non défini' }}</li>
            <li><strong>Prochain arrosage :</strong> {{ plant.next_watering || 'Non défini' }}</li>
          </ul>
        </div>

        <button
          @click="startEditing"
          class="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Modifier
        </button>
        <button
          @click="deletePlant"
          class="bg-red-500 text-white px-4 py-2 rounded mt-4 ml-2"
        >
          Supprimer
        </button>
      </div>

      <div v-else class="mt-4 space-y-2">
        <input
          v-model="editablePlant.name"
          class="border p-2 w-full rounded"
          placeholder="Nom"
        />
        <input
          v-model="editablePlant.variety"
          class="border p-2 w-full rounded"
          placeholder="Variété"
        />
        <textarea
          v-model="editablePlant.description"
          class="border p-2 w-full rounded"
          placeholder="Description"
        ></textarea>
        <input
          v-model="editablePlant.location"
          class="border p-2 w-full rounded"
          placeholder="Emplacement"
        />

        <select v-model="editablePlant.plant_type" class="border p-2 w-full rounded">
          <option value="indoor">Plante d'intérieur</option>
          <option value="outdoor">Plante d'extérieur</option>
          <option value="succulent">Succulente</option>
          <option value="flower">Fleur</option>
          <option value="tree">Arbre</option>
        </select>

        <select v-model="editablePlant.sunlight_level" class="border p-2 w-full rounded">
          <option value="low">Faible luminosité</option>
          <option value="medium">Moyenne luminosité</option>
          <option value="high">Forte luminosité</option>
        </select>

        <input
          type="number"
          v-model.number="editablePlant.watering_frequency"
          class="border p-2 w-full rounded"
          placeholder="Fréquence d'arrosage (jours)"
        />

        <input
          type="date"
          v-model="editablePlant.last_watering"
          class="border p-2 w-full rounded"
        />

        <input
          type="number"
          v-model.number="editablePlant.temperature"
          class="border p-2 w-full rounded"
          placeholder="Température (°C)"
        />

        <select v-model="editablePlant.humidity_level" class="border p-2 w-full rounded">
          <option value="low">Sec</option>
          <option value="medium">Moyen</option>
          <option value="high">Humide</option>
        </select>

        <button
          @click="saveChanges"
          :disabled="loading"
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Enregistrer
        </button>
        <button
          @click="cancelEditing"
          :disabled="loading"
          class="bg-gray-300 px-4 py-2 rounded ml-2"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import type { Plant } from '@/types'

const route = useRoute()
const router = useRouter()

const plant = ref<Plant | null>(null)
const loading = ref(true)
const error = ref('')
const isEditing = ref(false)
const editablePlant = ref<Partial<Plant>>({})

const fetchPlant = async (id: string | string[]) => {
  loading.value = true
  error.value = ''
  plant.value = null

  try {
    const { data } = await api.get<Plant>(`plants/${id}/`)
    plant.value = data
    editablePlant.value = { ...data }
  } catch (err) {
    console.error(err)
    error.value = 'Erreur lors du chargement des données.'
    await router.push('/')
  } finally {
    loading.value = false
  }
}

const startEditing = () => {
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
  if (plant.value) editablePlant.value = { ...plant.value }
}

const saveChanges = async () => {
  if (!plant.value) return
  loading.value = true
  error.value = ''

  try {
    const { data } = await api.put<Plant>(`plants/${plant.value.id}/`, editablePlant.value)
    plant.value = data
    isEditing.value = false
  } catch (err) {
    console.error(err)
    error.value = 'Erreur lors de la sauvegarde.'
  } finally {
    loading.value = false
  }
}

const deletePlant = async () => {
  if (!plant.value || !confirm('Supprimer cette plante définitivement ?')) return

  loading.value = true
  error.value = ''

  try {
    await api.delete(`plants/${plant.value.id}/`)
    await router.push('/')
  } catch (err) {
    console.error(err)
    error.value = 'Erreur lors de la suppression.'
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
