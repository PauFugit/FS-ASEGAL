import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';
import BlogCard from './BlogCard';

const blogPosts = [
  {
    image: '/blogcard1.jpg',
    title: 'Lo que necesitas para iniciar tu negocio...',
    description: '¿Estás pensando en emprender en el mundo de la gastronomía? Aquí te dejamos una guía con los pasos esenciales para comenzar tu negocio de manera exitosa...'
  },
  {
    image: '/blogcard2.jpg',
    title: 'Tips para enfrentar con éxito una fiscalización de SEREMI',
    description: '¿Te preocupa una posible fiscalización de SEREMI? Aquí te compartimos consejos prácticos para estar preparado y cumplir con las normativas vigentes...'
  },
  {
    image: '/blogcard3.jpg',
    title: '¿Qué información debe contener una etiqueta nutricional?',
    description: 'La etiqueta nutricional es fundamental para informar a los consumidores sobre los productos alimenticios. Descubre qué información debe incluir y cómo interpretarla correctamente...'
  }
];

function BlogHomeSection() {
  return (
    <Box sx={{ width: '100%', bgcolor: '#fafbfc', py: 6, px: 2, position: 'relative' }}>
      {/* Línea decorativa y título */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="overline" sx={{ color: '#F2AC57', fontWeight: 700, fontSize: 20, mr: 2, position: 'relative', top: 6 }}>
          BLOG
        </Typography>
        <Box sx={{ flex: 1, borderBottom: '2px solid #18148C', ml: 1 }} />
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 500,
          color: '#18148C',
          letterSpacing: '0.12em',
          mb: 8,
          textTransform: 'uppercase',
          fontSize: { xs: 24, md: 32, xl:48 },
          textShadow: '1px 2px 4px #0B5B8C'
        }}
      >
        NOVEDADES Y CONSEJOS PARA TI
      </Typography>

      {/* Cards alineadas */}
      <Grid container spacing={4} justifyContent="center">
        {blogPosts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
            <BlogCard
              image={post.image}
              title={post.title}
              description={post.description}
              sx={{
                height: { xs: 270, md: 260 }, // altura más pequeña
                maxHeight: 270,
                minHeight: 230
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* Línea decorativa inferior y botón "Leer más" */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 6 }}>
        <Box sx={{
          flex: 1,
          borderBottom: '2px solid #18148C',
          mr: 3
        }} />
        <Button
          variant="contained"
          href="/blog"
          sx={{
            bgcolor: '#18148C',
            color: '#ffffff',
            borderRadius: '24px',
            fontWeight: 600,
            py: 1.2,
            px: 4,
            fontSize: 20,
            boxShadow: '0px 2px 8px rgba(67,185,127,0.10)',
            textTransform: 'italic',
            '&:hover': {
              bgcolor: '#ffffff',
              color: '#F2AC57',
              borderBottom: '2px solid #F2AC57'
            }
          }}
        >
          Leer más
        </Button>
      </Box>
    </Box>
  );
}

export default BlogHomeSection;