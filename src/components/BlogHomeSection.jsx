import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, CircularProgress } from '@mui/material';
import BlogCard from './BlogCard';

function BlogHomeSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch('/api/public/blog?limit=4');
        if (res.ok) {
          const data = await res.json();
          setPosts(data.slice(0, 4)); // Mostrar solo 4 posts
        }
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (posts.length === 0) {
    return null; // No mostrar la sección si no hay posts
  }

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

      {/* Cards */}
      <Grid container spacing={4} justifyContent="center">
        {posts.map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <BlogCard
              image={post.imageUrl}
              title={post.title}
              description={post.summary}
              sx={{
                height: { xs: 270, md: 260 }, 
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