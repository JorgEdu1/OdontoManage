import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import PacienteService from '../shared/services/Paciente/PacienteService'

const PatientContext = createContext()

export const usePatient = () => useContext(PatientContext)

export const PatientProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPacientes()
  }, [])

  const fetchPacientes = async () => {
    setLoading(true)
    try {
      const response = await PacienteService.getPacientes()
      setPacientes(response.data)
      return response
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const addPaciente = async (data) => {
    try {
      const response = await PacienteService.createPaciente(data)
      setPacientes([...pacientes, response.data])
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const updatePaciente = async (data) => {
    try {
      const response = await PacienteService.updatePaciente(data)
      setPacientes(pacientes.map((p) => (p.id === data.id ? response.data : p)))
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const deletePaciente = async (id) => {
    try {
      const response = await PacienteService.deletePaciente(id)
      setPacientes(pacientes.filter((p) => p.id !== id))
      return response
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <PatientContext.Provider
      value={{
        pacientes,
        loading,
        addPaciente,
        updatePaciente,
        deletePaciente,
        fetchPacientes,
      }}
    >
      {children}
    </PatientContext.Provider>
  )
}

PatientProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
