import React, { useState } from 'react'
import { Container } from './style'
import Listing from '../../shared/components/Listing'
import * as S from './style'
import { Modal, Tooltip, Form } from 'antd'
import { PencilLine, Trash } from 'phosphor-react'
import Receitas from './Receitas'
import Despesas from './Despesas'
import AddReceita from '../../shared/components/ModaisReceita/AddReceita'
import AddDespesa from '../../shared/components/ModaisDespesa/AddDespesa'
import moment from 'moment'
import { HandCoins } from '@phosphor-icons/react'
import Saldo from './Saldo'

const { confirm } = Modal

const showConfirm = (record) => {
  confirm({
    title: 'Deseja receber receita deste paciente?',
    content: `Receita cujo o nome: ${record.description}`,
    onOk() {
      console.log('OK', record)
    },
    onCancel() {
      console.log('Cancel')
    },
  })
}

const Financial = () => {
  const [isReceitaModalVisible, setIsReceitaModalVisible] = useState(false)
  const [isDespesaModalVisible, setIsDespesaModalVisible] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [formReceita] = Form.useForm()
  const [formDespesa] = Form.useForm()

  const handleEditReceita = (record) => {
    setSelectedRecord(record)
    setIsReceitaModalVisible(true)
    formReceita.setFieldsValue({
      ...record,
      paymentDate: record.paymentDate
        ? moment(record.paymentDate, 'YYYY-MM-DD')
        : null,
    })
  }

  const handleEditDespesa = (record) => {
    setSelectedRecord(record)
    setIsDespesaModalVisible(true)
    formDespesa.setFieldsValue({
      ...record,
      paymentDate: record.paymentDate
        ? moment(record.paymentDate, 'YYYY-MM-DD')
        : null,
    })
  }

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir este registro?',
      okText: 'Sim',
      cancelText: 'Não',
      width: 400,
      style: {
        top: '40%',
      },
      onOk: async () => {
        console.log('Registro excluído:', record)
      },
    })
  }

  const handleModalCancel = () => {
    setIsReceitaModalVisible(false)
    setIsDespesaModalVisible(false)
    formReceita.resetFields()
    formDespesa.resetFields()
  }

  const handleOkReceita = () => {
    formReceita.validateFields().then((values) => {
      console.log('Form values:', values)
      setIsReceitaModalVisible(false)
    })
  }

  const handleOkDespesa = () => {
    formDespesa.validateFields().then((values) => {
      console.log('Form values:', values)
      setIsDespesaModalVisible(false)
    })
  }

  const columnsReceita = [
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Nome',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
    },
    {
      key: 'withdrawal',
      render: (text, record) => (
        <div
          style={{
            display: 'flex',
          }}
        >
          <Tooltip title="Receber receita">
            <HandCoins
              size={20}
              cursor="pointer"
              onClick={() => showConfirm(record)}
            />
          </Tooltip>
        </div>
      ),
    },
    {
      key: 'actions',
      render: (text, record) => (
        <div
          style={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <Tooltip title="Editar Receita">
            <PencilLine
              size={20}
              cursor="pointer"
              onClick={() => handleEditReceita(record)}
            />
          </Tooltip>
          <Tooltip title="Deletar Receita">
            <Trash
              size={20}
              cursor="pointer"
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ]

  const columnsDespesa = [
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Nome',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
    },
    {
      key: 'actions',
      render: (text, record) => (
        <div
          style={{
            display: 'flex',
            gap: '10px',
          }}
        >
          <Tooltip title="Editar Despesa">
            <PencilLine
              size={20}
              cursor="pointer"
              onClick={() => handleEditDespesa(record)}
            />
          </Tooltip>
          <Tooltip title="Deletar Despesa">
            <Trash
              size={20}
              cursor="pointer"
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </div>
      ),
    },
  ]

  const data = [
    {
      key: '1',
      date: '2021-09-01',
      description: 'Pagamento de salário',
      value: 'R$ 1.000,00',
    },
    {
      key: '2',
      date: '2021-09-02',
      description: 'Compra de materiais',
      value: 'R$ 500,00',
    },
    {
      key: '3',
      date: '2021-09-03',
      description: 'Pagamento de fornecedores',
      value: 'R$ 300,00',
    },
  ]

  return (
    <Container>
      <S.FinanceContainer>
        <Receitas />
        <Despesas />
        <Saldo />
      </S.FinanceContainer>
      <S.DivTable>
        <S.TablesContainer>
          <S.Div>
            <Listing
              title="Receitas"
              columns={columnsReceita}
              data={data}
              showSubMenu={true}
              object={2}
            />
          </S.Div>
          <S.Div>
            <Listing
              title="Despesas"
              columns={columnsDespesa}
              data={data}
              showSubMenu={true}
              object={3}
            />
          </S.Div>
        </S.TablesContainer>
      </S.DivTable>
      <AddReceita
        visible={isReceitaModalVisible}
        onOk={handleOkReceita}
        onCancel={handleModalCancel}
        form={formReceita}
        initialValues={selectedRecord}
        type="receita"
      />
      <AddDespesa
        visible={isDespesaModalVisible}
        onOk={handleOkDespesa}
        onCancel={handleModalCancel}
        form={formDespesa}
        initialValues={selectedRecord}
        type="despesa"
      />
    </Container>
  )
}

export default Financial
