import apiClient from './apiClient'

export const scholarshipService = {
  async getScholarships(filters = {}) {
    try {
      const response = await apiClient.get('/scholarships', { params: filters })
      return response.data
    } catch (error) {
      console.error('Error fetching scholarships:', error)
      throw error
    }
  },

  async getScholarshipById(id) {
    try {
      const response = await apiClient.get(`/scholarships/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching scholarship:', error)
      throw error
    }
  },

  async getCountries() {
    try {
      const response = await apiClient.get('/scholarships/countries/list')
      return response.data
    } catch (error) {
      console.error('Error fetching countries:', error)
      throw error
    }
  },

  async getFields() {
    try {
      const response = await apiClient.get('/scholarships/fields/list')
      return response.data
    } catch (error) {
      console.error('Error fetching fields:', error)
      throw error
    }
  },

  async saveScholarship(scholarship) {
    try {
      const response = await apiClient.post('/users/saved-scholarships', {
        scholarshipId: scholarship.id,
        scholarship
      })
      return response.data
    } catch (error) {
      console.error('Error saving scholarship:', error)
      throw error
    }
  },

  async removeSavedScholarship(id) {
    try {
      const response = await apiClient.delete(`/users/saved-scholarships/${id}`)
      return response.data
    } catch (error) {
      console.error('Error removing scholarship:', error)
      throw error
    }
  },

  async getSavedScholarships() {
    try {
      const response = await apiClient.get('/users/saved-scholarships')
      return response.data
    } catch (error) {
      console.error('Error fetching saved scholarships:', error)
      throw error
    }
  },

  async updateApplicationStatus(id, status) {
    try {
      const response = await apiClient.put(`/users/saved-scholarships/${id}`, { status })
      return response.data
    } catch (error) {
      console.error('Error updating status:', error)
      throw error
    }
  },

  async getMatchedScholarships() {
    try {
      const response = await apiClient.get('/scholarships/match')
      return response.data
    } catch (error) {
      console.error('Error fetching matched scholarships:', error)
      throw error
    }
  },

  async getUserStats() {
    try {
      const response = await apiClient.get('/users/stats')
      return response.data
    } catch (error) {
      console.error('Error fetching stats:', error)
      throw error
    }
  },
}
