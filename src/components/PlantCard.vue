<template>
  <div class="bg-white p-4 rounded shadow">
    <img
      :src="plant.image || '/default-plant.jpg'"
      alt="Plante"
      class="w-full h-40 object-cover rounded"
    />
    <h3 class="text-lg font-semibold mt-2">{{ plant.name }}</h3>
    <p class="text-sm text-gray-600">{{ plant.description }}</p>
    <router-link :to="`/plant/${plant.id}`" class="text-green-600 mt-2 block">
      Voir détails
    </router-link>
    <router-link :to="`/plant/${plant.id}/photos`" class="text-blue-600 mt-1 block">
      Galerie Photos
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Plant } from '@/types'

defineProps<{ plant: Plant }>()
</script>
