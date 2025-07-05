'use client'; // Necesario para Next.js 13+

import React from 'react';
import { Box, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';

// Animación de brillo para el texto
const textGlow = keyframes`
  0% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
  50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.9); }
  100% { text-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
`;

// Animación de entrada del texto
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function HeroBanner() {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '40vh',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url(/xqasegal1.jpg)', // Reemplaza con tu imagen
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Overlay oscuro para mejor legibilidad
        }
      }}
    >
      {/* Texto principal con animaciones */}
      <Typography
        variant="h1"
        sx={{
          position: 'relative',
          color: '#ffffff',
          fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
          fontWeight: 'bold',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          animation: `${fadeIn} 1.5s ease-out, ${textGlow} 3s ease-in-out infinite`,
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          px: 2,
        }}
      >
        ASEGAL B&amp;F
      </Typography>
    </Box>
  );
}