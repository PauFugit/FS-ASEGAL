'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient'; // ← Cliente del navegador
import { CircularProgress, Box, Alert, AlertTitle } from '@mui/material';

export default function AuthGuard({ children, requiredRole = null }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error || !session) {
          router.push('/login');
          return;
        }

        // Si se requiere un rol específico, verificar con API
        if (requiredRole) {
          const res = await fetch('/api/auth/check-role', {
            headers: {
              'Authorization': `Bearer ${session.access_token}`
            }
          });
          
          if (res.ok) {
            setAuthorized(true);
          } else {
            setAuthorized(false);
          }
        } else {
          setAuthorized(true);
        }

      } catch (error) {
        console.error('Error checking auth:', error);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [router, requiredRole]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!authorized && requiredRole) {
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