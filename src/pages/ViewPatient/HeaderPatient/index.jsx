import React, { useState, useEffect } from 'react'
import * as S from './style'
import { Menu } from 'antd'
import {
  Link,
  useParams,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import menuItems from './utils'
import PacienteService from '../../../shared/services/Paciente/PacienteService'

const HeaderPatient = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [patient, setPatient] = useState({})

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await PacienteService.getPacienteById(id)
        setPatient(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPatient()
  }, [id])

  const items = menuItems.map((item) => ({
    key: item.key,
    label: (
      <Link to={typeof item.route === 'function' ? item.route(id) : item.route}>
        {item.label}
      </Link>
    ),
  }))

  const selectedKey = menuItems.find((item) =>
    location.pathname.includes(item.route(id)),
  )?.key

  return (
    <>
      <S.Header>
        <S.StyleArrowLeft onClick={() => navigate('/patients')} />
        <S.PatientInfo>
          <S.PatientDetails>
            <S.PatientName>{patient.name}</S.PatientName>
            <S.PatientRG>
              {patient.rg
                ? `RG: ${patient.rg}`
                : `Documento: ${patient.document}`}
            </S.PatientRG>
          </S.PatientDetails>
          <Menu mode="horizontal" items={items} selectedKeys={[selectedKey]} />
        </S.PatientInfo>
      </S.Header>
      <Outlet />
    </>
  )
}

export default HeaderPatient
