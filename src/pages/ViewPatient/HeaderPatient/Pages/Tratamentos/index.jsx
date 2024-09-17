import React, { useEffect, useState } from 'react'
import * as S from './style'
import Listing from '../../../../../shared/components/Listing'
import {
  Form,
  Select,
  Button,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Radio,
  ConfigProvider,
} from 'antd'
import { useParams } from 'react-router-dom'
import TratamentoService from '../../../../../shared/services/Tratamento/TratamentoService'
import DentistaService from '../../../../../shared/services/Dentista/DentistaService'
import ptBR from 'antd/lib/locale/pt_BR'
import { useToast } from '../../../../../hooks/toast'

const { Option } = Select

const regionEnum = {
  UpperRightMolar: 1,
  UpperRightPremolar: 2,
  UpperRightCanine: 3,
  UpperRightIncisor: 4,
  UpperLeftIncisor: 5,
  UpperLeftCanine: 6,
}

const TratamentosPaciente = () => {
  const { id } = useParams()
  const [tratamentos, setTratamentos] = useState([])
  const [availableTreatments, setAvailableTreatments] = useState([])
  const [dentistas, setDentistas] = useState([])
  const [treatmentMap, setTreatmentMap] = useState({})
  const { addToast } = useToast()

  useEffect(() => {
    const fetchTratamentos = async () => {
      try {
        const response = await TratamentoService.getTreatmentByPatientId(id)
        setTratamentos(response.data)
      } catch (error) {
        console.error('Error fetching treatments:', error)
      }
    }

    const fetchAvailableTreatments = async () => {
      try {
        const response = await TratamentoService.getTratamentos()
        setAvailableTreatments(response.data)
        const map = response.data.reduce((acc, treatment) => {
          acc[treatment.id] = treatment.name
          return acc
        }, {})
        setTreatmentMap(map)
      } catch (error) {
        console.error('Error fetching available treatments:', error)
      }
    }

    const fetchDentistas = async () => {
      try {
        const response = await DentistaService.getDentistas()
        setDentistas(response.data)
      } catch (error) {
        console.error('Error fetching dentists:', error)
      }
    }

    fetchTratamentos()
    fetchAvailableTreatments()
    fetchDentistas()
  }, [id])

  const handleAddTreatment = async (values) => {
    try {
      const formattedValues = {
        ...values,
        patientId: id,
        region: parseInt(values.region, 10),
        installmentDueDate: {
          year: values.installmentDueDate.year(),
          month: values.installmentDueDate.month() + 1,
          day: values.installmentDueDate.date(),
        },
        paid: values.paid === 'true',
      }
      await TratamentoService.createTratamento(formattedValues)
      const response = await TratamentoService.getTreatmentByPatientId(id)
      setTratamentos(response.data)
      addToast({
        type: 'success',
        title: 'Tratamento Adicionado',
        description: 'O tratamento foi adicionado com sucesso.',
      })
    } catch (error) {
      console.error('Error adding treatment:', error)
      addToast({
        type: 'error',
        title: 'Erro ao Adicionar Tratamento',
        description: 'Ocorreu um erro ao adicionar o tratamento.',
      })
    }
  }

  const columns = [
    {
      title: 'Tratamento',
      dataIndex: 'clinicalTreatmentId',
      key: 'clinicalTreatmentId',
      render: (text) => treatmentMap[text] || text,
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      render: (value) =>
        `R$ ${value
          .toFixed(2)
          .replace('.', ',')
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`,
    },
  ]

  const tratamentosComKey = tratamentos.map((tratamento, index) => ({
    ...tratamento,
    key: tratamento.sessionId || index,
  }))

  return (
    <S.Container>
      <S.LeftDiv>
        <S.DivTitle>
          <h2>Adicionar Tratamento</h2>
        </S.DivTitle>
        <div
          style={{
            padding: '10px',
            marginTop: '20px',
            width: '95%',
          }}
        >
          <ConfigProvider locale={ptBR}>
            <Form
              layout="vertical"
              onFinish={handleAddTreatment}
              initialValues={{ paid: 'false' }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="clinicalTreatmentId"
                    label="Tratamento"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, insira o tratamento clínico',
                      },
                    ]}
                  >
                    <Select placeholder="Selecione o tratamento clínico">
                      {availableTreatments.map((treatment) => (
                        <Option key={treatment.id} value={treatment.id}>
                          {treatment.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dentistId"
                    label="Dentista"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, selecione o dentista',
                      },
                    ]}
                  >
                    <Select placeholder="Selecione o dentista">
                      {dentistas.map((dentist) => (
                        <Option key={dentist.id} value={dentist.id}>
                          {dentist.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="teeths"
                    label="Dentes"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, insira o número de dentes',
                      },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      placeholder="Número de Dentes"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="region"
                    label="Região"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, selecione a região',
                      },
                    ]}
                  >
                    <Select placeholder="Selecione a região">
                      <Option value={regionEnum.UpperRightMolar}>
                        Molar Superior Direito
                      </Option>
                      <Option value={regionEnum.UpperRightPremolar}>
                        Pré-Molar Superior Direito
                      </Option>
                      <Option value={regionEnum.UpperRightCanine}>
                        Canino Superior Direito
                      </Option>
                      <Option value={regionEnum.UpperRightIncisor}>
                        Incisivo Superior Direito
                      </Option>
                      <Option value={regionEnum.UpperLeftIncisor}>
                        Incisivo Superior Esquerdo
                      </Option>
                      <Option value={regionEnum.UpperLeftCanine}>
                        Canino Superior Esquerdo
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="value"
                    label="Valor"
                    rules={[
                      {
                        required: true,
                        message: 'Por favor, insira o valor do tratamento',
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      step={0.01}
                      placeholder="Valor do Tratamento"
                      style={{ width: '100%' }}
                      formatter={(value) => {
                        if (!value) return 'R$ 0,00'
                        const [integerPart, decimalPart] = value.split('.')
                        const formattedIntegerPart = integerPart.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          '.',
                        )
                        return `R$ ${formattedIntegerPart}${decimalPart ? ',' + decimalPart.padEnd(2, '0') : ',00'}`
                      }}
                      parser={(value) =>
                        value.replace(/R\$\s?|(\.)/g, '').replace(/,/, '.')
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="installmentDueDate"
                    label="Data de Vencimento da Parcela"
                    rules={[
                      {
                        required: true,
                        message:
                          'Por favor, selecione a data de vencimento da parcela',
                      },
                    ]}
                  >
                    <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="paid"
                    label="Pago"
                    rules={[
                      {
                        required: true,
                        message:
                          'Por favor, selecione se o tratamento foi pago',
                      },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="true">Pago</Radio>
                      <Radio value="false">Não Pago</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col
                  span={24}
                  style={{ textAlign: 'right', marginTop: '10px' }}
                >
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Adicionar Tratamento
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </ConfigProvider>
        </div>
      </S.LeftDiv>
      <S.RightDiv>
        <S.DivTitle>
          <h2>Histórico de Tratamento</h2>
        </S.DivTitle>
        <Listing
          data={tratamentosComKey}
          columns={columns}
          showSubMenu={false}
        />
      </S.RightDiv>
    </S.Container>
  )
}

export default TratamentosPaciente
