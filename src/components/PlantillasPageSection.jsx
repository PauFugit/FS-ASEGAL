'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

const templates = [
  {
    title: "Control recepción materias primas",
    image: "/plantilla1.jpg"
  },
  {
    title: "Control temperaturas alimentos",
    image: "/plantilla2.jpg"
  },
  {
    title: "Control sanitización alimentos",
    image: "/plantilla3.jpg"
  },
  {
    title: "Control de desechos",
    image: "/plantillla4.jpg"
  },
  {
    title: "Limpieza y sanitización de superficies.",
    image: "/plantilla5.jpg"
  },
  {
    title: "Control aspecto del personal",
    image: "/plantilla6.webp"
  },
  {
    title: "Control de producción (trazabilidad)",
    image: "/plantilla7.webp"
  }
];

const TemplateCard = ({ title, image, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Animación de entrada con delay basado en el índice
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Box
      sx={{
        width: '100%',
        opacity: isVisible ? 1 : 0,
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 0.5s ease, transform 0.3s ease',
        transitionDelay: `${index * 0.1}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card sx={{
        width: '100%',
        maxWidth: 280,
        height: 280,
        borderRadius: 2,
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
        }
      }}>
        <Box sx={{
          height: 200,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }} />
        <CardContent sx={{ 
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          backgroundColor: '#f9f9f9'
        }}>
          <Typography variant="h6" align="center" sx={{ 
            color: '#2d4c6a',
            fontWeight: 600,
            fontSize: '1.1rem',
            lineHeight: 1.3
          }}>
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const PlantillasPageSection = () => {
  return (
    <Box sx={{ 
      py: 6,
      px: { xs: 3, sm: 6, md: 8, lg: 12 },
      maxWidth: 1600,
      mx: 'auto'
    }}>
      <Typography variant="h4" sx={{ 
        mb: 5,
        fontWeight: 700,
        color: '#2d4c6a',
        textAlign: 'left',
        px: { xs: 2, sm: 0 },
        fontSize: { xs: '1.8rem', md: '2.125rem' }
      }}>
        PLANTILLAS
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
            lg: '1fr 1fr 1fr 1fr'
          },
          gap: { xs: 3, sm: 4, md: 5 },
          width: '100%',
          justifyItems: 'center',
          alignItems: 'stretch',
          mb: 4
        }}
      >
        {templates.map((template, index) => (
          <Box key={index} sx={{ 
            width: '100%', 
            maxWidth: 280,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <TemplateCard 
              title={template.title} 
              image={template.image}
              index={index} 
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PlantillasPageSection;