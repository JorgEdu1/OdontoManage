import PacienteApi from './api/PacienteApi'

class PacienteService {
  async getPacientes() {
    try {
      const response = await PacienteApi.getPacientes()
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async createPaciente(data) {
    try {
      const response = await PacienteApi.createPaciente(data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async updatePaciente(data) {
    try {
      const response = await PacienteApi.updatePaciente(data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deletePaciente(id) {
    try {
      const response = await PacienteApi.deletePaciente(id)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getPacienteById(id) {
    try {
      const response = await PacienteApi.getPacienteById(id)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default new PacienteService()
