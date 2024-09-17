import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: ${(props) => props.theme.Colors.BLUE_SECONDARY};
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.4);
`

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  gap: 1rem;
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 1rem 2rem;
`
export const LogoText = styled.h2`
  color: white;
  font-size: 1.3rem;
  font-weight: 500;
  font-family: 'Ubuntu', 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
`

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const NavItem = styled.div`
  margin: 1rem 2rem;
  background-color: ${(props) => (props.$isSelected ? 'white' : 'transparent')};
  border-radius: 0.5rem;
  padding: 0.5rem;
`

export const StyledLink = styled(Link)`
  color: ${(props) => (props.$isSelected ? 'black' : 'white')};
  font-size: 1.2rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  &:hover {
    color: black;
    transition: 0.5s;
  }
`

export const SignOut = styled.div`
  display: flex;
  color: white;
  cursor: pointer;
  margin: 2rem 3rem;
`

export const SignOutButton = styled.button`
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 0.5rem;
`
