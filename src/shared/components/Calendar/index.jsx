import { useState } from 'react'
import * as S from './styles'
import 'moment/locale/pt-br'
import {
  Button,
  ConfigProvider,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space,
  TimePicker,
} from 'antd'
import { ptBR } from 'date-fns/locale'
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react'
import { addDays, addWeeks, format, startOfWeek } from 'date-fns'
import dayjs from 'dayjs'

const locale = {
  locale: 'pt_BR',
  format: 'dd/MM/yyyy',
}

const Calendario = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedHour, setSelectedHour] = useState(null)
  const [selectedFinalHour, setSelectedFinalHour] = useState(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  // const [consultationData, setConsultationData] = useState(
  //   initialConsultationData,
  // )
  const [consultationData, setConsultationData] = useState([])

  const [form] = Form.useForm()

  const daysOfWeek = Array.from({ length: 5 }, (_, i) =>
    format(
      addDays(startOfWeek(currentWeek, { weekStartsOn: 0 }), i + 1),
      'eeee, dd/MM',
      { locale: ptBR },
    ),
  )

  const hours = [
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ]

  // Função para avançar uma semana
  const handleNextWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, 1))
  }

  // Função para voltar uma semana
  const handlePrevWeek = () => {
    setCurrentWeek((prev) => addWeeks(prev, -1))
  }

  const handleCurrentWeek = () => {
    setCurrentWeek(new Date())
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
  }

  const handleOpenModal = (day, hour) => {
    const dateString = day.split(', ')[1]
    const fullDate = `2024-${dateString.split('/')[1]}-${dateString.split('/')[0]}` // Formato YYYY-MM-DD
    const selectedDate = dayjs(fullDate)
    const updatedHour = dayjs(hour, 'HH:mm').add(1, 'hour')

    setSelectedDay(selectedDate)
    setSelectedFinalHour(updatedHour.format('HH:mm'))
    setSelectedHour(hour)

    setIsModalVisible(true)
  }

  // const handleModalOk = () => {
  //   form.validateFields().then((values) => {
  //     const newConsultationData = {
  //       ...consultationData,
  //       patientName: values.patientName,
  //       dentistId: values.dentistId,
  //       notes: values.notes,
  //       consultationType: values.consultationType,
  //       returnIn: values.returnIn,
  //       date: selectedDay.format('YYYY-MM-DD'),
  //       startTime: selectedHour,
  //       endTime: selectedFinalHour,
  //     }

  //     setConsultationData(newConsultationData)
  //     console.log('Dados da consulta:', newConsultationData)

  //     setConsultationData(initialConsultationData)
  //     form.resetFields() // Limpa os campos do formulário

  //     setIsModalVisible(false)
  //   })
  // }

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const newConsultationData = {
        patientName: values.patientName,
        dentistId: values.dentistId,
        notes: values.notes,
        consultationType: values.consultationType,
        returnIn: values.returnIn,
        date: selectedDay.format('YYYY-MM-DD'),
        startTime: selectedHour,
        endTime: selectedFinalHour,
      }

      // Adiciona a nova consulta ao estado
      setConsultationData((prev) => [...prev, newConsultationData])

      console.log('Dados da consulta:', newConsultationData)

      // Limpa os campos do formulário
      form.resetFields()
      setIsModalVisible(false)
    })
  }

  return (
    <>
      <S.Container>
        <S.Header>
          <Button
            onClick={handlePrevWeek}
            shape="circle"
            icon={<ArrowLeft />}
          />

          <h2>
            Consultas - Semana de {format(currentWeek, 'dd/MM/yyyy')} -{' '}
            {format(addDays(currentWeek, 4), 'dd/MM/yyyy')}
          </h2>

          <Button
            onClick={handleNextWeek}
            shape="circle"
            icon={<ArrowRight />}
          />
        </S.Header>
        <S.Body>
          <S.Table>
            <thead>
              <S.HeaderRow>
                <S.HeaderCell>
                  <Button size="small" block onClick={handleCurrentWeek}>
                    Semana atual
                  </Button>
                </S.HeaderCell>
                {daysOfWeek.map((day) => (
                  <S.HeaderCell key={day}>{day}</S.HeaderCell>
                ))}
              </S.HeaderRow>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <S.BodyRow key={hour}>
                  <S.HourCell>{hour}</S.HourCell>
                  {daysOfWeek.map((day) => {
                    // Verifica se existe uma consulta para essa data e hora
                    const consultation = consultationData.find(
                      (consultation) =>
                        consultation.date ===
                          selectedDay.format('YYYY-MM-DD') &&
                        consultation.startTime === hour,
                    )
                    return (
                      <S.BodyCell
                        key={`${day}-${hour}`}
                        onClick={() => handleOpenModal(day, hour)}
                      >
                        {consultation
                          ? `Consulta: ${consultation.patientName}`
                          : ''}
                      </S.BodyCell>
                    )
                  })}
                </S.BodyRow>
              ))}
            </tbody>
          </S.Table>
        </S.Body>
      </S.Container>

      <ConfigProvider locale={locale}>
        <Modal
          open={isModalVisible}
          onCancel={handleModalCancel}
          onOk={handleModalOk}
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Paciente"
              name="patientName"
              rules={[
                {
                  required: true,
                  message: 'Por favor, insira o nome do paciente!',
                },
              ]}
            >
              <Input placeholder="Nome do Paciente" />
            </Form.Item>
            <Form.Item
              label="Dentista"
              name="dentistId"
              rules={[
                {
                  required: true,
                  message: 'Por favor, selecione um dentista!',
                },
              ]}
            >
              <Select placeholder="Dentista responsável">
                <Select.Option value="1">Dr. José</Select.Option>
                <Select.Option value="2">Dra. Maria</Select.Option>
                <Select.Option value="3">Dr. João</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Data e hora da consulta">
              <Space>
                <DatePicker
                  placeholder="Selecione a data"
                  format="DD/MM/YYYY"
                  value={selectedDay}
                  disabled
                  onChange={(date) => {
                    setSelectedDay(date)
                    setConsultationData((prev) => ({
                      ...prev,
                      date: date ? date.format('YYYY-MM-DD') : null, // Armazena a data no formato desejado
                    }))
                  }}
                />
                <TimePicker
                  placeholder="Hora de entrada"
                  format="HH:mm"
                  disabled
                  value={dayjs(selectedHour, 'HH:mm')}
                  onChange={(time) => {
                    setSelectedHour(time.format('HH:mm'))
                    setConsultationData((prev) => ({
                      ...prev,
                      startTime: time ? time.format('HH:mm') : null, // Armazena a hora de entrada
                    }))
                  }}
                />
                <TimePicker
                  placeholder="Hora de saída"
                  format="HH:mm"
                  disabled
                  value={dayjs(selectedFinalHour, 'HH:mm')}
                  onChange={(time) => {
                    setSelectedFinalHour(time.format('HH:mm'))
                    setConsultationData((prev) => ({
                      ...prev,
                      endTime: time ? time.format('HH:mm') : null, // Armazena a hora de saída
                    }))
                  }}
                />
              </Space>
            </Form.Item>
            <Form.Item label="Observações" name="notes">
              <Input.TextArea placeholder="Observações sobre a consulta" />
            </Form.Item>
            <Form.Item
              label="Tipo de consulta"
              name="consultationType"
              rules={[
                {
                  required: true,
                  message: 'Por favor, selecione o tipo de consulta!',
                },
              ]}
            >
              <Select placeholder="Tipo de consulta">
                <Select.Option value="1">Consulta de rotina</Select.Option>
                <Select.Option value="2">Consulta de urgência</Select.Option>
                <Select.Option value="3">Consulta de emergência</Select.Option>
                <Select.Option value="4">Consulta de avaliação</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Retornar em"
              name="returnIn"
              rules={[
                {
                  required: true,
                  message: 'Por favor, selecione quando retornar!',
                },
              ]}
            >
              <Select placeholder="Tipo de consulta">
                <Select.Option value="1">1 mês</Select.Option>
                <Select.Option value="2">2 meses</Select.Option>
                <Select.Option value="3">3 meses</Select.Option>
                <Select.Option value="4">6 meses</Select.Option>
                <Select.Option value="5">12 meses</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>
    </>
  )
}

export default Calendario
