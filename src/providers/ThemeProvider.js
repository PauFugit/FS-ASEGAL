
'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import theme from './theme';

export default function ThemeProvider({ children }) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}