import apiClient from './axios'

export default {
  getMovements(params) {
    return apiClient.get('/v1/client/movement', { params })
  }
}
