import React from 'react';
import { Box, Typography, Grid, Card, CardMedia, CardContent, IconButton, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const blogPosts = [
  {
    title: 'Buenas prácticas en la gastronomía',
    image: '/blogcard1.jpg',
    description: '¿Cuántas veces cometemos errores de los cuales ni nos percatamos que están mal? Acá van una serie de tips que te permiten generar buenas prácticas en la cocina...',
    link: '/blog'
  },
  {
    title: 'Buenas prácticas en la gastronomía',
    image: '/blogcard2.jpg',
    description: '¿Cuántas veces cometemos errores de los cuales ni nos percatamos que están mal? Acá van una serie de tips que te permiten generar buenas prácticas en la cocina...',
    link: '/blog'
  },
  {
    title: 'Buenas prácticas en la gastronomía',
    image: '/blogcard3.jpg',
    description: '¿Cuántas veces cometemos errores de los cuales ni nos percatamos que están mal? Acá van una serie de tips que te permiten generar buenas prácticas en la cocina...',
    link: '/blog'
  }
];

function BlogHomeSection() {
  return (
    <Box sx={{ width: '100%', py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 }, bgcolor: '#f9f9f9' }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Título */}
        <Typography variant="overline" sx={{ color: '#FFDE17', display: 'block', mb: 1 }}>
          BLOG
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 500,
            color: '#003366',
            letterSpacing: '0.12em',
            mb: 4,
            textTransform: 'uppercase',
            fontSize: { xs: 24, md: 32 },
            textShadow: '1px 2px 4px #e0e0e0'
          }}
        >
          NOVEDADES Y CONSEJOS PARA TI
        </Typography>

        {/* Cards: Todas en una fila */}
        <Grid container spacing={4} wrap="nowrap" sx={{ overflowX: 'auto', pb: 2 }}>
          {blogPosts.map((post, index) => (
            <Grid item key={index} sx={{ flex: '0 0 33.33%', minWidth: 300 }}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.12)'
                  }
                }}
              >
                <CardMedia
                  component="img"
                  image={post.image}
                  alt={post.title}
                  sx={{
                    height: 140,
                    objectFit: 'cover',
                    borderBottom: '1px solid #eee'
                  }}
                />
                <CardContent sx={{ bgcolor: '#EAF6FF', position: 'relative', pb: 6 }}>
                  <Typography variant="h6" component="div" sx={{ fontWeight: 500, mb: 1, color: '#003366' }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {post.description}
                  </Typography>
                  <IconButton
                    href={post.link}
                    sx={{
                      position: 'absolute',
                      bottom: -20,
                      right: 16,
                      bgcolor: '#003366',
                      color: '#fff',
                      width: 40,
                      height: 40,
                      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                      '&:hover': {
                        bgcolor: '#002244'
                      }
                    }}
                  >
                    <ArrowForwardIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Botón "Leer más" */}
        <Box sx={{ display: 'flex', justifyContent: 'right', mt: 4 }}>
          <Button
            variant="contained"
            href="/blog"
            sx={{
              bgcolor: '#FFDE17',
              color: '#003366',
              borderRadius: '24px',
              fontWeight: 600,
              py: 1.2,
              px: 3,
              '&:hover': {
                bgcolor: '#f2d413'
              }
            }}
          >
            Leer más
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default BlogHomeSection;