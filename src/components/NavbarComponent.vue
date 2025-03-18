<template>
  <nav class="bg-green-600 text-white p-4">
    <div class="container mx-auto flex justify-between">
      <router-link to="/" class="text-lg font-bold">🌱 Plant Care</router-link>
      <div>
        <router-link v-if="!authStore.isAuthenticated" to="/login" class="px-4 py-2 bg-white text-green-600 rounded">
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
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>
