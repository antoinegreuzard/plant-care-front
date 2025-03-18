<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Ajouter une nouvelle plante</h1>
    <form @submit.prevent="submitForm" class="bg-white p-6 rounded shadow">
      <div class="mb-4">
        <label class="block font-semibold">Nom de la plante</label>
        <input v-model="form.name" type="text" required class="w-full p-2 border rounded"/>
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Type</label>
        <select v-model="form.plant_type" required class="w-full p-2 border rounded">
          <option value="indoor">Plante d’intérieur</option>
          <option value="outdoor">Plante d’extérieur</option>
          <option value="succulent">Succulente</option>
          <option value="flower">Fleur</option>
          <option value="tree">Arbre</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Description</label>
        <textarea v-model="form.description" class="w-full p-2 border rounded"></textarea>
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Emplacement</label>
        <input v-model="form.location" type="text" class="w-full p-2 border rounded"/>
      </div>

      <button type="submit" class="px-4 py-2 bg-green-600 text-white rounded">Ajouter</button>
    </form>

    <p v-if="message" class="mt-4 text-green-600">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from "vue-router"; // 🔹 Ajout du router pour redirection
import api from "@/services/api";

const router = useRouter();
const form = ref({
  name: "",
  plant_type: "indoor",
  description: "",
  location: "",
});

const message = ref("");

onMounted(() => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    router.push("/login"); // 🔹 Redirection vers login si pas connecté
  }
});

const submitForm = async() => {
  try {
    const response = await api.post("plants/", form.value);
    if (response.status === 201) {
      message.value = "Plante ajoutée avec succès !";
      form.value = {
        name: "",
        plant_type: "indoor",
        description: "",
        location: "",
      };
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      message.value = "Vous devez être connecté pour ajouter une plante.";
      router.push("/login"); // 🔹 Redirige vers la page de connexion
    } else {
      message.value = "Erreur lors de l'ajout.";
    }
  }
};
</script>
