import styled from 'styled-components'
import { Table, Button } from 'antd'
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)`
  color: ${(props) => props.theme.Colors.BLUE_SECONDARY};
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.Colors.BLUE_PRIMARY};
    text-decoration: underline;
  }
`

export const SkeletonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 4rem;
  height: 100%;
  width: 100%;
`

export const StyledTable = styled(Table)`
  width: 100%;
  padding: 2rem;
  .ant-table {
    font-size: 16px;
  }
  p {
    padding: 0 3rem;
  }
`

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
export const SubMenu = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem 2rem;
`

export const CustomButton = styled(Button)`
  background-color: ${(props) => props.theme.Colors.BLUE_SECONDARY} !important;
  color: #fff !important;

  &:hover {
    background-color: ${(props) =>
      props.theme.Colors.BLUE_SECONDARY} !important;
    color: #fff !important;
    border-color: ${(props) => props.theme.Colors.BLUE_SECONDARY} !important;
  }
  &:focus {
    background-color: ${(props) =>
      props.theme.Colors.BLUE_SECONDARY} !important;
    color: #fff !important;
  }
`
