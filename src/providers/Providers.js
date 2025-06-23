// src/providers/Providers.js
'use client';

import { CssBaseline } from '@mui/material';
import CustomThemeProvider from './MuiThemeProvider';

export default function Providers({ children }) {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      {children}
    </CustomThemeProvider>
  );
}