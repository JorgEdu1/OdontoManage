import { api } from '../../api/axios'

export default new (class PacienteApi {
  async getPacientes() {
    try {
      const response = await api.get('/patients')
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async createPaciente(data) {
    try {
      const response = await api.post('/patients', data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async updatePaciente(data) {
    try {
      const response = await api.put(`/patients/${data.id}`, data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deletePaciente(id) {
    try {
      const response = await api.delete(`/patients/${id}`)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getPacienteById(id) {
    try {
      const response = await api.get(`/patients/${id}`)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }
})()
