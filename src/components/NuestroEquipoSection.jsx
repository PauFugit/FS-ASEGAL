'use client';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const carouselImages = [
  '/contacto.jpeg',
  '/contacto2.jpeg',
  '/caro1.jpeg',
  '/caro2.jpeg'
];

function NuestroEquipoSection() {
  const [current, setCurrent] = useState(0);

  // Carousel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Fade in timeout={1200}>
      <Box
        sx={{
          py: { xs: 6, md: 10 },
          px: { xs: 2, md: 8 },
          bgcolor: '#f5fafd',
          width: '100%',
        }}
      >
        {/* Título */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 400,
            color: '#18148C',
            mb: 6,
            textAlign: 'flex-start',
            letterSpacing: 2,
            fontSize: { xs: 28, md: 36, xl: 50 },
            textTransform: 'uppercase',
            textShadow: '1px 2px 4px #0D5B8C',
          }}
        >
          NUESTRO EQUIPO
        </Typography>

        {/* Texto + Carrusel */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 4, md: 8 },
            mb: 5,
            width: '100%',
          }}
        >
          {/* Texto a la izquierda */}
          <Box
            sx={{
              flex: 1,
              minWidth: 260,
              maxWidth: 1000,
              textAlign: { xs: 'center', md: 'left' },
              mx: 'auto',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: '#18148C',
                fontSize: { xs: 18, md: 20, xl: 25 },
                mb: 2,
                fontWeight: 400,
                lineHeight: 1.7,
                px: { xs: 0, md: 2 }
              }}
            >
              Somos <b>Carolina Fernández</b> y <b>Carolina Berthelon</b>, ingenieras en alimentos y fundadoras de <b>Asegal B&F</b>.
              Acompañamos a empresas del sector alimentario en su crecimiento, ofreciendo asesoría personalizada y experta en calidad, inocuidad y cumplimiento normativo. Nuestro compromiso es ayudarte a desarrollar productos seguros, confiables y alineados con los más altos estándares del mercado.
            </Typography>
          </Box>

          {/* Carrusel a la derecha */}
          <Box
            sx={{
              flex: 1,
              width: { xs: '100%', sm: 340, md: 400, xl: 500 },
              height: { xs: 220, sm: 260, md: 320, xl: 500 },
              position: 'relative',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 2,
              mx: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#fff',
            }}
          >
            <Box
              component="img"
              src={carouselImages[current]}
              alt="Equipo Asegal"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 4,
                transition: 'opacity 0.7s',
                position: 'relative',
                display: 'block', 
              }}
              onError={e => { e.target.src = '/team1.jpg'; }}
            />
          </Box>
        </Box>

        {/* Botón abajo centrado */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button
            href="/nosotras"
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              bgcolor: '#18148C',
              color: '#fff',
              borderRadius: 20,
              px: 5,
              py: 2,
              fontWeight: 600,
              fontSize: 18,
              textTransform: 'none',
              boxShadow: '0 2px 8px #0B5B8C',
              '&:hover': {
                bgcolor: '#ffffff',
                color: '#F2AC57',
                border: '2px solid #F2AC57',
              },
            }}
          >
            Saber más
          </Button>
        </Box>
      </Box>
    </Fade>
  );
}

export default NuestroEquipoSection;