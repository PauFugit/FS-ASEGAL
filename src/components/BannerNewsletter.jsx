'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function BannerNewsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || loading) return;

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        setSnackbar({ open: true, message: '¡Gracias por suscribirte!', severity: 'success' });
        setEmail('');
      } else {
        setSnackbar({ open: true, message: data.error || 'No se pudo completar la suscripción.', severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: 'Error de conexión. Intenta nuevamente.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: '#F2AC57',
        py: 4,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          mb: 2,
          color: '#000000',
          fontSize: '1.25rem',
          textAlign: 'center',
        }}
      >
        ¡No te pierdas de ningún detalle!{' '}
        <Box component="span" sx={{ fontWeight: 500, fontStyle: 'italic' }}>
          Suscríbete a nuestro newsletter
        </Box>
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          gap: 2,
          width: { xs: '100%', sm: 'auto' },
          justifyContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <InputBase
          type="email"
          placeholder="TUCORREO@CORREO.CL"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
          sx={{
            bgcolor: '#fff',
            px: 2,
            py: 1,
            borderRadius: 2,
            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
            fontStyle: 'italic',
            fontSize: '1rem',
            width: 260,
            letterSpacing: 1,
          }}
          inputProps={{ 'aria-label': 'correo electrónico' }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: '#18148C',
            color: '#fff',
            borderRadius: 3,
            px: 4,
            fontWeight: 500,
            fontSize: '1rem',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)',
            textTransform: 'uppercase',
            letterSpacing: 1,
            '&:hover': {
              bgcolor: '#0F07D9',
            },
          }}
          disabled={!email || loading}
        >
          {loading ? 'Enviando...' : 'Suscribirse'}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BannerNewsletter;
