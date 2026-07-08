'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import BannerStatic from '@/components/BannerStatic'
import BannerNewsletter from '@/components/BannerNewsletter'
import BannerCierreTres from '@/components/BannerCierreTres'
import BlogCard from '@/components/BlogCard'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CircularProgress from '@mui/material/CircularProgress'
import Button from '@mui/material/Button'

function Page() {
  const [startIdx, setStartIdx] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cards por página según tamaño de pantalla
  const CARDS_PER_PAGE = 4;

  // Cargar posts desde la API
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch('/api/public/blog');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error loading posts:', error);
        setError('Error al cargar los posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="error">{error}</Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ mt: 2 }}
        >
          Reintentar
        </Button>
      </Box>
    );
  }


  // Lógica para flechas
  const canGoBack = startIdx > 0;
  const canGoForward = startIdx + CARDS_PER_PAGE < posts.length;

  const handlePrev = () => {
    if (canGoBack) setStartIdx(startIdx - CARDS_PER_PAGE);
  };

  const handleNext = () => {
    if (canGoForward) setStartIdx(startIdx + CARDS_PER_PAGE);
  };

  // Cards visibles en la página actual
  const visibleCards = posts.slice(startIdx, startIdx + CARDS_PER_PAGE);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <BannerStatic
        image="bannerblogcierre.jpg"
        text="NUESTRO BLOG"
      />

      <Box sx={{ mt: 8, mb: 8, px: { xs: 2, sm: 3, md: 4, lg: 6 } }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: '#18148C',
            fontWeight: 700,
            mb: 6,
            textAlign: 'center',
            fontSize: { xs: '1.8rem', md: '2.2rem', lg: '2.5rem' }
          }}
        >
          NOVEDADES Y CONSEJOS PARA TI
        </Typography>
        
        {posts.length === 0 ? (
          <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ py: 8 }}>
            No hay entradas de blog disponibles
          </Typography>
        ) : (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            mb: 6
          }}>
            {/* Flecha Izquierda */}
            {canGoBack && (
              <IconButton
                onClick={handlePrev}
                sx={{
                  position: { md: 'absolute', xs: 'fixed' },
                  left: { md: -20, xs: 8 },
                  top: { xs: '50%', md: '50%' },
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: '#fff',
                  boxShadow: 3,
                  '&:hover': { background: '#f4f6fa' },
                  width: { xs: 40, md: 48 },
                  height: { xs: 40, md: 48 },
                }}
                aria-label="Anterior"
              >
                <ArrowBackIosNewIcon sx={{ color: '#18148C', fontSize: { xs: 18, md: 22 } }} />
              </IconButton>
            )}
            
            {/* Cards */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: '1fr 1fr',
                  md: '1fr 1fr 1fr 1fr'
                },
                gap: { xs: 3, sm: 3, md: 4 },
                width: '100%',
                maxWidth: 1400,
                mx: 'auto',
              }}
            >
              {visibleCards.map((post) => (
                <Box
                  key={post.id}
                  component={Link}
                  href={`/blog/${post.slug}`}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <BlogCard
                    image={post.imageUrl}
                    title={post.title}
                    description={post.summary}
                    sx={{
                      width: '100%',
                      maxWidth: 320,
                      minWidth: 0,
                      background: '#fff',
                      borderRadius: 3,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      height: '100%',
                    }}
                    imgSx={{
                      width: '100%',
                      height: 200,
                      objectFit: 'cover',
                    }}
                    titleSx={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: '#18148C',
                      mb: 1,
                      minHeight: 56,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      px: 2,
                      pt: 2
                    }}
                    descSx={{
                      color: '#555',
                      fontSize: '0.95rem',
                      minHeight: 72,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      px: 2,
                      pb: 2
                    }}
                  />
                </Box>
              ))}
            </Box>

            {/* Flecha Derecha */}
            {canGoForward && (
              <IconButton
                onClick={handleNext}
                sx={{
                  position: { md: 'absolute', xs: 'fixed' },
                  right: { md: -20, xs: 8 },
                  top: { xs: '50%', md: '50%' },
                  transform: 'translateY(-50%)',
                  zIndex: 10,
                  background: '#fff',
                  boxShadow: 3,
                  '&:hover': { background: '#f4f6fa' },
                  width: { xs: 40, md: 48 },
                  height: { xs: 40, md: 48 },
                }}
                aria-label="Siguiente"
              >
                <ArrowForwardIosIcon sx={{ color: '#18148C', fontSize: { xs: 18, md: 22 } }} />
              </IconButton>
            )}
          </Box>
        )}
      </Box>

      <BannerNewsletter />
      <BannerCierreTres />
    </div>
  )
}

export default Page