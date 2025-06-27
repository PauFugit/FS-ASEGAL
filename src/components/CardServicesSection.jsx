'use client';
import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const services = [
  {
    title: 'Tramitación Resolución Sanitaria',
    image: '/resolucionsanitaria.jpg',
  },
  {
    title: 'Sistemas Gestión de Calidad',
    image: '/gestioncalidad.jpg',
  },
  {
    title: 'Auditorías',
    image: '/auditorias.jpg',
  },
  {
    title: 'Etiquetado Nutricional',
    image: '/etiquetado.jpg',
  },
];

function CardServicesSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <Box sx={{ width: '100%', px: { xs: 2, md: 6 }, py: { xs: 4, md: 6 },  mx: 'auto' }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          color: '#18148C',
          letterSpacing: '0.15em',
          mb: 8,
          textTransform: 'uppercase',
          fontSize: { xs: 24, md: 32, xl: 48 },
          textShadow: '1px 2px 4px #0B5B8C'
        }}
      >
        NUESTROS SERVICIOS
      </Typography>
      <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
        {services.map((service, idx) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
            key={service.title}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Card
              elevation={0}
              onMouseEnter={() => setActiveIndex(idx)}
              onMouseLeave={() => setActiveIndex(null)}
              onTouchStart={() => setActiveIndex(idx)}
              onTouchEnd={() => setActiveIndex(null)}
              sx={{
                borderRadius: 0,
                boxShadow: 'none',
                background: 'transparent',
                width: '100%',
                maxWidth: 300,
                minWidth: 140,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s cubic-bezier(.4,2,.6,1)',
                transform: activeIndex === idx ? 'translateY(-8px) scale(1.04)' : 'none',
                boxShadow: activeIndex === idx ? '0 8px 24px 0 rgba(67,185,127,0.18)' : 'none',
                '& .MuiCardMedia-root': {
                  filter: activeIndex === idx ? 'brightness(0.92)' : 'none',
                  transition: 'filter 0.2s'
                }
              }}
            >
              <CardMedia
                component="img"
                image={service.image}
                alt={service.title}
                sx={{
                  width: '100%',
                  aspectRatio: '1 / 2',
                  objectFit: 'cover',
                  borderRadius: 0,
                  border: 'none',
                  mb: 1
                }}
              />
              <CardContent sx={{ p: 0, flexGrow: 1 }}>
                <Typography
                  align="center"
                  sx={{
                    color: '#18148C',
                    fontWeight: 400,
                    fontSize: { xs: 16, md: 18, xl:30 },
                    mt: 1,
                    mb:3
                  }}
                >
                  {service.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, mt: 4 }}>
        <Button
          variant="contained"
          href="/servicios"
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: '#18148C',
            color: 'white',
            borderRadius: '24px',
            textTransform: 'none',
            fontWeight: 500,
            fontStyle: 'italic',
            fontSize: 20,
            px: 4,
            py: 1.2,
            boxShadow: '0px 2px 4px 0px #18148C',
            border: '2px solid #18148C',
            transition: 'all 0.2s',
            '&:hover, &:active': {
              backgroundColor: '#fff',
              color: '#18148C',
              border: '2px solid #18148C'
            }
          }}
        >
          Más información
        </Button>
      </Box>
    </Box>
  );
}

export default CardServicesSection;