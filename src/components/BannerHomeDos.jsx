import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function BannerHomeDos() {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#fff3a7', // Amarillo de fondo
        py: 3,
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
          color: '#003366', // Azul oscuro para el texto
          fontSize: { xs: '1rem', md: '1.2rem' },
          textAlign: 'center', // Centra el texto dentro de su contenedor
        }}
      >
        Obtén tu Resolución Sanitaria de manera rápida y efectiva
      </Typography>

      {/* Botón a la derecha */}
      <Button
        variant="contained"
        href="/cotiza"
        sx={{
          bgcolor: '#003366', // Azul oscuro para el botón
          color: '#fff', // Texto blanco
          borderRadius: '24px',
          px: 3,
          py: 1,
          textTransform: 'uppercase',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
          '&:hover': {
            bgcolor: '#005299', // Un tono más claro al pasar el mouse
          },
        }}
      >
        Evaluación Inicial Gratis
      </Button>
    </Box>
  );
}

export default BannerHomeDos;