import apiClient from './axios'

export default {
  getContacts(params) {
    return apiClient.get('/v1/client/contact', { params })
  },
  createContact(payload) {
    return apiClient.post('/v1/client/contact', payload)
  }
}
