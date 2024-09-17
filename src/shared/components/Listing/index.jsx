import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Input, Form, Skeleton } from 'antd'
import * as S from './style'
import AddPaciente from '../ModaisPaciente/AddPaciente'
import AddEstoque from '../ModaisEstoque/AddEstoque'
import AddReceita from '../ModaisReceita/AddReceita'
import AddDespesa from '../ModaisDespesa/AddDespesa'

const { Search } = Input

const Listing = ({
  columns,
  data,
  onSearch,
  showSubMenu,
  object,
  loading,
  title,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm()
  const updatedColumns = columns.map((column) => {
    if (column.dataIndex === 'name') {
      return {
        ...column,
        render: (text, record) => (
          <S.StyledLink to={`/patients/${record.key}`}>{text}</S.StyledLink>
        ),
      }
    }
    return column
  })

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleModal = () => {
    if (object === 0) {
      return (
        <AddPaciente
          visible={isModalVisible}
          onCancel={handleCancel}
          form={form}
        />
      )
    } else if (object === 1) {
      return (
        <AddEstoque
          visible={isModalVisible}
          onCancel={handleCancel}
          form={form}
        />
      )
    } else if (object === 2) {
      return (
        <AddReceita
          visible={isModalVisible}
          onCancel={handleCancel}
          form={form}
        />
      )
    } else if (object === 3) {
      return (
        <AddDespesa
          visible={isModalVisible}
          onCancel={handleCancel}
          form={form}
        />
      )
    }
  }

  const objects = [
    {
      name: 'patients',
      title: 'Pacientes',
      singular: 'Novo Paciente',
    },
    {
      name: 'stock',
      title: 'Estoque',
      singular: 'Novo Produto',
    },
    {
      name: 'financial',
      title: 'Financeiro',
      singular: '+ ADICIONAR',
    },
    {
      name: 'financial',
      title: 'Financeiro',
      singular: '+ ADICIONAR',
    },
  ]

  return (
    <S.Container>
      {showSubMenu && (
        <S.SubMenu>
          <h2>{title}</h2>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Search
              placeholder={`Buscar em ${title}`}
              onSearch={onSearch}
              style={{ width: 300 }}
            />
          </div>
          <S.CustomButton onClick={showModal}>
            {`${objects[object].singular}`}
          </S.CustomButton>
        </S.SubMenu>
      )}
      {loading ? (
        <S.SkeletonContainer>
          <Skeleton active />
          <Skeleton active />
        </S.SkeletonContainer>
      ) : (
        <S.StyledTable
          columns={updatedColumns}
          expandable={{
            expandedRowRender: (record) => <p>{record.description}</p>,
            rowExpandable: (record) => record.name !== 'Not Expandable',
          }}
          dataSource={data}
          pagination={{
            pageSize: 10,
          }}
        />
      )}
      {handleModal()}
    </S.Container>
  )
}

Listing.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearch: PropTypes.func,
  onAddNew: PropTypes.func,
  showSubMenu: PropTypes.bool,
  loading: PropTypes.bool,
  title: PropTypes.string,
}

export default Listing
