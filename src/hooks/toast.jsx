import { createContext, useContext, useCallback, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import PropTypes from 'prop-types'
import { ToastContainer } from '../shared/components/ToastContainer'

const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [messages, setMessages] = useState([])

  const addToast = useCallback(({ type, title, description }) => {
    const id = uuidv4()

    const toast = {
      id,
      type,
      title,
      description,
    }
    setMessages((state) => [...state, toast])
  }, [])
  const removeToast = useCallback((id) => {
    setMessages((state) => state.filter((message) => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be within a ToastProvider')
  }

  return context
}
