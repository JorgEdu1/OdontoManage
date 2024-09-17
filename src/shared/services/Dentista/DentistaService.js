import DentistaApi from './api/DentistaApi'

class DentistaService {
  async getDentistas() {
    try {
      const response = await DentistaApi.getDentistas()
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default new DentistaService()
