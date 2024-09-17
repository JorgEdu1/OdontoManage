import { Container } from './styles'
import PropTypes from 'prop-types'
import { Bell, CheckCircle, WarningCircle, X, XCircle } from 'phosphor-react'
import { useEffect } from 'react'
import { useToast } from '../../../../hooks/toast'

const icons = {
  notification: <Bell size={40} />,
  error: <XCircle size={40} />,
  success: <CheckCircle size={40} />,
  warning: <WarningCircle size={40} />,
}

export function Toast({ message, style }) {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, message.id])

  return (
    <Container
      type={message.type}
      $hasDescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {!!message.description && <p>{message.description}</p>}
      </div>
      <button onClick={() => removeToast(message.id)} type="button">
        <X weight="light" />
      </button>
      <span></span>
    </Container>
  )
}

Toast.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['notification', 'error', 'success', 'attention'])
      .isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  style: PropTypes.object,
}
