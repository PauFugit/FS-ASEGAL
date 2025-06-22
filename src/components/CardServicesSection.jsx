'use client';
import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const services = [
  {
    title: 'Tramiación Resolución Sanitaria',
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
    <Box sx={{ width: '100%', px: { xs: 2, md: 6 }, py: { xs: 4, md: 6 }, maxWidth: 1300, mx: 'auto' }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          color: '#003366',
          letterSpacing: '0.12em',
          mb: 3,
          textTransform: 'uppercase',
          fontSize: { xs: 24, md: 32 },
          textShadow: '1px 2px 4px #e0e0e0'
        }}
      >
        NUESTROS SERVICIOS
      </Typography>
      <Grid container spacing={3}>
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
                maxWidth: 250,
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
                    color: '#003366',
                    fontWeight: 400,
                    fontSize: { xs: 16, md: 18 },
                    mt: 1
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
            backgroundColor: '#43B97F',
            color: 'white',
            borderRadius: '24px',
            textTransform: 'none',
            fontWeight: 500,
            fontStyle: 'italic',
            fontSize: 20,
            px: 4,
            py: 1.2,
            boxShadow: '0px 2px 4px 0px #0000001A',
            border: '2px solid #43B97F',
            transition: 'all 0.2s',
            '&:hover, &:active': {
              backgroundColor: '#fff',
              color: '#43B97F',
              border: '2px solid #43B97F'
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