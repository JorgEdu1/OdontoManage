import { ChartBar, CalendarPlus, User, Stack } from 'phosphor-react'

const MenuKeys = [
  { id: 5, name: 'Pacientes', icon: <User size={20} />, path: '/patients' },
  {
    id: 2,
    name: 'Consultas',
    icon: <CalendarPlus size={20} />,
    path: '/consultation',
  },
  {
    id: 3,
    name: 'Financeiro',
    icon: <ChartBar size={20} />,
    path: '/financial',
  },
  {
    id: 6,
    name: 'Estoque',
    icon: <Stack size={20} />,
    path: '/stock',
  },
]

export default MenuKeys
