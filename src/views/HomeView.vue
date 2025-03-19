<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">🌱 Mes Plantes</h1>

    <div v-if="loading">Chargement...</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>

    <div v-if="plants.length > 0">
      <input v-model="filter" placeholder="Rechercher..." class="border rounded px-2 py-1 mb-4" />

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PlantCard v-for="plant in filteredPlants" :key="plant.id" :plant="plant" />
      </div>
    </div>
    <p v-else>Aucune plante disponible.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { usePlants } from '@/composables/usePlants'
import PlantCard from '@/components/PlantCard.vue'

const { plants, loading, error } = usePlants()
const filter = ref('')

const filteredPlants = computed(() =>
  plants.value.filter((p) => p.name.toLowerCase().includes(filter.value.toLowerCase())),
)
</script>
