import React from 'react';
import { Box, Button, Typography } from '@mui/material';

function BannerHomeUno() {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#18148C',
        display: 'flex',
        alignItems: 'center',
        py: { xs: 2, md: 4 },
        px: 0,
        overflow: 'hidden',
      }}
    >
      {/* Línea izquierda - Oculto en móvil */}
      <Box sx={{ 
        flex: 1, 
        height: 2, 
        bgcolor: '#ffffff', 
        mx: 1,
        display: { xs: 'none', md: 'block' } 
      }} />

      {/* Texto */}
      <Typography
        sx={{
          color: '#ffffff',
          fontSize: { xs: 14, sm: 18, md: 22 },
          letterSpacing: { xs: '0.1em', md: '0.2em' },
          fontWeight: 400,
          mx: { xs: 1, md: 2 },
          whiteSpace: 'nowrap',
          textAlign: 'center',
          flexShrink: 0
        }}
      >
        Déjalo en nuestras manos
      </Typography>

      {/* Línea central corta - Oculto en móvil */}
      <Box sx={{ 
        flex: 1, 
        height: 2, 
        bgcolor: '#ffffff', 
        mx: 1, 
        maxWidth: 40,
        display: { xs: 'none', md: 'block' } 
      }} />

      {/* Botón */}
      <Button
        variant="contained"
        href="/servicios"
        sx={{
          bgcolor: '#1A1773',
          color: '#fff',
          fontWeight: 600,
          fontSize: { xs: 12, sm: 14, md: 18 },
          borderRadius: 16,
          px: { xs: 2, md: 4 },
          py: 0.5,
          boxShadow: '0px 4px 8px #aee9b6',
          mx: { xs: 1, md: 2 },
          whiteSpace: { xs: 'normal', sm: 'nowrap' },
          textAlign: 'center',
          '&:hover': {
            bgcolor: '#F2AC57',
          },
        }}
      >
        CONSULTA NUESTROS SERVICIOS
      </Button>

      {/* Línea derecha - Oculto en móvil */}
      <Box sx={{ 
        flex: 1, 
        height: 2, 
        bgcolor: '#ffffff', 
        mx: 1,
        display: { xs: 'none', md: 'block' } 
      }} />
    </Box>
  );
}

export default BannerHomeUno;