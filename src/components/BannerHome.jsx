import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';

const BannerHome = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 420,
        background: 'linear-gradient(rgba(227, 241, 250, 0.7), rgba(227, 241, 250, 0.7)), url("/herosection.jpg") center/cover no-repeat',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0 0 8px 8px',
        border: '1px solid #e0e0e0',
        pb: { xs: 10, md: 0 }
      }}
    >
      {/* Contenido principal (izquierda) */}
      <Box sx={{ 
        px: { xs: 2, md: 8 }, 
        pt: { xs: 4, md: 8 }, 
        maxWidth: 700,
        position: 'relative',
        zIndex: 5
      }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: 32, md: 48 },
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: '#2d4c6a',
            lineHeight: 1.1,
            mb: 2
          }}
        >
          EMPRENDE<br />CON SEGURIDAD
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: '#4b6b8a',
            fontSize: { xs: 16, md: 20 },
            mb: 3
          }}
        >
          Impulsamos tu negocio en base a los más altos estándares de calidad
        </Typography>

        {/* Botones */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
          <Button
            href="/nosotras"
            variant="contained"
            sx={{
              backgroundColor: '#43B97F',
              color: 'white',
              borderRadius: '24px',
              textTransform: 'none',
              fontWeight: 500,
              px: 4,
              py: 1.2,
              fontSize: 18,
              boxShadow: '0px 2px 4px 0px #0000001A',
              '&:hover': {
                backgroundColor: '#36a06b'
              }
            }}
          >
            Conoce más
          </Button>
          <Button
            href="/servicios"
            variant="outlined"
            sx={{
              border: '2px solid #FFD600',
              backgroundColor: 'white',
              color: '#2d4c6a',
              borderRadius: '24px',
              textTransform: 'none',
              fontWeight: 500,
              px: 4,
              py: 1.2,
              fontSize: 18,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#FFFDE7',
                borderColor: '#FFD600'
              }
            }}
          >
            Descubre nuestros servicios
          </Button>
        </Stack>
      </Box>

      {/* Burbujas (derecha) */}
      {/* 1. Burbuja grande (centro-derecha) */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '30%', md: '25%' },
          right: { xs: '5%', md: '8%' },
          width: { xs: 140, md: 220 },
          height: { xs: 140, md: 220 },
          borderRadius: '50%',
          border: '4px solid white',
          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          zIndex: 2,
          overflow: 'hidden'
        }}
      >
        <img
          src="/burbujauno.jpg"
          alt="Imagen circular 1"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* 2. Burbuja mediana (superior derecha, superpuesta) */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '10%', md: '10%' },
          right: { xs: '15%', md: '18%' },
          width: { xs: 100, md: 160 },
          height: { xs: 100, md: 160 },
          borderRadius: '50%',
          border: '4px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 3,
          overflow: 'hidden'
        }}
      >
        <img
          src="/burbujados.jpg"
          alt="Imagen circular 2"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* 3. Burbuja pequeña (inferior derecha) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: '15%', md: '20%' },
          right: { xs: '8%', md: '12%' },
          width: { xs: 80, md: 130 },
          height: { xs: 80, md: 130 },
          borderRadius: '50%',
          border: '4px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 1,
          overflow: 'hidden'
        }}
      >
        <img
          src="/burbujatres.jpg"
          alt="Imagen circular 3"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Franja inferior */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#FFE88A',
          minHeight: 56,
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, md: 8 },
          py: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1,
          borderTop: '1px solid #ffe066',
          zIndex: 10
        }}
      >
        <Typography
          sx={{
            color: '#A68A00',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 16,
            mr: 1
          }}
        >
          ¿Estás listo para empezar?
        </Typography>
        <Typography
          sx={{
            color: '#4b6b8a',
            fontSize: 16,
            mr: 2
          }}
        >
          ¡Estamos aquí para ayudarte!
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Button
          href="/contacto"
          variant="contained"
          sx={{
            backgroundColor: '#D28251',
            color: 'white',
            borderRadius: '24px',
            textTransform: 'none',
            fontWeight: 500,
            px: 4,
            py: 1.2,
            fontSize: 18,
            boxShadow: '0px 2px 4px 0px #0000001A',
            '&:hover': {
              backgroundColor: '#36a06b'
            }
          }}
        >
          Contáctanos ahora
        </Button>
      </Box>
    </Box>
  );
};

export default BannerHome;