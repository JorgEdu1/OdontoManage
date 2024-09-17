import React, { useState } from 'react'
import { Container } from './style'
import Listing from '../../shared/components/Listing'
import { PencilLine, Trash } from 'phosphor-react'
import { Modal, Form, Tooltip } from 'antd'
import AddPaciente from '../../shared/components/ModaisPaciente/AddPaciente'
import moment from 'moment'
import { usePatient } from '../../hooks/PacientContext'
import { useToast } from '../../hooks/toast'

const Patients = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)
  const { pacientes, deletePaciente, loading } = usePatient()
  const { addToast } = useToast()
  const [form] = Form.useForm()

  const handleEdit = (record) => {
    setSelectedPatient(record)
    setIsModalVisible(true)
    form.setFieldsValue({
      ...record,
      birthDate: record.birthday ? moment(record.birthday, 'YYYY-MM-DD') : null,
      patientForeigner: record.isForeign,
      cep: record.address?.zipCode,
      street: record.address?.street,
      neighborhood: record.address?.neighborhood,
      city: record.address?.city,
      state: record.address?.state,
    })
  }

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Confirmar Exclusão',
      content: 'Você tem certeza que deseja excluir este paciente?',
      okText: 'Sim',
      cancelText: 'Não',
      width: 400,
      style: {
        top: '40%',
      },
      onOk: async () => {
        const response = await deletePaciente(record.id)
        if (response.status === 200) {
          addToast({
            type: 'success',
            title: 'Paciente excluído com sucesso',
            descripton: 'O paciente foi excluído com sucesso',
          })
        } else {
          addToast({
            type: 'error',
            title: 'Erro ao excluir paciente',
            description:
              'Ocorreu um erro ao excluir o paciente, tente novamente mais',
          })
        }
      },
    })
  }

  const handleModalCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Documento',
      dataIndex: 'rg',
      key: 'rg',
    },
    {
      title: 'Telefone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Idade',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Endereço',
      dataIndex: 'address',
      key: 'address',
      render: (address) => (
        <p>{`${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`}</p>
      ),
    },
    {
      key: 'actions',
      render: (text, record) => (
        <div style={{ display: 'flex', gap: '10px' }}>
          <Tooltip title="Editar Paciente">
            <PencilLine
              onClick={() => handleEdit(record)}
              size={20}
              cursor="pointer"
            />
          </Tooltip>
          <Tooltip title="Deletar Paciente">
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

  const dataWithKeys = pacientes.map((paciente) => ({
    ...paciente,
    key: paciente.id,
  }))

  return (
    <Container>
      <Listing
        columns={columns}
        data={dataWithKeys}
        showSubMenu={true}
        loading={loading}
        title="Pacientes"
        object={0}
      />
      <AddPaciente
        visible={isModalVisible}
        onCancel={handleModalCancel}
        form={form}
        initialValues={selectedPatient}
      />
    </Container>
  )
}

export default Patients
