<template>
  <div class="container mx-auto p-4">
    <div v-if="loading" class="text-center text-gray-500">Chargement...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>

    <div v-else-if="plant" class="bg-white shadow-lg rounded-lg p-6">
      <img :src="plant.image || '/default-plant.jpg'" alt="Plante" class="w-full h-60 object-cover rounded">
      <h1 class="text-2xl font-bold mt-4">{{ plant.name }}</h1>
      <p class="text-gray-600 mt-2">{{ plant.description || "Aucune description disponible." }}</p>

      <div class="mt-4">
        <h2 class="text-xl font-semibold">Détails d'entretien</h2>
        <ul class="list-disc ml-4 text-gray-700">
          <li><strong>Type:</strong> {{ plant.plant_type }}</li>
          <li><strong>Emplacement:</strong> {{ plant.location || "Non spécifié" }}</li>
          <li><strong>Arrosage:</strong> Tous les {{ plant.watering_frequency }} jours</li>
          <li><strong>Prochain arrosage:</strong> {{ plant.next_watering || "Non défini" }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/services/api";

const route = useRoute();
const plant = ref(null);
const loading = ref(true);
const error = ref("");

onMounted(async() => {
  try {
    const response = await api.get(`plants/$ {route.params.id}/`);
    plant.value = response.data;
  } catch (err) {
    error.value = "Erreur lors du chargement des données.";
  } finally {
    loading.value = false;
  }
});
</script>
