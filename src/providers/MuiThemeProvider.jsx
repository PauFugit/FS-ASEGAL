'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from '../app/theme';

export default function CustomThemeProvider({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}