<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">🌱 Mes Plantes</h1>

    <div v-if="loading" class="text-center text-gray-500">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <div v-else-if="plants.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <PlantCard v-for="plant in plants" :key="plant.id" :plant="plant"/>
    </div>

    <p v-else class="text-center text-gray-500">Aucune plante trouvée.</p>
  </div>
</template>

<script setup lang="ts">
import { usePlants } from "@/composables/usePlants";
import PlantCard from "@/components/PlantCard.vue";

const { plants, loading, error } = usePlants();
</script>
