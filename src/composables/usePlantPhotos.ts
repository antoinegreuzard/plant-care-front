import { ref } from 'vue'
import api from '@/services/api'
import type { Photo } from '@/types'

export function usePlantPhotos(plantId: number | string) {
  const photos = ref<Photo[]>([])
  const loading = ref(false)
  const error = ref('')

  const fetchPhotos = async () => {
    loading.value = true
    error.value = ''

    try {
      const { data } = await api.get<Photo[]>(`plants/${plantId}/photos/`)
      photos.value = data
    } catch (err) {
      error.value = 'Erreur lors du chargement des photos.'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const uploadPhoto = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('plant', String(plantId))

    loading.value = true
    error.value = ''

    try {
      await api.post(`plants/${plantId}/upload-photo/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      await fetchPhotos()
    } catch {
      error.value = "Erreur lors de l'ajout de la photo."
    } finally {
      loading.value = false
    }
  }

  fetchPhotos()

  return { photos, loading, error, fetchPhotos, uploadPhoto }
}
