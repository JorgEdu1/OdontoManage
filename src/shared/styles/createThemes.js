import themeProvider from './themes'

export const createTheme = (theme) =>
  theme === 'light' ? themeProvider.light : themeProvider.dark
