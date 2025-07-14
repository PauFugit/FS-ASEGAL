'use client'
import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import Image from 'next/image';

const equipoData = [
  {
    name: 'Carolina Fernández',
    title: 'Ingeniera en Alimentos',
    images: [
      '/carolina1.png',
      '/carolina1.1.png',
      '/carolina1.2.png'
    ]
  },
  {
    name: 'Carolina Berthelón',
    title: 'Ingeniera en Alimentos',
    images: [
      '/carolina2.png',
      '/carolina2.1.png',
      '/carolina2.2.png'
    ]
  }
];

function Equipo() {
  const [carouselIndex, setCarouselIndex] = useState([0, 0]);
  const [hovered, setHovered] = useState([false, false]);

  // Avance automático del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) =>
        prev.map((idx, i) => (idx + 1) % equipoData[i].images.length)
      );
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 4 }, px: { xs: 2, md: 4 }, mx: 'auto' }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          color: '#18148C',
          fontWeight: 700,
          mb: 6,
          fontSize: { xs: '2rem', md: '2.5rem', xl: '3rem' },
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        NUESTRO EQUIPO
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {equipoData.map((member, idx) => (
          <Card
            key={member.name}
            elevation={4}
            onMouseEnter={() => {
              const arr = [...hovered];
              arr[idx] = true;
              setHovered(arr);
            }}
            onMouseLeave={() => {
              const arr = [...hovered];
              arr[idx] = false;
              setHovered(arr);
            }}
            sx={{
              width: { xs: '100%', sm: 300, md: 340, xl: 400 },
              height: { xs: 400, md: 600, xl: 700 },
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              boxShadow: 4,
              background: '#fff',
              aspectRatio: '3 / 7',
              overflow: 'hidden',
              p: 0,
              transition: 'transform 0.3s cubic-bezier(.4,2,.6,1), box-shadow 0.3s cubic-bezier(.4,2,.6,1)',
              // Solo animación en desktop
              ...(hovered[idx] && {
                transform: { md: 'scale(1.04) translateY(-10px)' },
                boxShadow: { md: '0 12px 32px 0 rgba(67,185,127,0.18)' }
              }),
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <Image
                src={member.images[carouselIndex[idx]]}
                alt={member.name}
                width={400} // Ajusta según el tamaño real de tus imágenes
    height={600} // Ajusta según el tamaño real de tus imágenes
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 0,
      transition: 'opacity 0.5s',
    }}
              />
            </Box>
            <CardContent
  sx={{
    p: 0,
    textAlign: 'center',
    width: '100%',
    // Elimina altura fija y margen inferior
    height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    mb: 0,
  }}
>
  <Typography
    variant="h6"
    sx={{
      fontWeight: 600,
      color: '#18148C',
      fontSize: { xs: '1.2rem', md: '1.4rem' },
      mt: 2,
      mb: 0, // Sin margen inferior extra
    }}
  >
    {member.name}
  </Typography>
  <Typography
    variant="body2"
    sx={{
      color: '#757575',
      fontSize: { xs: '1rem', md: '1.1rem' },
      fontStyle: 'italic',
      mt: 1,
      mb: 0, // Sin margen inferior extra
    }}
  >
    {member.title}
  </Typography>
</CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default Equipo;