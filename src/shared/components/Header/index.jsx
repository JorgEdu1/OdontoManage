import React, { useState } from 'react'
// import { Navigate } from 'react-router-dom'
import MenuKeys from './utils'
import * as S from './style'
import Logo from '../../../assets/logo-odontoManage.jsx'
import { SignOut } from 'phosphor-react'
import LocalStorage from '../../../utils/LocalStorage.js'

const Header = () => {
  const [selectedItem, setSelectedItem] = useState(5)
  // const [redirect, setRedirect] = useState(false)

  // useEffect(() => {
  //   if (selectedItem === 5) {
  //     setRedirect(true)
  //   }
  // }, [selectedItem])

  const logout = () => {
    LocalStorage.removeValue('token')
    window.location.href = '/'
  }

  const handleItemClick = (id) => {
    setSelectedItem(id)
    // setRedirect(false)
  }

  return (
    <S.Container>
      <S.Nav>
        <S.Logo>
          <Logo />
          <S.LogoText>OdontoManage</S.LogoText>
        </S.Logo>
        <S.Menu>
          {MenuKeys.map((item) => (
            <S.NavItem key={item.id} $isSelected={selectedItem === item.id}>
              <S.StyledLink
                to={item.path}
                onClick={() => handleItemClick(item.id)}
                $isSelected={selectedItem === item.id}
              >
                {item.icon}
                {item.name}
              </S.StyledLink>
            </S.NavItem>
          ))}
        </S.Menu>
      </S.Nav>
      <S.SignOut>
        <SignOut size={32} />
        <S.SignOutButton onClick={() => logout()}>Sair</S.SignOutButton>
      </S.SignOut>
    </S.Container>
  )
}

export default Header
