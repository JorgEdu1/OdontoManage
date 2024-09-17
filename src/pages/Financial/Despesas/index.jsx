import React from 'react'
import * as S from './style'

const Despesas = () => {
  return (
    <S.Section>
      <S.MainValue color="#e74c3c">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span>DESPESA</span>
          <S.Icon color="#e74c3c">↘</S.Icon>
        </div>
        <S.DivSubText>
          <S.SubText>R$ 0,00 </S.SubText>
          <S.SubText>A pagar: R$ 200,00</S.SubText>
        </S.DivSubText>
      </S.MainValue>

      <S.Underline color="#e74c3c" />
      <S.SubText>Total previsto R$ 0,00</S.SubText>
    </S.Section>
  )
}

export default Despesas
