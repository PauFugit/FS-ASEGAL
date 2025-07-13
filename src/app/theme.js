// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A1773',
      light: '#3A3791',
      dark: '#18148C',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#9FBA47',
      light: '#B8D06D',
      dark: '#86A330',
      contrastText: '#000000',
    },
    info: {
      main: '#82C6E8',
      light: '#A0D4ED',
      dark: '#5CA8D0',
      contrastText: '#000000',
    },
    warning: {
      main: '#D28551',
      light: '#E0A178',
      dark: '#B56B38',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#1A1773',
    },
    // Puedes agregar más configuraciones de tipografía aquí
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024, // Desktop desde 1024px
      lg: 1300, // Desktop grande desde 1300px
      xl: 1536,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '8px 16px',
        },
      },
    },
  },
});

export default theme;