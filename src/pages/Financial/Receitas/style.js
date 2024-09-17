import styled from 'styled-components'

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 15%;
  padding: 1rem;
`

export const MainValue = styled.span`
  font-size: 1em;
  color: ${({ color }) => color || '#000'};
  margin: 0;
`
export const DivSubText = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const SubText = styled.span`
  font-size: 0.85em;
  color: #7d7d7d;
  margin: 0;
  text-align: right;
`

export const Icon = styled.span`
  font-size: 1.5em;
  margin-left: 5px;
  color: ${({ color }) => color || '#000'};
`
export const Underline = styled.div`
  height: 2px;
  background-color: ${({ color }) => color || '#000'};
  margin-top: 5px;
  margin-bottom: 5px;
`
