import apiClient from './axios'

export default {
  whoami() {
    return apiClient.get('/v1/client/user/whoami')
  },
  getBalance() {
    return apiClient.get('/v1/client/user/balance')
  }
}
