import styled from 'styled-components'
import { ArrowLeft } from 'phosphor-react'

export const Header = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;

  .ant-avatar {
    margin-right: 20px;
  }
`
export const StyleArrowLeft = styled(ArrowLeft)`
  cursor: pointer;
  margin-right: 20px;
  width: 1.5rem;
  height: 1.5rem;
`

export const PatientInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const PatientDetails = styled.div`
  margin-left: 10px;
`

export const PatientName = styled.div`
  font-size: 16px;
  font-weight: bold;
`

export const PatientRG = styled.div`
  font-size: 14px;
  color: #888;
`
