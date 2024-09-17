import React, { useState, useEffect } from 'react'
import * as S from './style'
import { Button } from 'antd'
import Listing from '../../../../../shared/components/Listing'

const columns = [
  {
    title: 'Total Recebido',
    dataIndex: 'totalRecebido',
    key: 'totalRecebido',
  },
  {
    title: 'Total Devido',
    dataIndex: 'totalDevido',
    key: 'totalDevido',
  },
  {
    title: 'Data de Pagamento',
    dataIndex: 'dataPagamento',
    key: 'dataPagamento',
  },
]

const generateDebitos = () => {
  return [
    {
      id: 1,
      totalRecebido: 150.0,
      totalDevido: 50.0,
      dataPagamento: '2023-01-01',
    },
    {
      id: 2,
      totalRecebido: 200.0,
      totalDevido: 100.0,
      dataPagamento: '2023-02-01',
    },
    {
      id: 3,
      totalRecebido: 300.0,
      totalDevido: 150.0,
      dataPagamento: '2023-03-01',
    },
  ]
}

const DebitosPaciente = () => {
  const [debitos, setDebitos] = useState([])

  useEffect(() => {
    setDebitos(generateDebitos())
  }, [])

  const totalRecebido = debitos.reduce(
    (acc, debito) => acc + debito.totalRecebido,
    0,
  )
  const totalDevido = debitos.reduce(
    (acc, debito) => acc + debito.totalDevido,
    0,
  )

  const debitosComKey = debitos.map((debito, index) => ({
    ...debito,
    key: debito.id || index,
  }))

  return (
    <S.Container>
      <S.SubMenu>
        <S.ContainerDebito>
          <S.Box>
            <S.Label>TOTAL RECEBIDO</S.Label>
            <S.Value color="#4CAF50">R$ {totalRecebido.toFixed(2)} </S.Value>
            <S.Line color="#4CAF50" />
          </S.Box>
          <S.Box>
            <S.Label>TOTAL A RECEBER</S.Label>
            <S.Value color="#F44336">R$ {totalDevido.toFixed(2)} </S.Value>
            <S.Line color="#F44336" />
          </S.Box>
        </S.ContainerDebito>
        <Button type="primary">Novo Débito</Button>
      </S.SubMenu>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Listing columns={columns} data={debitosComKey} showSubMenu={false} />
      </div>
    </S.Container>
  )
}

export default DebitosPaciente
