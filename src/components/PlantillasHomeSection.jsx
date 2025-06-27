'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Stack, Link } from '@mui/material';

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
  }
];

const TemplateCard = ({ title, image, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Box
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 0.5s ease, transform 0.3s ease',
        transitionDelay: `${index * 0.1}s`,
        width: '100%'
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
            color: '#18148C',
            fontWeight: 600,
            fontSize: '1.3rem',
            lineHeight: 1.3
          }}>
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const PlantillasHomeSection = () => {
  return (
    <Box sx={{ 
      py: 6,
      px: { xs: 3, sm: 6, md: 8, lg: 12 },
      maxWidth: 1600,
      mx: 'auto'
    }}>
      <Typography variant="h4" sx={{ 
        mb: 8,
        fontWeight: 500,
        color: '#18148C',
        textAlign: 'left',
        px: { xs: 2, sm: 0 },
        fontSize: { xs: '1.8rem', md: '2.125rem', xl:48 },
        textShadow: '1px 2px 4px #0B5B8C'
      }}>
        PLANTILLAS
      </Typography>

      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { sm: 'center' },
        justifyContent: 'space-between',
        gap: 4,
        mb: 4
      }}>
        <Stack 
          direction="row"
          spacing={3}
          sx={{
            flexGrow: 1,
            overflowX: 'auto',
            pb: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            minHeight: 320
          }}
        >
          {templates.map((template, index) => (
            <Box key={index} sx={{ minWidth: 280 }}>
              <TemplateCard 
                title={template.title} 
                image={template.image}
                index={index} 
              />
            </Box>
          ))}
        </Stack>

        <Link 
          href="/recursos" 
          sx={{ 
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            mr: { sm: 2, md: 4 },
            alignSelf: { xs: 'flex-end', sm: 'center' },
            mt: { xs: 2, sm: 0 }
          }}
        >
          <Typography 
            sx={{ 
              color: '#F2AC57',
              fontWeight: 600,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': {
                textDecoration: 'underline',
                color: '#0B5B8C'
              }
            }}
          >
            Ver más plantillas 
            <Box component="span" sx={{ fontSize: '1.4rem', lineHeight: 0 }}>♦</Box>
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default PlantillasHomeSection;