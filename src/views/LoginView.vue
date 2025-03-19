<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Se connecter</h1>
    <form @submit.prevent="submitLogin" class="bg-white p-6 rounded shadow">
      <div class="mb-4">
        <label class="block font-semibold">Nom d'utilisateur</label>
        <input
          v-model="form.username"
          name="username"
          type="text"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <div class="mb-4">
        <label class="block font-semibold">Mot de passe</label>
        <input
          v-model="form.password"
          name="password"
          type="password"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Connexion</button>
    </form>

    <p v-if="errorMessage" class="mt-4 text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import api from '@/services/api'
import type { AxiosError } from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({ username: '', password: '' })
const errorMessage = ref('')

const submitLogin = async () => {
  errorMessage.value = ''
  try {
    const { data } = await api.post<{ access: string }>('token/', form.value)
    authStore.setToken(data.access)
    await router.push('/')
  } catch (error) {
    const err = error as AxiosError
    errorMessage.value =
      err.response?.status === 401
        ? 'Identifiants incorrects.'
        : 'Une erreur est survenue, veuillez réessayer.'
  }
}
</script>
