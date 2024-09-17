import React, { useState } from 'react'
import { Container } from './style'
import Listing from '../../shared/components/Listing'
import WithDraw from './Withdraw'
import { Form, Modal, Tooltip } from 'antd'
import { PencilLine, Trash } from 'phosphor-react'
import AddEstoque from '../../shared/components/ModaisEstoque/AddEstoque'
import { useStock } from '../../hooks/StockContext'
import { useToast } from '../../hooks/toast'

const Stock = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const { stocks, addStock, updateStock, deleteStock, loading } = useStock()
  const [form] = Form.useForm()
  const { addToast } = useToast()

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir este produto?',
      okText: 'Sim',
      cancelText: 'Não',
      width: 400,
      style: {
        top: '40%',
      },
      onOk: async () => {
        const res = await deleteStock(record.id)
        if (res.status === 204) {
          addToast({
            type: 'success',
            title: 'Sucesso!',
            description: 'Produto excluído com sucesso.',
          })
        } else {
          addToast({
            type: 'error',
            title: 'Erro!',
            description: 'Erro ao excluir produto.',
          })
        }
      },
    })
  }

  const handleEdit = (record) => {
    setSelectedProduct(record)
    setIsModalVisible(true)
    form.setFieldsValue({
      ...record,
    })
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (selectedProduct) {
        await updateStock({ ...selectedProduct, ...values })
      } else {
        await addStock(values)
      }
      setIsModalVisible(false)
    } catch (error) {
      console.log('Erro ao salvar produto:', error)
    }
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantidade',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Retirada',
      key: 'withdrawal',
      render: (text, record) => (
        <div
          style={{
            display: 'flex',
          }}
        >
          <WithDraw record={record} />
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
          <Tooltip title="Editar Produto">
            <PencilLine
              onClick={() => handleEdit(record)}
              size={20}
              cursor="pointer"
            />
          </Tooltip>
          <Tooltip title="Deletar Produto">
            <Trash
              onClick={() => handleDelete(record)}
              size={20}
              cursor="pointer"
            />
          </Tooltip>
        </div>
      ),
    },
  ]

  const dataWithKeys = stocks.map((stock) => ({
    ...stock,
    key: stock.id,
  }))

  return (
    <Container>
      <Listing
        object={1}
        title="Estoque"
        loading={loading}
        columns={columns}
        data={dataWithKeys}
        showSubMenu={true}
      />
      <AddEstoque
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        form={form}
        initialValues={selectedProduct}
      />
    </Container>
  )
}

export default Stock
