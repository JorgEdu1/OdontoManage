import TratamentoApi from './api/TratamentoApi'

class TratamentoService {
  async getTratamentos() {
    try {
      const response = await TratamentoApi.getTratamentos()
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async createTratamento(data) {
    try {
      const response = await TratamentoApi.createTratamento(data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async updateTratamento(data) {
    try {
      const response = await TratamentoApi.updateTratamento(data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteTratamento(id) {
    try {
      const response = await TratamentoApi.deleteTratamento(id)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async getTreatmentByPatientId(id, page = 1, pageSize = 10) {
    try {
      const response = await TratamentoApi.getTreatmentByPatientId(
        id,
        page,
        pageSize,
      )
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default new TratamentoService()
