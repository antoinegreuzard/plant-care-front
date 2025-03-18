<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Mes Plantes</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <PlantCard v-for="plant in plants" :key="plant.id" :plant="plant"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import PlantCard from "@/components/PlantCard.vue";
import { fetchPlants } from "@/utils/api";

const plants = ref([]);

onMounted(async() => {
  plants.value = await fetchPlants();
});
</script>
