'use client';
import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import Image from 'next/image';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const services = [
  { title: 'Tramitación Resolución Sanitaria', image: { src: '/servicios1.webp', width: 300, height: 600 } },
  { title: 'Sistemas Gestión de Calidad', image: { src: '/servicios5.jpg', width: 300, height: 600 } },
  { title: 'Auditorías', image: { src: '/servicios4.jpg', width: 300, height: 600 } },
  { title: 'Etiquetado Nutricional', image: { src: '/servicios3.jpg', width: 300, height: 600 } },
];

function CardServicesSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 3, md: 6 }, py: { xs: 4, md: 6 }, mx: 'auto' }}>
      <Typography variant="h4" sx={{
        fontWeight: 500,
        color: '#18148C',
        letterSpacing: '0.15em',
        mb: { xs: 4, md: 8 },
        textTransform: 'uppercase',
        fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2rem', xl: 48 },
        textShadow: '1px 2px 4px #0B5B8C'
      }}>
        NUESTROS SERVICIOS
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
        {services.map((service, idx) => (
          <Grid item key={service.title} xs={6} sm={6} md={3}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card
              elevation={0}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              onTouchStart={() => setActiveIndex(idx)}
              onTouchEnd={() => setActiveIndex(null)}
              aria-label={`Servicio: ${service.title}`}
              sx={{
                borderRadius: 0,
                background: 'transparent',
                width: '100%',
                maxWidth: { xs: 180, sm: 280, md: 300 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s',
                transform: activeIndex === idx ? 'translateY(-8px) scale(1.04)' : 'none',
                boxShadow: activeIndex === idx ? '0 8px 24px 0 rgba(67,185,127,0.18)' : 'none',
              }}
            >
              <Image
                src={service.image.src}
                alt={service.title}
                width={service.image.width}
                height={service.image.height}
                style={{
                  width: '100%',
                  aspectRatio: '1 / 2',
                  objectFit: 'cover',
                  borderRadius: 0,
                  marginBottom: '8px',
                  transition: 'filter 0.2s',
                  filter: activeIndex === idx ? 'brightness(0.92)' : 'none',
                }}
              />
              <CardContent sx={{ p: 0, flexGrow: 1 }}>
                <Typography align="center" sx={{
                  color: '#18148C', fontWeight: 400,
                  fontSize: { xs: '0.75rem', sm: '0.95rem', md: '1rem', xl: 24 },
                  mt: 1, mb: { xs: 1, md: 3 },
                  px: { xs: 0.5, sm: 1 },
                }}>
                  {service.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, mt: { xs: 3, md: 4 } }}>
        <Button
          variant="contained"
          href="/servicios"
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: '#18148C', color: 'white',
            borderRadius: '24px', textTransform: 'none',
            fontWeight: 500, fontStyle: 'italic',
            fontSize: { xs: 14, sm: 16, md: 20 },
            px: { xs: 3, md: 4 }, py: 1.2,
            border: '2px solid #18148C',
            '&:hover, &:active': { backgroundColor: '#fff', color: '#18148C' }
          }}
        >
          Más información
        </Button>
      </Box>
    </Box>
  );
}

export default CardServicesSection;
