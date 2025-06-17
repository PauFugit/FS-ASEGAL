'use client'
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      style={{ width: '100%' }}
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
        overflow: 'hidden'
      }}>
        <Box sx={{
          height: 200,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
        <CardContent sx={{ 
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2
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
    </motion.div>
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
        px: { xs: 2, sm: 0 }
      }}>
        PLANTILLAS
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr 1fr'
          },
          gap: { xs: 3, sm: 4, md: 5 },
          width: '100%',
          justifyItems: 'center',
          alignItems: 'stretch',
          mb: 4
        }}
      >
        {templates.map((template, index) => (
          <Box key={index} sx={{ width: '100%', maxWidth: 280 }}>
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