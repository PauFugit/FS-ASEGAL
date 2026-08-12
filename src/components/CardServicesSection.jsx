'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function CardServicesSection() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/public/servicios')
      .then((res) => res.json())
      .then((data) => setServices(Array.isArray(data) ? data.slice(0, 4) : []))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box sx={{ width: '100%', px: { xs: 2, sm: 3, md: 6 }, py: { xs: 4, md: 6 }, mx: 'auto' }}>
      <Typography variant="h4" sx={{
        fontWeight: 500,
        color: '#18148C',
        letterSpacing: '0.15em',
        mb: { xs: 4, md: 8 },
        textTransform: 'uppercase',
        fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2rem', xl: 48 },
        textShadow: '1px 2px 4px #0B5B8C'
      }}>
        NUESTROS SERVICIOS
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress sx={{ color: '#18148C' }} />
        </Box>
      ) : (
        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
          {services.map((service, idx) => (
            <Grid item key={service.id} xs={6} sm={6} md={3}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                elevation={0}
                component={Link}
                href={`/servicios/${service.slug}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseLeave={() => setActiveIndex(null)}
                onTouchStart={() => setActiveIndex(idx)}
                onTouchEnd={() => setActiveIndex(null)}
                aria-label={`Servicio: ${service.name}`}
                sx={{
                  borderRadius: 0,
                  background: 'transparent',
                  width: '100%',
                  maxWidth: { xs: 180, sm: 280, md: 300 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.25s cubic-bezier(.4,2,.6,1), box-shadow 0.25s',
                  transform: activeIndex === idx ? 'translateY(-8px) scale(1.04)' : 'none',
                  boxShadow: activeIndex === idx ? '0 8px 24px 0 rgba(67,185,127,0.18)' : 'none',
                }}
              >
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  width={300}
                  height={600}
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 2',
                    objectFit: 'cover',
                    borderRadius: 0,
                    marginBottom: '8px',
                    transition: 'filter 0.2s',
                    filter: activeIndex === idx ? 'brightness(0.92)' : 'none',
                  }}
                />
                <CardContent sx={{ p: 0, flexGrow: 1 }}>
                  <Typography align="center" sx={{
                    color: '#18148C', fontWeight: 400,
                    fontSize: { xs: '0.75rem', sm: '0.95rem', md: '1rem', xl: 24 },
                    mt: 1, mb: { xs: 1, md: 3 },
                    px: { xs: 0.5, sm: 1 },
                  }}>
                    {service.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, mt: { xs: 3, md: 4 } }}>
        <Button
          variant="contained"
          href="/servicios"
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: '#18148C', color: 'white',
            borderRadius: '24px', textTransform: 'none',
            fontWeight: 500, fontStyle: 'italic',
            fontSize: { xs: 14, sm: 16, md: 20 },
            px: { xs: 3, md: 4 }, py: 1.2,
            border: '2px solid #18148C',
            '&:hover, &:active': { backgroundColor: '#fff', color: '#18148C' }
          }}
        >
          Más información
        </Button>
      </Box>
    </Box>
  );
}

export default CardServicesSection;
