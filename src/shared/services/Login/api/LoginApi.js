import { api } from '../../api/axios'

export default new (class LoginApi {
  async loginAuth(data) {
    try {
      const response = await api.post('/users/login', data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }
})()
