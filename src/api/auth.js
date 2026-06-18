import apiClient from './axios'

export default {

  register(userData) {
    return apiClient.post('/v1/public/client/user/register', userData)
  }
}
