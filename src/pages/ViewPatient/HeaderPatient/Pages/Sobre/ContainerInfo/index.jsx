import React from 'react'
import PropTypes from 'prop-types'
import * as S from './style'

const ContainerInfo = ({ title, infoList }) => {
  return (
    <S.DivAbout>
      <S.DivTitle>
        <h2>{title}</h2>
      </S.DivTitle>
      <S.DivContent>
        <S.DivText>
          {infoList.map((info, index) => (
            <S.Info key={index}>
              <div>{info.label}:</div>
              <span>{info.value}</span>
            </S.Info>
          ))}
        </S.DivText>
      </S.DivContent>
    </S.DivAbout>
  )
}

ContainerInfo.propTypes = {
  title: PropTypes.string.isRequired,
  infoList: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ).isRequired,
}

export default ContainerInfo
