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

const router = useRouter()
const authStore = useAuthStore()
const form = ref({ username: '', password: '' })
const errorMessage = ref('')

const submitLogin = async () => {
  try {
    const response = await api.post('token/', form.value)
    if (response.status === 200) {
      authStore.login(response.data.access)
      await router.push('/')
    }
  } catch (error: unknown) {
    if (typeof error === 'object' && error !== null && 'response' in error) {
      const err = error as { response?: { status: number } }
      if (err.response?.status === 401) {
        errorMessage.value = 'Identifiants incorrects, veuillez réessayer.'
      } else {
        errorMessage.value = 'Une erreur est survenue. Veuillez réessayer plus tard.'
      }
    } else {
      errorMessage.value = 'Erreur inattendue. Contactez le support.'
    }
  }
}
</script>
