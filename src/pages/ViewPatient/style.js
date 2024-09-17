import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: #ebebeb;
  color: ${(props) => props.theme.Colors.ON_PRIMARY};
`

export const Div = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 95%;
  width: 95%;
  background-color: #fff;
  border-radius: 1rem;
`
