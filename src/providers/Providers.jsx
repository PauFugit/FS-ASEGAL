// src/providers/Providers.js
'use client';

import { CssBaseline } from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import CustomThemeProvider from './MuiThemeProvider';

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <CustomThemeProvider>
        <CssBaseline />
        {children}
      </CustomThemeProvider>
    </SessionProvider>
  );
}