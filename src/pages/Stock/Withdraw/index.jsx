import React, { useState } from 'react'
import { ConfigProvider, Modal, Form, Input, Row, Col, Divider } from 'antd'
import ptbr from 'antd/lib/locale/pt_BR'
import { HandWithdraw } from '@phosphor-icons/react'
import { useStock } from '../../../hooks/StockContext'
import { useToast } from '../../../hooks/toast'

const WithDraw = ({ record }) => {
  const { addToast } = useToast()
  const { updateStock } = useStock()
  const [quantidade, setQuantidade] = useState(0)
  const [open, setOpen] = useState(false)
  const showModal = () => {
    setOpen(true)
  }
  const handleOk = async () => {
    try {
      if (quantidade > record.amount) {
        addToast({
          type: 'error',
          title: 'Erro!',
          description: 'Quantidade maior que a disponível.',
        })
        setOpen(false)
      } else {
        record.amount = record.amount - quantidade
        const res = await updateStock(record)
        if (res.status === 200) {
          addToast({
            type: 'success',
            title: 'Sucesso!',
            description: 'Produto retirado com sucesso.',
          })
        } else {
          addToast({
            type: 'error',
            title: 'Erro!',
            description: 'Erro ao retirar produto.',
          })
        }
      }
    } catch (error) {
      console.log(error)
    }
    setOpen(false)
  }
  const handleCancel = () => {
    setOpen(false)
  }
  return (
    <>
      <ConfigProvider locale={ptbr}>
        <HandWithdraw size={20} cursor="pointer" onClick={showModal} />
        <Modal
          title="Retirar item"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          locale={ptbr}
        >
          <Form layout="vertical">
            <Divider orientation="center">Informações do Produto</Divider>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Produto"
                  name="name"
                  initialValue={record.name}
                >
                  <Input disabled />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Quantidade"
                  name="quantity"
                  initialValue={record.quantity}
                >
                  <Input
                    type="number"
                    onChange={(e) => setQuantidade(e.target.value)}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  )
}
export default WithDraw
