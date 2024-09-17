import styled, { createGlobalStyle } from 'styled-components'

import '../../../node_modules/@syncfusion/ej2-base/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-buttons/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-calendars/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-inputs/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-lists/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-navigations/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-popups/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css'
import '../../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css'

const defaultStyleGlobal = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Manrope', sans-serif;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
  }

  input {
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`

export const ContainerGlobal = styled.div`
  background-color: ${({ theme }) => theme.Colors.SURFACE};
  min-height: 100vh;
  overflow: hidden;

  position: relative;
`

export default defaultStyleGlobal
