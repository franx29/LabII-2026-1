import apiClient from './axios'

export default {
  register(userData) {
    return apiClient.post('/v1/public/client/user/register', userData)
  },

  login(credentials) {
    return apiClient.post('/v1/public/client/user/login', credentials)
  },

  forgotPassword(email) {
    return apiClient.post('/v1/public/client/user/forgot-password', { email })
  },

  resetPassword(email, code, newPassword) {
    return apiClient.post('/v1/public/client/user/reset-password', {
      email,
      code,
      new_password: newPassword
    })
  },

  updatePasswordDirect(oldPassword, newPassword) {
    return apiClient.patch('/v1/client/user/password', {
      password: oldPassword,
      new_password: newPassword
    })
  }
}

