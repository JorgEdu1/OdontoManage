import React from 'react'
import * as S from './style'

const Saldo = () => {
  return (
    <S.Section>
      <S.MainValue color="#3498db">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span>SALDO</span>
          <S.Icon color="#3498db">↙</S.Icon>
        </div>
        <S.DivSubText>
          <S.SubText>R$ 0,00 </S.SubText>
        </S.DivSubText>
      </S.MainValue>
      <S.Underline color="#3498db" />
      <S.SubText>Total previsto R$ 0,00</S.SubText>
    </S.Section>
  )
}

export default Saldo
