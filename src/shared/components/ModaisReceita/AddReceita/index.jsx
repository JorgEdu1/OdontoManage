import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
  DatePicker,
  Divider,
  ConfigProvider,
} from 'antd'
import ptBR from 'antd/lib/locale/pt_BR'
import moment from 'moment'
import 'moment/locale/pt-br'

moment.locale('pt-br')

const { Option } = Select

const AddReceita = ({ visible, onOk, onCancel, form, initialValues }) => {
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        paymentDate: initialValues.paymentDate
          ? moment(initialValues.birthday, 'YYYY-MM-DD')
          : null,
      })
    }
  }, [initialValues, form])

  return (
    <ConfigProvider locale={ptBR}>
      <Modal
        title={initialValues ? 'Editar Receita' : 'Cadastrar Nova Receita'}
        open={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText={initialValues ? 'Salvar' : 'Cadastrar'}
        cancelText="Cancelar"
        width={800}
      >
        <Form form={form} layout="vertical">
          <Divider orientation="left">Informações da Receita</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="value"
                label="Valor"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o valor da receita',
                  },
                ]}
              >
                <Input placeholder="Valor da receita" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="description"
                label="Descrição"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a descrição da receita',
                  },
                ]}
              >
                <Input placeholder="Descrição da receita" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="observation" label="Observação">
                <Input.TextArea placeholder="Observação" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="paymentDate"
                label="Data de Pagamento"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a data de pagamento',
                  },
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="Selecione a data de pagamento"
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paymentMethod"
                label="Método de Pagamento"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, selecione o método de pagamento',
                  },
                ]}
              >
                <Select placeholder="Selecione o método de pagamento">
                  <Option value="Dinheiro">Dinheiro</Option>
                  <Option value="Cartão">Cartão</Option>
                  <Option value="Boleto">Boleto</Option>
                  <Option value="PIX">PIX</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </ConfigProvider>
  )
}

AddReceita.propTypes = {
  visible: PropTypes.bool.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
}

export default AddReceita
