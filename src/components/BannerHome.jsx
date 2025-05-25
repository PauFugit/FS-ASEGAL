import React from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';

const BannerHome = () => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: 420,
        background: 'url("/herosection.jpg") center/cover no-repeat, #e3f1fa',
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '0 0 8px 8px',
        border: '1px solid #e0e0e0',
        pb: { xs: 10, md: 0 }
      }}
    >
      {/* Texto principal */}
      <Box sx={{ px: { xs: 2, md: 8 }, pt: { xs: 4, md: 8 }, maxWidth: 700 }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: 32, md: 48 },
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: '#2d4c6a',
            lineHeight: 1.1
          }}
        >
          EMPRENDE<br />CON SEGURIDAD
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 2,
            color: '#4b6b8a',
            fontSize: { xs: 16, md: 20 }
          }}
        >
          Impulsamos tu negocio en base a los más altos estándares de calidad
        </Typography>

        {/* Botones principales */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4 }}>
          <Button
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

      {/* Burbuja grande (arriba derecha) */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 24, md: 24 },
          right: { xs: 32, md: 120 },
          width: { xs: 140, md: 230 },
          height: { xs: 140, md: 230 },
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid white',
          boxShadow: '0 2px 12px #0001',
          zIndex: 2,
          background: '#fff'
        }}
      >
        <img
          src="/burbujauno.jpg"
          alt="Banner 1"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      {/* Burbuja mediana (abajo derecha, sobresaliendo) */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: -40, md: -60 },
          right: { xs: 60, md: 160 },
          width: { xs: 110, md: 170 },
          height: { xs: 110, md: 170 },
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid white',
          boxShadow: '0 2px 12px #0001',
          zIndex: 3,
          background: '#fff'
        }}
      >
        <img
          src="/burbujatres.jpg"
          alt="Banner 3"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>
      {/* Burbuja pequeña (arriba derecha, sobrepuesta a la grande) */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: 48, md: 40 },
          right: { xs: -10, md: 30 },
          width: { xs: 90, md: 130 },
          height: { xs: 90, md: 130 },
          borderRadius: '50%',
          overflow: 'hidden',
          border: '4px solid white',
          boxShadow: '0 2px 8px #0001',
          zIndex: 4,
          background: '#fff'
        }}
      >
        <img
          src="/burbujados.jpg"
          alt="Banner 2"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Franja inferior con botones y texto */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          background: '#FFE88A',
          minHeight: 56,
          display: 'flex',
          alignItems: 'center',
          px: { xs: 2, md: 8 },
          py: 1,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
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
          Contáctanos ahora
        </Button>
      </Box>
    </Box>
  );
};

export default BannerHome;