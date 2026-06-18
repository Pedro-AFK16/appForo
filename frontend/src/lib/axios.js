import axios from 'axios'              // se encarga basicamente de poner el token en el header, para que express lo "reciba" (aunque lo recibe un mw)

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
})

api.interceptors.request.use((config) => {                         // -> maneja cada request al server
  const token = localStorage.getItem('token')                      // -> se fija si hay un token (se genera si se hizo login)
  if (token) config.headers.Authorization = `Bearer ${token}`      // -> lo agrega al header de la request
  return config
})

api.interceptors.response.use(                                     // -> maneja cada response, si es valido (status 200 a 299) lo hace pasar
  (response) => response,                                          //    de lo contrario lo saca y lo redirige a /login
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api