import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Intercepteur pour la gestion des erreurs globales
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

// Fonction pour récupérer toutes les plantes
export const fetchPlants = async () => {
  try {
    const response = await api.get('plants/')
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des plantes:', error)
    return []
  }
}

export default api
