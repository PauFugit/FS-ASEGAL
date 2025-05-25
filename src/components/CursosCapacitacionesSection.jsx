import React from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent, CardMedia, Button, Link } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// Datos de ejemplo para plantillas
const plantillas = [
  { title: 'Plantilla Demo', image: '/plantilla1.jpg' },
  { title: 'Plantilla Demo', image: '/plantilla2.jpg' },
  { title: 'Plantilla Demo', image: '/plantilla3.jpg' },
  { title: 'Plantilla Demo', image: '/plantilla4.jpg' }
];

// Datos de ejemplo para cursos
const cursos = [
  { title: 'Aseguramiento Calidad', image: '/capahome1.jpg' },
  { title: 'Resolución Sanitaria', image: '/capahome2.jpg' },
  { title: 'Comienza tu negocio', image: '/capahome3.webp' }
];

function BlogHomeSection() {
  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 }, bgcolor: '#fff' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* PLANTILLAS */}
        <Typography
          variant="h6"
          sx={{
            color: '#003366',
            letterSpacing: '0.12em',
            mb: 2,
            textTransform: 'uppercase',
            fontWeight: 500
          }}
        >
          PLANTILLAS
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 4 }}>
          <Grid container spacing={2} sx={{ flex: 1 }}>
            {plantillas.map((plantilla, idx) => (
              <Grid item xs={6} sm={3} key={idx}>
                <Card
            key={idx}
            sx={{
              width: 300,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)'
              }
            }}
          >
            <CardActionArea href='/recursos'>
              <CardMedia
                component="img"
                image={plantilla.image}
                alt={plantilla.title}
                sx={{
                  width: '100%',
                  aspectRatio: '16/9',
                  objectFit: 'cover',
                  borderBottom: '1px solid #eee'
                }}
              />
              <CardContent>
                <Typography variant="h6" sx={{ color: '#003366', fontWeight: 500 }}>
                  {plantilla.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {plantilla.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ minWidth: 160, ml: 2, mt: 2, display: { xs: 'none', sm: 'block' } }}>
            <Link
              href="/recursos"
              underline="none"
              sx={{
                color: '#43B97F',
                fontWeight: 500,
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                transition: 'color 0.2s',
                '&:hover': { color: '#2e7d32' }
              }}
            >
              Ver más plantillas <ArrowForwardIcon sx={{ fontSize: 20 }} />
            </Link>
          </Box>
        </Box>

        {/* CURSOS Y CAPACITACIONES */}
        <Typography
          variant="h6"
          sx={{
            color: '#003366',
            letterSpacing: '0.12em',
            mb: 2,
            textTransform: 'uppercase',
            fontWeight: 500
          }}
        >
          CURSOS Y CAPACITACIONES
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
          {cursos.map((curso, idx) => (
            <Grid item xs={12} sm={4} md={4} key={idx} sx={{ textAlign: 'center' }}>
              <Card
                sx={{
                  borderRadius: '50%',
                  overflow: 'hidden',
                  width: 170,
                  height: 170,
                  mx: 'auto',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 8px 20px rgba(0,0,0,0.2)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={curso.image}
                  alt={curso.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </Card>
              <Typography variant="subtitle1" sx={{ mt: 1, color: '#003366', fontWeight: 500 }}>
                {curso.title}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            href="/cursos"
            sx={{
              bgcolor: '#43B97F',
              color: '#fff',
              borderRadius: '24px',
              fontWeight: 600,
              px: 4,
              py: 1,
              fontSize: 18,
              textTransform: 'none',
              boxShadow: '0px 2px 8px rgba(67,185,127,0.10)',
              '&:hover': {
                bgcolor: '#388e5c'
              }
            }}
          >
            Ver más
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default BlogHomeSection;