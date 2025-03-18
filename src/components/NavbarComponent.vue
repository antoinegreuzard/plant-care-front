<template>
  <nav class="bg-green-600 text-white p-4">
    <div class="container mx-auto flex justify-between">
      <router-link to="/" class="text-lg font-bold">🌱 Plant Care</router-link>
      <div>
        <router-link v-if="!isAuthenticated" to="/login" class="px-4 py-2 bg-white text-green-600 rounded">
          Connexion
        </router-link>
        <button v-else @click="logout" class="px-4 py-2 bg-red-600 text-white rounded">
          Déconnexion
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isAuthenticated = ref(false);

// ✅ Vérifie si l'utilisateur est connecté
onMounted(() => {
  isAuthenticated.value = !!localStorage.getItem("jwt");
});

// ✅ Déconnexion : Supprime le token et redirige
const logout = () => {
  localStorage.removeItem("jwt");
  isAuthenticated.value = false;
  router.push("/login");
};
</script>
