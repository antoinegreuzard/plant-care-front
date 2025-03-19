<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Ajouter une nouvelle plante</h1>
    <form @submit.prevent="submitForm" class="bg-white p-6 rounded shadow">
      <div class="mb-4">
        <label class="block font-semibold">Nom de la plante</label>
        <input
          v-model="form.name"
          name="name"
          type="text"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Type</label>
        <select
          name="plant_type"
          v-model="form.plant_type"
          required
          class="w-full p-2 border rounded"
        >
          <option value="indoor">Plante d’intérieur</option>
          <option value="outdoor">Plante d’extérieur</option>
          <option value="succulent">Succulente</option>
          <option value="flower">Fleur</option>
          <option value="tree">Arbre</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Description</label>
        <textarea
          v-model="form.description"
          class="w-full p-2 border rounded"
          name="description"
        ></textarea>
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Emplacement</label>
        <input
          v-model="form.location"
          name="location"
          type="text"
          class="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded">Ajouter</button>
    </form>

    <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
    <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/services/api'
import type { AxiosError } from 'axios'

interface ErrorResponse {
  detail?: string
}

const router = useRouter()

const form = ref({
  name: '',
  plant_type: 'indoor',
  description: '',
  location: '',
})

const message = ref('')
const errorMessage = ref('')

const submitForm = async () => {
  message.value = ''
  errorMessage.value = ''

  try {
    const { status } = await api.post('plants/', form.value)

    if (status === 201) {
      message.value = 'Plante ajoutée avec succès !'
      form.value = { name: '', plant_type: 'indoor', description: '', location: '' }
    }
  } catch (error) {
    const err = error as AxiosError<ErrorResponse>

    if (err.response?.status === 401) {
      errorMessage.value = 'Vous devez être connecté pour ajouter une plante.'
      await router.push('/login')
    } else {
      errorMessage.value = err.response?.data?.detail || "Erreur lors de l'ajout de la plante."
    }

    console.error('Erreur API:', err.response || err.message)
  }
}
</script>
