import apiClient from './axios'

export default {
  getContacts(params) {
    return apiClient.get('/v1/client/contact', { params })
  },
  createContact(payload) {
    return apiClient.post('/v1/client/contact', payload)
  },
  updateContact(id, payload) {
    return apiClient.patch(`/v1/client/contact/${id}`, {
      alias: payload.alias,
      description: payload.description || 'Afiliado actualizado desde el directorio'
    })
  },
  deleteContact(id) {
    return apiClient.delete(`/v1/client/contact/${id}`)
  }
}