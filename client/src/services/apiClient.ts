import { defaultConfig } from '@/config'
import axios from 'axios'
import Cookies from 'js-cookie'
import handleApiError from './components/errorHandler'

const apiClient = axios.create({
  baseURL: `${defaultConfig.API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 90000,
})

console.log('apiClient', apiClient)	// debug

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accesstoken')
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use((response) => response, handleApiError)

export default apiClient
