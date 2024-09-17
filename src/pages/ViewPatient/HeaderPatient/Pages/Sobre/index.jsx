import React, { useEffect, useState } from 'react'
import * as S from './style'
import ContainerInfo from './ContainerInfo'
import { useParams } from 'react-router-dom'
import PacienteService from '../../../../../shared/services/Paciente/PacienteService'

const InfoPaciente = () => {
  const { id } = useParams()
  const [patient, setPatient] = useState({})

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await PacienteService.getPacienteById(id)
        setPatient(response.data)
      } catch (error) {
        console.error('Error fetching patient:', error)
      }
    }

    fetchPatient()
  }, [id])

  return (
    <S.Container>
      <ContainerInfo
        title="Informações Pessoais"
        infoList={[
          { label: 'Nome', value: patient.name || 'N/A' },
          { label: 'CPF', value: patient.cpf || 'N/A' },
          { label: 'RG', value: patient.rg || 'N/A' },
          { label: 'Data de Nascimento', value: patient.birthday || 'N/A' },
        ]}
      />
      <ContainerInfo
        title="Informações de Contato"
        infoList={[{ label: 'Telefone', value: patient.phone || 'N/A' }]}
      />
      <ContainerInfo
        title="Informações de Endereço"
        infoList={[
          { label: 'Endereço', value: patient.address?.street || 'N/A' },
          { label: 'Cidade', value: patient.address?.city || 'N/A' },
          { label: 'Estado', value: patient.address?.state || 'N/A' },
          { label: 'CEP', value: patient.address?.zipCode || 'N/A' },
          { label: 'País', value: patient.address?.country || 'Brasil' },
        ]}
      />
      <ContainerInfo
        title="Informações Adicionais"
        infoList={[
          {
            label: 'Sexo',
            value:
              patient.gender === 1
                ? 'Masculino'
                : patient.gender === 2
                  ? 'Feminino'
                  : 'N/A',
          },
          { label: 'Idade', value: patient.age || 'N/A' },
          {
            label: 'Estrangeiro',
            value: patient.isForeign ? 'Sim' : 'Não',
          },
        ]}
      />
    </S.Container>
  )
}

export default InfoPaciente
