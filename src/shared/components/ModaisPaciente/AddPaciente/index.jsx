import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  Radio,
  Select,
  DatePicker,
  Switch,
  Divider,
  ConfigProvider,
} from 'antd'
import ptBR from 'antd/lib/locale/pt_BR'
import moment from 'moment'
import 'moment/locale/pt-br'
import InputMask from 'react-input-mask'
import { usePatient } from '../../../../hooks/PacientContext'
import { useToast } from '../../../../hooks/toast'

moment.locale('pt-br')

const { Option } = Select

const AddPaciente = ({ visible, onCancel, form, initialValues }) => {
  const { addToast } = useToast()
  const [isForeigner, setIsForeigner] = useState(false)
  const { addPaciente, updatePaciente } = usePatient()

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        birthDate: initialValues.birthday
          ? moment(initialValues.birthday, 'YYYY-MM-DD')
          : null,
        gender: initialValues.gender.toString(),
        patientForeigner: initialValues.isForeign,
        cep: initialValues.address?.zipCode,
        street: initialValues.address?.street,
        neighborhood: initialValues.address?.neighborhood,
        city: initialValues.address?.city,
        state: initialValues.address?.state,
      })
      setIsForeigner(initialValues.isForeign)
    }
  }, [initialValues, form])

  const handleForeignerChange = (checked) => {
    setIsForeigner(checked)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      const formattedValues = {
        name: values.name,
        age: moment().diff(values.birthDate, 'years'),
        cpf: values.cpf,
        rg: values.rg,
        phone: values.phone,
        gender: parseInt(values.gender, 10),
        isForeign: values.patientForeigner,
        address: {
          street: values.street,
          neighborhood: values.neighborhood,
          city: values.city,
          state: values.state,
          zipCode: values.cep,
        },
        document: values.document || '',
        birthday: values.birthDate
          ? {
              year: values.birthDate.year(),
              month: values.birthDate.month() + 1,
              day: values.birthDate.date(),
            }
          : null,
      }

      if (initialValues) {
        const response = await updatePaciente({
          ...initialValues,
          ...formattedValues,
        })
        if (response.status === 200) {
          addToast({
            type: 'success',
            title: 'Paciente atualizado com sucesso!',
            description: 'O paciente foi atualizado com sucesso.',
          })
        } else {
          addToast({
            type: 'error',
            title: 'Erro ao atualizar paciente',
            description: 'Ocorreu um erro ao atualizar o paciente.',
          })
        }
      } else {
        const response = await addPaciente(formattedValues)
        if (response.status === 200) {
          addToast({
            type: 'success',
            title: 'Paciente cadastrado com sucesso!',
            description: 'O paciente foi cadastrado com sucesso.',
          })
        } else {
          addToast({
            type: 'error',
            title: 'Erro ao cadastrar paciente',
            description: 'Ocorreu um erro ao cadastrar o paciente.',
          })
        }
      }
      form.resetFields()
      onCancel()
    } catch (error) {
      console.log('Erro ao salvar paciente:', error)
    }
  }

  return (
    <ConfigProvider locale={ptBR}>
      <Modal
        title={initialValues ? 'Editar Paciente' : 'Cadastrar Novo Paciente'}
        open={visible}
        onOk={handleOk}
        onCancel={onCancel}
        okText={initialValues ? 'Salvar' : 'Cadastrar'}
        cancelText="Cancelar"
        width={800}
      >
        <Form form={form} layout="vertical">
          <Divider orientation="left">Informações Adicionais</Divider>
          <Row gutter={16}>
            <Col span={11}>
              <Form.Item
                name="name"
                label="Nome"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o nome do paciente',
                  },
                ]}
              >
                <Input placeholder="Nome do paciente" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                name="gender"
                label="Sexo"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, selecione o sexo do paciente',
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="1">Masculino</Radio>
                  <Radio value="2">Feminino</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                name="patientForeigner"
                label="Paciente Estrangeiro"
                valuePropName="checked"
              >
                <Switch onChange={handleForeignerChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="birthDate"
                label="Data de Nascimento"
                rules={[
                  {
                    required: true,
                    message:
                      'Por favor, insira a data de nascimento do paciente',
                  },
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  placeholder="Selecione a data de nascimento"
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>
            {isForeigner ? (
              <Col span={12}>
                <Form.Item
                  name="document"
                  label="Documento"
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, insira o documento do paciente',
                    },
                  ]}
                >
                  <Input placeholder="Documento do paciente" />
                </Form.Item>
              </Col>
            ) : (
              <>
                <Col span={6}>
                  <Form.Item
                    name="cpf"
                    label="CPF"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, insira o CPF do paciente',
                      },
                    ]}
                  >
                    <InputMask mask="999.999.999-99">
                      {(inputProps) => (
                        <Input {...inputProps} placeholder="CPF do paciente" />
                      )}
                    </InputMask>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="rg"
                    label="RG"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, insira o RG do paciente',
                      },
                    ]}
                  >
                    <InputMask mask="99.999.999-9">
                      {(inputProps) => (
                        <Input {...inputProps} placeholder="RG do paciente" />
                      )}
                    </InputMask>
                  </Form.Item>
                </Col>
              </>
            )}
            <Col span={6}>
              <Form.Item
                name="phone"
                label="Telefone"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o telefone do paciente',
                  },
                ]}
              >
                <Input
                  addonBefore={
                    <Select defaultValue="+55" style={{ width: 70 }}>
                      <Option value="+55">BR +55</Option>
                      <Option value="+1">US +1</Option>
                    </Select>
                  }
                  placeholder="Telefone do paciente"
                />
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Informações de Endereço</Divider>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                name="cep"
                label="CEP"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o CEP do paciente',
                  },
                ]}
              >
                <InputMask mask="99999-999">
                  {(inputProps) => (
                    <Input {...inputProps} placeholder="CEP do paciente" />
                  )}
                </InputMask>
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="street"
                label="Rua"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a rua do paciente',
                  },
                ]}
              >
                <Input placeholder="Rua do paciente" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="neighborhood"
                label="Bairro"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o bairro do paciente',
                  },
                ]}
              >
                <Input placeholder="Bairro do paciente" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="city"
                label="Cidade"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira a cidade do paciente',
                  },
                ]}
              >
                <Input placeholder="Cidade do paciente" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="state"
                label="Estado"
                rules={[
                  {
                    required: true,
                    message: 'Por favor, insira o estado do paciente',
                  },
                ]}
              >
                <Input placeholder="Estado do paciente" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </ConfigProvider>
  )
}

AddPaciente.propTypes = {
  visible: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  initialValues: PropTypes.object,
}

export default AddPaciente
