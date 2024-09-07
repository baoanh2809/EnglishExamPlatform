/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from './apiClient'

const apiService = {
  get: async (endpoint: string) => {
    // eslint-disable-next-line no-useless-catch
    const response = await apiClient.get(endpoint)
    return response.data
  },
  post: async (endpoint: string, data: any) => {
    const response = await apiClient.post(endpoint, data)
    return response.data
  },
  put: async (endpoint: string, data: any) => {
    const response = await apiClient.put(endpoint, data)
    return response.data

  },
  delete: async (endpoint: string) => {
    const response = await apiClient.delete(endpoint)
    return response.data
  },
}

export default apiService
