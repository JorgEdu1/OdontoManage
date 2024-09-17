import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Modal, Form, Input, Row, Col, Divider, ConfigProvider } from 'antd'
import ptBR from 'antd/lib/locale/pt_BR'
import moment from 'moment'
import 'moment/locale/pt-br'
import { useStock } from '../../../../hooks/StockContext'
import { useToast } from '../../../../hooks/toast'

moment.locale('pt-br')

const AddEstoque = ({ visible, onCancel, form, initialValues }) => {
  const { addToast } = useToast()
  const { addStock, updateStock } = useStock()
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
      })
    }
  }, [initialValues, form])

  const onOk = async () => {
    try {
      const values = await form.validateFields()
      if (initialValues) {
        const res = await updateStock({ ...initialValues, ...values })
        if (res.status === 200) {
          addToast({
            type: 'success',
            title: 'Sucesso!',
            description: 'Produto atualizado com sucesso.',
          })
        } else {
          addToast({
            type: 'error',
            title: 'Erro!',
            description: 'Erro ao atualizar produto.',
          })
        }
      } else {
        values.price = parseInt(values.price)
        const res = await addStock(values)
        if (res.status === 200) {
          addToast({
            type: 'success',
            title: 'Sucesso!',
            description: 'Produto cadastrado com sucesso.',
          })
        } else {
          addToast({
            type: 'error',
            title: 'Erro!',
            description: 'Erro ao cadastrar produto.',
          })
        }
      }
      onCancel()
    } catch (error) {
      console.log('Erro ao salvar produto:', error)
      addToast({
        type: 'error',
        title: 'Erro!',
        description: 'Erro ao cadastrar produto.',
      })
    }
  }

  return (
    <ConfigProvider locale={ptBR}>
      <Modal
        title={initialValues ? 'Editar Produto' : 'Cadastrar Novo Produto'}
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText={initialValues ? 'Salvar' : 'Cadastrar'}
        cancelText="Cancelar"
        width={500}
      >
        <Form form={form} layout="vertical">
          <Divider orientation="center">Informações do Produto</Divider>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="name"
                label="Produto"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o nome do produto',
                  },
                ]}
              >
                <Input placeholder="Nome do produto" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="amount"
                label="Quantidade"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a quantidade de produtos',
                  },
                ]}
              >
                <Input placeholder="Quantidade" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="price"
                label="Preço"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o preço do produto',
                  },
                ]}
              >
                <Input placeholder="Preço" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </ConfigProvider>
  )
}

AddEstoque.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
}

export default AddEstoque
