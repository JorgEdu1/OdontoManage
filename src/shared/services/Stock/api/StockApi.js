import { api } from '../../api/axios'

export default new (class StockApi {
  async getStocks() {
    try {
      const response = await api.get('/itens')
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async createStock(data) {
    try {
      const response = await api.post('/itens', data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async updateStock(data) {
    try {
      const response = await api.put(`/itens/${data.id}`, data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  async deleteStock(id) {
    try {
      const response = await api.delete(`/itens/${id}`)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }
})()
