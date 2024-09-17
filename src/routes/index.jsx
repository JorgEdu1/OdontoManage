import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Consultation from '../pages/Consultation'
import Financial from '../pages/Financial'
import Stock from '../pages/Stock'
import Patients from '../pages/Patients'
import PageBase from './PageBase'
import Login from '../pages/Login'
import ViewPatient from '../pages/ViewPatient'

import DebitosPaciente from '../pages/ViewPatient/HeaderPatient/Pages/Débitos'
import InfoPaciente from '../pages/ViewPatient/HeaderPatient/Pages/Sobre'
import TratamentosPaciente from '../pages/ViewPatient/HeaderPatient/Pages/Tratamentos'
import LocalStorage from '../utils/LocalStorage'

export const Router = () => {
  const isLogged = LocalStorage.getValue('token')

  return (
    <Routes>
      {isLogged ? (
        <Route path="/" element={<PageBase />}>
          <Route path="/" element={<Navigate to="/patients" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/about" element={<About />} />
          <Route path="/consultation" element={<Consultation />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/patients/:id" element={<ViewPatient />}>
            <Route path="" element={<Navigate to="sobre" />} />{' '}
            <Route path="debitos" element={<DebitosPaciente />} />
            <Route path="sobre" element={<InfoPaciente />} />
            <Route path="tratamentos" element={<TratamentosPaciente />} />
          </Route>
        </Route>
      ) : (
        <Route path="/*" element={<Navigate to="/login" />} />
      )}
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
