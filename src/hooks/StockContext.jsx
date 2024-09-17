import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import StockService from '../shared/services/Stock/StockService.js'

const StockContext = createContext()

export const useStock = () => useContext(StockContext)

export const StockProvider = ({ children }) => {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStocks()
  }, [])

  const fetchStocks = async () => {
    setLoading(true)
    try {
      const response = await StockService.getStocks()
      setStocks(response.data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const addStock = async (data) => {
    try {
      const response = await StockService.createStock(data)
      setStocks([...stocks, response.data])
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const updateStock = async (data) => {
    try {
      const response = await StockService.updateStock(data)
      setStocks(stocks.map((p) => (p.id === data.id ? response.data : p)))
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const deleteStock = async (id) => {
    try {
      const response = await StockService.deleteStock(id)
      setStocks(stocks.filter((p) => p.id !== id))
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <StockContext.Provider
      value={{
        stocks,
        loading,
        addStock,
        updateStock,
        deleteStock,
      }}
    >
      {children}
    </StockContext.Provider>
  )
}

StockProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
