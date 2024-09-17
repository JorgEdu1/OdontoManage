import { api } from '../../api/axios'

export default new (class TratamentoApi {
  async getTratamentos() {
    try {
      const response = await api.get('/clinical-treatments')
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async createTratamento(data) {
    try {
      const response = await api.post('/treatments', data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async updateTratamento(data) {
    try {
      const response = await api.put(`/treatments/${data.id}`, data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteTratamento(id) {
    try {
      const response = await api.delete(`/treatments/${id}`)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getTreatmentByPatientId(id, page = 1, pageSize = 10) {
    try {
      const response = await api.get(`/treatments/by-patient`, {
        params: {
          patientId: id,
          page,
          pageSize,
        },
      })
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }
})()
