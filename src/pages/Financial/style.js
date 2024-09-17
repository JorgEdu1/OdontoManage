import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;
  width: 100%;
  background-color: #ebebeb;
  color: ${(props) => props.theme.Colors.ON_PRIMARY};
  flex-direction: column;
`

export const DivTable = styled.div`
  width: 100%;
  height: 85%;
  h1 {
    margin-bottom: 20px;
  }
`

export const TablesContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 1rem;
  width: 100%;
  height: 100%;
`

export const Div = styled.div`
  width: 48%;
`

export const FinanceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 10px;
  border-radius: 10px;
  width: 100%;
`

export const Section = styled.div`
  text-align: center;
`

export const MainValue = styled.span`
  font-size: 1em;
  color: ${({ color }) => color || '#000'};
  margin: 0;
`

export const SubText = styled.span`
  font-size: 0.85em;
  color: #7d7d7d;
  margin: 0;
  text-align: right;
`

export const Icon = styled.span`
  font-size: 1em;
  margin-left: 5px;
  color: ${({ color }) => color || '#000'};
`
export const Underline = styled.div`
  height: 2px;
  background-color: ${({ color }) => color || '#000'};
  margin-top: 5px;
  margin-bottom: 5px;
`
