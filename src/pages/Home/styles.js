import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.Colors.PRIMARY};
  color: ${(props) => props.theme.Colors.ON_PRIMARY};

  > h1 {
    font-family: ubuntu;
  }
`
