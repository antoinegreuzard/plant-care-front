import { ref, watchEffect } from 'vue'
import api from '@/services/api'
import type { AxiosError } from 'axios'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const loading = ref(false)

  watchEffect(async () => {
    loading.value = true
    error.value = null

    try {
      const res = await api.get<T>(url)
      data.value = res.data
    } catch (err) {
      const axiosError = err as AxiosError<{ message?: string }>
      error.value =
        axiosError.response?.data?.message ||
        axiosError.message ||
        'Erreur inconnue lors de la requête.'
    } finally {
      loading.value = false
    }
  })

  return { data, error, loading }
}
