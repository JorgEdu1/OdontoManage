import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 81%;
  width: 97%;
  background-color: #ebebeb;
  border-radius: 10px;

  @media (min-width: 2560px) {
    width: 99%;
    height: 95%;
  }
`

export const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  width: 45%;
  background-color: #fff;
`
export const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90%;
  width: 45%;
  background-color: #fff;
  gap: 20px;
`

export const DivTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  background-color: #f0f0f0;
  padding: 10px;
  > h2 {
    padding: 0 16px;
    color: #696969;
    font:
      400 20px / 32px Roboto,
      Helvetica Neue,
      sans-serif;
  }
`
