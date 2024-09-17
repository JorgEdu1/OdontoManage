import React from 'react'
import * as S from './style'

const Receitas = () => {
  return (
    <S.Section>
      <S.MainValue color="#2ecc71">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span>RECEITA</span>
          <S.Icon color="#2ecc71">↙</S.Icon>
        </div>
        <S.DivSubText>
          <S.SubText>R$ 0,00 </S.SubText>
          <S.SubText>A receber: R$ 200,00</S.SubText>
        </S.DivSubText>
      </S.MainValue>
      <S.Underline color="#2ecc71" />
      <S.SubText>Total previsto R$ 0,00</S.SubText>
    </S.Section>
  )
}

export default Receitas
