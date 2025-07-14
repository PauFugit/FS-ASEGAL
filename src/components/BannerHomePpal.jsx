import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import Image from 'next/image';

const BannerHomePpal = () => {
  // Imágenes para los círculos
  const circleImages = [
    '/burbujatres.jpg',
    '/burbujados.jpg',
    '/burbujauno.jpg'
  ];

  // Imagen de fondo
  const backgroundImage = '/herosection.jpg';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        padding: { xs: '2rem 1rem', md: '3rem' },
        borderRadius: '8px',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 'auto', md: '500px' },
        color: '#fff',
        backgroundColor: '#f5f5f5', // Fondo de respaldo
      }}
    >
      {/* Fondo con imagen y opacidad */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.5)', // Capa blanca con 50% de opacidad
          }
        }}
      >
        <Image
          src={backgroundImage}
          alt="Fondo"
          fill
          style={{ 
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          quality={80}
          priority
        />
      </Box>

      {/* Contenido principal */}
      <Box
        sx={{
          flex: 1,
          zIndex: 1,
          padding: { xs: '2rem 0', md: '0 2rem' },
          textAlign: { xs: 'center', md: 'left' },
          width: { xs: '100%', md: '60%' },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'normal',
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem' },
            marginBottom: '1rem',
            color: '#18148C',
            textShadow: '1px 1px 2px rgba(255,255,255,0.8)',
            lineHeight: 1.2,
            letterSpacing: '0.3em',
          }}
        >
          EMPRENDE
          <br />
          CON SEGURIDAD
        </Typography>
        
        <Typography
          variant="h5"
          component="p"
          sx={{
            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
            marginBottom: '2rem',
            color: '#18148C',
            maxWidth: '500px',
            textShadow: '1px 1px 1px rgba(255,255,255,0.8)',
            letterSpacing: '0.05em',
            mx: { xs: 'auto', md: 0 },
          }}
        >
          Impulsamos tu negocio en base a los más altos estándares de calidad
        </Typography>
        
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          sx={{ mb: { xs: 3, md: 0 } }}
        >
          <Button
            variant="contained"
            href="/nosotras" 
            sx={{
              backgroundColor: '#18148C',
              color: '#fff',
              padding: { xs: '0.6rem 1.5rem', md: '0.8rem 2.5rem' },
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 'bold',
              letterSpacing: '0.2em',
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: '#fff',
                color: '#18148C',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              },
            }}
          >
            Conoce más
          </Button>
          
          <Button
            variant="outlined"
            href="/servicios" 
            sx={{
              borderColor: '#F2AC57',
              color: '#18148C',
              padding: { xs: '0.6rem 1.5rem', md: '0.8rem 2.5rem' },
              fontSize: { xs: '0.9rem', md: '1rem' },
              fontWeight: 'bold',
              letterSpacing: '0.2em',
              borderRadius: '50px',
              '&:hover': {
                backgroundColor: 'rgba(242, 172, 87, 0.1)',
                borderColor: '#F2AC57',
                color: '#F2AC57',
              },
            }}
          >
            Descubre nuestros servicios
          </Button>
        </Stack>
      </Box>

      {/* Círculos con imágenes a la derecha - Ocultos en móvil */}
      <Box
        sx={{
          position: 'relative',
          width: { xs: '0', md: '40%' }, // Oculto en móvil
          height: { xs: '0', md: '500px' }, // Oculto en móvil
          display: { xs: 'none', md: 'flex' }, // Oculto en móvil
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        {/* Círculo 1 (Grande, centrado) */}
        <Box
          sx={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #fff',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            zIndex: 3,
          }}
        >
          <Image
            src={circleImages[0]}
            alt="Imagen 1"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>

        {/* Círculo 2 (Arriba-derecha) */}
        <Box
          sx={{
            position: 'absolute',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #F2AC57',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            top: '5%',
            right: '-5%',
            zIndex: 2
          }}
        >
          <Image
            src={circleImages[1]}
            alt="Imagen 2"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>

        {/* Círculo 3 (Abajo-derecha) */}
        <Box
          sx={{
            position: 'absolute',
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #fff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            bottom: '-10%',
            right: '10%',
            zIndex: 1
          }}
        >
          <Image
            src={circleImages[2]}
            alt="Imagen 3"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BannerHomePpal;