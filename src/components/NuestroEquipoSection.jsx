'use client';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Image from 'next/image';

const carouselImages = [
  '/2.png',
  '/3.png',
  '/4.png',
  '/6.png',
  '/1.png',
  '/9.png',
  '/10.png',
  '/8.png',
];

function NuestroEquipoSection() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Carousel automático (se pausa al hacer hover)
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Función para manejar el cambio manual de imágenes
  const goToImage = (index) => {
    setCurrent(index);
  };

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
            mb: 1,
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
            mb: 8,
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
                fontSize: { xs: 18, md: 20, xl: 30 },
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

          {/* Carrusel circular a la derecha */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              maxWidth: { xs: 300, sm: 400, md: 450 },
            }}
          >
            {/* Imagen circular principal */}
            <Box
              sx={{
                width: { xs: 220, sm: 280, md: 320, lg: 550 },
                height: { xs: 220, sm: 280, md: 320, lg: 550 },
                borderRadius: '50%',
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 8px 20px rgba(24, 20, 140, 0.3)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 12px 25px rgba(24, 20, 140, 0.4)',
                },
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <Image
                src={carouselImages[current]}
                alt={`Miembro del equipo ${current + 1}`}
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                quality={90}
                priority={current === 0}
                onError={(e) => {
                  e.target.src = '/team1.jpg';
                }}
              />
            </Box>

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