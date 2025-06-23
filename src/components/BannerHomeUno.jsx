// BannerHomeUno.jsx
import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function BannerHomeUno() {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        py: 4,
        px: 0,
      }}
    >
      {/* Línea izquierda */}
      <Box sx={{ flex: 1, height: 2, bgcolor: '#1A1773', mx: 1 }} />

      {/* Texto */}
      <Typography
        sx={{
          color: '#1A1773',
          fontSize: 22,
          letterSpacing: '0.2em',
          fontWeight: 400,
          mx: 2,
          whiteSpace: 'nowrap',
        }}
      >
        Déjalo en nuestras manos
      </Typography>

      {/* Línea central corta */}
      <Box sx={{ flex: 1, height: 2, bgcolor: '#1A1773', mx: 1, maxWidth: 40 }} />

      {/* Botón */}
      <Button
        variant="contained"
        href="/servicios"
        sx={{
          bgcolor: '#1A1773',
          color: '#fff',
          fontWeight: 600,
          fontSize: 18,
          borderRadius: 16,
          px: 4,
          py: 0.5,
          boxShadow: '0px 4px 8px #aee9b6',
          mx: 2,
          '&:hover': {
            bgcolor: '#9FBA47',
          },
        }}
      >
        CONSULTA NUESTROS SERVICIOS
      </Button>

      {/* Línea derecha */}
      <Box sx={{ flex: 1, height: 2, bgcolor: '#1A1773', mx: 1 }} />
    </Box>
  );
}

export default BannerHomeUno;