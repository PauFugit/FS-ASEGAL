'use client'

import React from 'react';
import Box from '@mui/material/Box';
import CotizaForm from './CotizaForm';

const CotizaSection = () => {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#18148C',
        py: { xs: 4, md: 6 },
        px: { xs: 1, sm: 3, md: 6 },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
          width: '100%',
          maxWidth: 1100,
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Imagen a la izquierda */}
        <Box
          sx={{
            flex: 1,
            minWidth: { xs: '100%', md: 350 },
            maxWidth: { md: 420 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: { xs: 2, md: 0 },
          }}
        >
          <Box
            component="img"
            src="/bannerplus1.jpg"
            alt="Cotiza"
            sx={{
              width: 500,
              height: { xs: 220, sm: 280, md: 500 },
              maxWidth: 420,
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            }}
          />
        </Box>
        {/* Formulario a la derecha */}
        <Box
          sx={{
            flex: 1.2,
            minWidth: { xs: '100%', md: 500 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CotizaForm />
        </Box>
      </Box>
    </Box>
  );
};

export default CotizaSection;