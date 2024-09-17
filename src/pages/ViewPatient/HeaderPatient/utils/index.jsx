const menuItems = [
  { key: 'sobre', label: 'Sobre', route: (id) => `/patients/${id}/sobre` },
  {
    key: 'tratamentos',
    label: 'Tratamentos',
    route: (id) => `/patients/${id}/tratamentos`,
  },
  {
    key: 'debitos',
    label: 'Débitos',
    route: (id) => `/patients/${id}/debitos`,
  },
]
export default menuItems
