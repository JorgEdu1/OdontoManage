import styled from 'styled-components'
import { Envelope, Lock } from '@phosphor-icons/react'

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100vw;
`

export const LogoContainer = styled.h1`
  display: flex;
  align-items: center;
  > p {
    font-family: 'Ubuntu';
    font-size: 2.3rem;
    font-weight: 500;
    color: #1b9aaa;
  }
`

export const ContainerLogin = styled.div`
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 35vw;
  height: 100vh;
  gap: 3rem;
`

export const Img = styled.img`
  width: 65vw;
  height: 100vh;
  object-fit: cover;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 300px;
  padding: 20px;
`

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #1b9aaa;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    opacity: 0.6;
  }
`

export const ContainerInput = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
`

export const ForgotPassword = styled.a`
  margin: 10px 0;
  color: #1b9aaa;
  text-decoration: none;
  transition: all 0.3s;
  &:hover {
    opacity: 0.6;
  }
`

export const Label = styled.label`
  font-size: 20px;
  margin: 10px 0;
`

export const InputPassword = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const PasswordInput = styled.input`
  width: 100%;
  padding: 10px 30px 10px 40px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: all 0.3s;
  &:focus {
    border: 1px solid #1b9aaa;
  }
`

export const ToggleIcon = styled.div`
  position: absolute;
  right: 0.5rem;
  top: 1.2rem;
  cursor: pointer;
`

export const EnvelopeStyled = styled(Envelope)`
  position: absolute;
  left: 0.5rem;
  top: 1rem;
`

export const LockStyled = styled(Lock)`
  position: absolute;
  left: 0.5rem;
  top: 1rem;
`

export const ErrorSpan = styled.span`
  position: absolute;
  color: red;
  font-size: 0.8rem;
  margin-top: 100px;
`
