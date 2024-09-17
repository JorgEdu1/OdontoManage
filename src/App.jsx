import { Router } from './routes'
import { ThemeProvider } from 'styled-components'
import GlobalStyle, { ContainerGlobal } from './shared/styles/global'
import { BrowserRouter } from 'react-router-dom'
import { createTheme } from './shared/styles/createThemes.js'
import { ToastProvider } from './hooks/toast.jsx'
import { PatientProvider } from './hooks/PacientContext'
import { StockProvider } from './hooks/StockContext'

function App() {
  return (
    <>
      <ThemeProvider theme={createTheme('light')}>
        <ToastProvider>
          <ContainerGlobal>
            <BrowserRouter>
              <PatientProvider>
                <StockProvider>
                  <Router />
                </StockProvider>
              </PatientProvider>
            </BrowserRouter>
            <GlobalStyle />
          </ContainerGlobal>
        </ToastProvider>
      </ThemeProvider>
    </>
  )
}

export default App
