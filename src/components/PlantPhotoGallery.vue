<template>
  <div class="container mx-auto p-4">
    <h2 class="text-xl font-bold mb-4">Galerie Photos 🌿</h2>

    <div class="mb-4">
      <input
        ref="fileInput"
        type="file"
        @change="handleFileUpload"
        class="hidden"
      />
      <button
        @click="triggerFileUpload"
        class="px-4 py-2 bg-green-600 text-white rounded shadow"
      >
        Ajouter une photo
      </button>
    </div>

    <div v-if="loading" class="text-gray-500">Chargement...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <div v-else-if="photos.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <img
        v-for="photo in photos"
        :key="photo.id"
        :src="photo.image_url"
        alt="Photo de la plante"
        class="rounded shadow object-cover h-40 w-full"
      />
    </div>

    <p v-else class="text-gray-500">Aucune photo disponible pour cette plante.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePlantPhotos } from '@/composables/usePlantPhotos'

const route = useRoute()
const plantId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id

const { photos, loading, error, uploadPhoto } = usePlantPhotos(plantId)

const fileInput = ref<HTMLInputElement | null>(null)

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    uploadPhoto(target.files[0])
    target.value = ''
  }
}
</script>
