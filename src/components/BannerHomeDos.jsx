import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function BannerHomeDos() {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#e6f6fd', 
        py: 4,
        display: 'flex',
        justifyContent: 'center', // Centra horizontalmente
        alignItems: 'center', // Centra verticalmente
        gap: 4, // Espacio entre los elementos
        px: { xs: 2, md: 4 }, 
      }}
    >
      {/* Texto a la izquierda */}
      <Typography
        variant="body1"
        sx={{
          color: '#18148C', // Azul oscuro para el texto
          fontSize: { xs: '1rem', md: '1.2rem', xl: 22 },
          textAlign: 'center', 
        }}
      >
        Obtén tu Resolución Sanitaria de manera rápida y efectiva
      </Typography>

      {/* Botón a la derecha */}
      <Button
        variant="contained"
        href="/cotiza"
        sx={{
          bgcolor: '#18148C', 
          color: '#fff', 
          borderRadius: '24px',
          fontSize: { xs: '1rem', md: '1.2rem',xl:18 },
          px: 3,
          py: 1,
          textTransform: 'uppercase',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          '&:hover': {
            bgcolor: '#ffffff', 
            color: '#F2AC57',
            borderBottom: '2px solid #F2AC57'
          },
        }}
      >
        Evaluación Inicial Gratis
      </Button>
    </Box>
  );
}

export default BannerHomeDos;