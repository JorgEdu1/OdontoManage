import LoginApi from './api/LoginApi'
import LocalStorage from '../../../utils/LocalStorage'

class LoginService {
  async loginAuth(data) {
    try {
      const response = await LoginApi.loginAuth(data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async logout() {
    try {
      LocalStorage.clearAllValues()
      window.location.href = '/'
    } catch (error) {
      console.log(error)
      throw error
    }
  }
}

export default new LoginService()
