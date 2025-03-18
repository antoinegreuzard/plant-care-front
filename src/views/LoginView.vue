<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Se connecter</h1>
    <form @submit.prevent="submitLogin" class="bg-white p-6 rounded shadow">
      <div class="mb-4">
        <label class="block font-semibold">Nom d'utilisateur</label>
        <input v-model="form.username" type="text" required class="w-full p-2 border rounded"/>
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Mot de passe</label>
        <input v-model="form.password" type="password" required class="w-full p-2 border rounded"/>
      </div>

      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Connexion</button>
    </form>

    <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";

const router = useRouter();
const form = ref({
  username: "",
  password: "",
});
const errorMessage = ref("");

const submitLogin = async() => {
  try {
    const response = await api.post("token/", form.value);
    if (response.status === 200) {
      localStorage.setItem("jwt", response.data.access);
      router.push("/");
    }
  } catch (error) {
    errorMessage.value = "Identifiants incorrects, veuillez réessayer.";
  }
};
</script>
