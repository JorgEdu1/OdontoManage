import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 95%;
  width: 95%;
  background-color: #fff;
  border-radius: 1rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5625rem;
    flex-shrink: 0;
    border-radius: 0.625rem;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 0.625rem;
    background: #c4c4c4;
    width: 0.6875rem;
    width: 0.6875rem;
    flex-shrink: 0;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.Colors.SURFACE_CONTAINER};
    border-radius: 0.625rem;
    margin-top: 0.5rem;
  }

  @media (max-width: 1200px) {
    width: 90%;
    height: 90%;
  }

  @media (max-width: 992px) {
    width: 85%;
    height: 85%;
  }

  @media (max-width: 768px) {
    width: 80%;
    height: 80%;
  }

  @media (max-width: 576px) {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 2rem 2rem;

  button {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
  }

  h2 {
    flex-grow: 1;
    text-align: center;
    color: ${({ theme }) => theme.Colors.BLUE_SECONDARY};
  }
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 20px 0;
  padding: 1rem;
`

export const HeaderRow = styled.tr`
  background-color: #f5f5f5;
`

export const HeaderCell = styled.th`
  padding: 15px;
  border: 1px solid #ddd;
  text-align: center;
  background-color: #e0e0e0;
  border-radius: 10px 10px 0 0;

  &:first-child {
    background-color: #fff;
    border-radius: 10px 0 0 10px;
    border: none;
  }
`

export const BodyRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`

export const HourCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: center;
  font-weight: bold;
  background-color: #f5f5f5;

  /* Borda arredondada na primeira linha */
  &:first-child {
    border-radius: 10px;
  }
`

export const BodyCell = styled.td`
  padding: 20px;
  border: 1px solid #ddd;
  height: 70px;
  text-align: center;
  vertical-align: top;
  background-color: #fff;

  &:hover {
    background-color: #f9f9f9;
    cursor: pointer;
  }
`
