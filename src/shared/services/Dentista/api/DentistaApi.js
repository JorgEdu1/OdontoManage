import { api } from '../../api/axios'

export default new (class DentistaApi {
  async getDentistas() {
    try {
      const response = await api.get('/dentists')
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }
})()
