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
          setPosts(data.slice(0, 4));
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

  if (posts.length === 0) return null;

  return (
    <Box sx={{ width: '100%', bgcolor: '#fafbfc', py: { xs: 4, md: 6 }, px: { xs: 2, sm: 3, md: 4 }, position: 'relative' }}>
      {/* Título */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="overline" sx={{
          color: '#F2AC57', fontWeight: 700,
          fontSize: { xs: 16, md: 20 }, mr: 2, position: 'relative', top: 6
        }}>
          BLOG
        </Typography>
        <Box sx={{ flex: 1, borderBottom: '2px solid #18148C', ml: 1 }} />
      </Box>

      <Typography variant="h4" sx={{
        fontWeight: 500,
        color: '#18148C',
        letterSpacing: '0.08em',
        mb: { xs: 4, md: 8 },
        textTransform: 'uppercase',
        fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem', xl: 48 },
        textShadow: '1px 2px 4px #0B5B8C'
      }}>
        NOVEDADES Y CONSEJOS PARA TI
      </Typography>

      <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
            <BlogCard
              image={post.imageUrl}
              title={post.title}
              description={post.summary}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 4, md: 6 } }}>
        <Box sx={{ flex: 1, borderBottom: '2px solid #18148C', mr: { xs: 2, md: 3 } }} />
        <Button
          variant="contained"
          href="/blog"
          sx={{
            bgcolor: '#18148C', color: '#ffffff',
            borderRadius: '24px', fontWeight: 600,
            py: 1.2, px: { xs: 3, md: 4 },
            fontSize: { xs: 14, sm: 16, md: 20 },
            textTransform: 'none',
            '&:hover': { bgcolor: '#ffffff', color: '#F2AC57' }
          }}
        >
          Leer más
        </Button>
      </Box>
    </Box>
  );
}

export default BlogHomeSection;
