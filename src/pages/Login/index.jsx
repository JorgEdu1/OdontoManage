import React, { useState } from 'react'
import {
  Container,
  ContainerLogin,
  LogoContainer,
  Img,
  Form,
  Button,
  Line,
  ForgotPassword,
  Label,
  ContainerInput,
  InputPassword,
  PasswordInput,
  ToggleIcon,
  ErrorSpan,
  EnvelopeStyled,
  LockStyled,
} from './styles'
import ClinicaImg from '../../assets/equipment-dentist.jpg'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import Logo from '../../assets/logo-odontoManage.jsx'
import LoginService from '../../shared/services/Login/LoginService.js'
import LocalStorage from '../../utils/LocalStorage.js'
import { useToast } from '../../hooks/toast.jsx'

const Login = () => {
  const { addToast } = useToast()
  const [showPassword, setShowPassword] = useState(false)

  const Schema = z.object({
    Username: z.string().min(1, 'Usuário é obrigatório'),
    Password: z.string().min(1, 'Senha é obrigatório'),
  })

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(Schema),
  })

  const onSubmit = async (data) => {
    const response = await LoginService.loginAuth(data)
    if (response.status === 200) {
      LocalStorage.setValue('token', response.data.accessToken)
      window.location.href = '/'
    } else {
      addToast({
        type: 'error',
        title: 'Erro ao fazer login',
        description: 'Usuário ou senha inválidos',
      })
    }
  }

  return (
    <Container>
      <Img src={ClinicaImg} alt="Clinica" />
      <ContainerLogin>
        <LogoContainer>
          <Logo fill={'#1b9aaa'} width={'5rem'} height={'4rem'} />
          <p>OdontoManage</p>
        </LogoContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <ContainerInput>
            <Label htmlFor="email">Email</Label>
            <InputPassword>
              <PasswordInput
                type={'text'}
                name={'Username'}
                {...register('Username')}
              />
              <EnvelopeStyled size={24} weight="thin" />
            </InputPassword>

            <ErrorSpan>{errors.email?.message}</ErrorSpan>
          </ContainerInput>
          <ContainerInput>
            <Label htmlFor="Password">Senha</Label>
            <InputPassword>
              <PasswordInput
                type={showPassword ? 'text' : 'password'}
                name={'Password'}
                {...register('Password')}
              />
              <LockStyled size={24} weight="thin" />
              <ToggleIcon>
                {showPassword ? (
                  <EyeSlash
                    size={20}
                    weight="thin"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <Eye
                    size={20}
                    weight="thin"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </ToggleIcon>
            </InputPassword>
            <ErrorSpan>{errors.Password?.message}</ErrorSpan>
          </ContainerInput>
          <Button type="submit">Entrar</Button>
          <Line />
          <ForgotPassword href="#">Esqueceu a senha?</ForgotPassword>
        </Form>
      </ContainerLogin>
    </Container>
  )
}

export default Login
