'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid, Link } from '@mui/material';

const templates = [
  { title: "Control recepción materias primas", image: "/contactosection2.jpg" },
  { title: "Control temperaturas alimentos", image: "/cntactosection.webp" },
  { title: "Control sanitización alimentos", image: "/plantillaextra1.webp" },
  { title: "Control de desechos", image: "/plantillaextra2.webp" }
];

const TemplateCard = ({ title, image, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Box
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 0.5s ease, transform 0.3s ease',
        transitionDelay: `${index * 0.1}s`,
        width: '100%',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card sx={{
        width: '100%',
        borderRadius: 2,
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        overflow: 'hidden',
        '&:hover': { boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }
      }}>
        <Box sx={{
          height: { xs: 140, sm: 160, md: 200 },
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }} />
        <CardContent sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1.5, sm: 2 },
          backgroundColor: '#f9f9f9',
          minHeight: { xs: 60, sm: 80 },
        }}>
          <Typography variant="h6" align="center" sx={{
            color: '#18148C',
            fontWeight: 600,
            fontSize: { xs: '0.85rem', sm: '1rem', md: '1.1rem' },
            lineHeight: 1.3,
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
      py: { xs: 4, md: 6 },
      px: { xs: 2, sm: 4, md: 8, lg: 12 },
      maxWidth: 1600,
      mx: 'auto'
    }}>
      <Box sx={{
        display: 'flex',
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
        mb: { xs: 3, md: 6 },
        gap: 2,
      }}>
        <Typography variant="h4" sx={{
          fontWeight: 500,
          color: '#18148C',
          fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.125rem', xl: 48 },
          textShadow: '1px 2px 4px #0B5B8C'
        }}>
          PLANTILLAS
        </Typography>

        <Link
          href="/recursos"
          sx={{
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            alignSelf: { xs: 'flex-end', sm: 'center' },
          }}
        >
          <Typography sx={{
            color: '#F2AC57', fontWeight: 600,
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
            display: 'flex', alignItems: 'center', gap: 1,
            '&:hover': { textDecoration: 'underline', color: '#0B5B8C' }
          }}>
            Ver más plantillas
            <Box component="span" sx={{ fontSize: '1.4rem', lineHeight: 0 }}>♦</Box>
          </Typography>
        </Link>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
        {templates.map((template, index) => (
          <Grid item key={index} xs={6} sm={6} md={3}>
            <TemplateCard title={template.title} image={template.image} index={index} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlantillasHomeSection;
