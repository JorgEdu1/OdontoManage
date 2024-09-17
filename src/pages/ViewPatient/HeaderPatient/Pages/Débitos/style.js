import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 81%;
  width: 97%;
  background-color: #ebebeb;
  border-radius: 10px;

  @media (min-width: 2560px) {
    width: 99%;
    height: 95%;
  }
`

export const SubMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
`

export const ContainerDebito = styled.div`
  display: flex;
  width: 20%;
  justify-content: space-around;
`

export const Box = styled.div`
  text-align: center;
`

export const Label = styled.p`
  font-size: 10px;
  color: #757575;
  margin: 0;
`

export const Value = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${({ color }) => color || '#000'};
  margin: 0;
  text-align: left;
`

export const Line = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${({ color }) => color || '#000'};
  margin-top: 5px;
`
