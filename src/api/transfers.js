import apiClient from './axios'

export default {
  createTransfer(payload) {
    return apiClient.post('/v1/client/movement', payload)
  }
}
