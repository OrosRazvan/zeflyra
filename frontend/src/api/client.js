import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8000/api', // URL-ul backend-ului Laravel
    withCredentials: true, // Necesită pentru a trimite cookie-uri (Sanctum)
  });

// Interceptor pentru token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api