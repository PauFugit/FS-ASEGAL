'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CircularProgress, Box, Alert, AlertTitle } from '@mui/material';

export default function AuthGuard({ children, requiredRole = null }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (requiredRole && session?.user?.role !== requiredRole) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Alert severity="error">
          <AlertTitle>Acceso denegado</AlertTitle>
          No tienes permisos para acceder a esta sección.
        </Alert>
      </Box>
    );
  }

  return children;
}
