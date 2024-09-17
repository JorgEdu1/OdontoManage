import { useTransition } from '@react-spring/web'
import { Container } from './styles'

import PropTypes from 'prop-types'
import { Toast } from './Toast'

export function ToastContainer({ messages }) {
  const transitions = useTransition(messages, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 },
  })
  return (
    <Container>
      {transitions((style, item) => (
        <Toast key={item.id} style={style} message={item} />
      ))}
    </Container>
  )
}

ToastContainer.propTypes = {
  messages: PropTypes.array.isRequired,
}
