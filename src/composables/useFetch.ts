import { ref, watchEffect } from 'vue'
import api from '@/services/api'

export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  watchEffect(async () => {
    loading.value = true
    error.value = ''
    try {
      const res = await api.get<T>(url)
      data.value = res.data
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message
    } finally {
      loading.value = false
    }
  })

  return { data, error, loading }
}
