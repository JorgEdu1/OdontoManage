import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;

  height: 81%;
  width: 97%;
  background-color: #ebebeb;
  border-radius: 10px;
  padding: 0 16px;
  @media (min-width: 2560px) {
    width: 99%;
    height: 95%;
  }
`

export const DivAbout = styled.div`
  display: flex;
  flex-direction: column;
  height: 45%;
  width: 45%;
  background-color: #fff;
  border-radius: 10px;
`
export const DivTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 3rem;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 10px 10px 0 0;

  > h2 {
    padding: 0 16px;
    font-size: 1.5em;
    color: #696969;
    font:
      400 20px / 32px Roboto,
      Helvetica Neue,
      sans-serif;
  }
`
export const DivContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90%;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
`

export const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #696969;
`

export const DivText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  width: 100%;

  > p {
    font-size: 1em;
    color: #696969;
    font:
      400 16px / 24px Roboto,
      Helvetica Neue,
      sans-serif;
  }
`

export const Line = styled.div`
  margin: 10px 0;
  width: 100%;
  display: block;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #0000001f;
  -webkit-font-smoothing: antialiased;
`
