import StockApi from './api/StockApi'

class StockService {
  static async getStocks() {
    try {
      const response = await StockApi.getStocks()
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async createStock(data) {
    try {
      const response = await StockApi.createStock(data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async updateStock(data) {
    try {
      const response = await StockApi.updateStock(data)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async deleteStock(id) {
    try {
      const response = await StockApi.deleteStock(id)
      return response
    } catch (error) {
      console.log(error)
      return error
    }
  }
}

export default StockService
