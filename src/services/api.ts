import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

let isRefreshing = false

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refresh = localStorage.getItem('refresh')

      if (refresh && !isRefreshing) {
        isRefreshing = true
        try {
          const { data } = await api.post('/token/refresh/', { refresh })
          localStorage.setItem('jwt', data.access)
          api.defaults.headers.common.Authorization = `Bearer ${data.access}`
          originalRequest.headers.Authorization = `Bearer ${data.access}`
          isRefreshing = false
          return api(originalRequest)
        } catch {
          localStorage.removeItem('jwt')
          localStorage.removeItem('refresh')
          window.location.href = '/login'
          return Promise.reject(error)
        } finally {
          isRefreshing = false
        }
      } else {
        localStorage.removeItem('jwt')
        window.location.href = '/login'
      }
    }

    if (import.meta.env.DEV) {
      console.error('API Error:', error.response?.data || error.message)
    }

    return Promise.reject(error)
  },
)

export default api
