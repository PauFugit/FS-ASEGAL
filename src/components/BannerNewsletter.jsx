'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';

function BannerNewsletter() {
  const [email, setEmail] = useState('');

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
        onSubmit={e => {
          e.preventDefault();
          // Aquí manejar el submit
        }}
      >
        <InputBase
          placeholder="TUCORREO@CORREO.CL"
          value={email}
          onChange={e => setEmail(e.target.value)}
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
          disabled={!email}
        >
          SUSCRIBIRSE
        </Button>
      </Box>
    </Box>
  );
}

export default BannerNewsletter;