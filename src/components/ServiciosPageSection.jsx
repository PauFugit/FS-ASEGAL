'use client'
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ServiceCard = ({ title, description, imageUrl, steps, reverse = false }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        mb: { xs: 6, md: 8 },
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid
        container
        direction={reverse ? 'row-reverse' : 'row'}
        alignItems="stretch"
        spacing={0}
        sx={{
          minHeight: { md: 340, lg: 380 },
          width: '100%',
          maxWidth: { xs: 380, sm: 600, md: 900, lg: 1050, xl: 1200 },
          mx: 'auto',
          bgcolor: 'transparent',
        }}
      >
        {/* Imagen */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            minHeight: { xs: 200, md: '100%' },
            p: { xs: 1.5, md: 2.5 },
          }}
        >
          <Box
            component="img"
            src={imageUrl}
            alt={title}
            sx={{
              width: 400,
              height: { xs: 180, md: 220, lg: 400 },
              maxWidth: 400,
              objectFit: 'cover',
              borderRadius: '22px',
              background: '#fff',
              display: 'block',
            }}
          />
        </Grid>

        {/* Contenido */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: { xs: 'auto', md: '100%' },
            p: { xs: 1.5, md: 2.5 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: 600, lg: 700 },
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: '#18148C',
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '1.2rem', md: '1.5rem', xl: '2.2rem' },
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                overflow: 'hidden',
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#0B5B8C',
                mb: 3,
                lineHeight: 1.6,
                fontSize: { xs: '0.98rem', md: '1.05rem', xl: '1.3rem' },
                whiteSpace: 'pre-line',
              }}
            >
              {description}
            </Typography>

            {/* Puedes agregar steps si tu modelo lo permite */}
            {/* ... */}

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#F2AC57',
                  color: 'white',
                  borderRadius: '24px',
                  px: 4,
                  py: 1.2,
                  fontSize: { xs: '0.6rem', md: '0.8rem', xl: '1rem' },
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0px 2px 8px 0px #F2AC5722',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    color: '#F2AC57',
                    border: '2px solid #F2AC57',
                  },
                }}
              >
                COTIZAR SERVICIO
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const ServiciosSection = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/servicios')
      .then(res => res.json())
      .then(data => {
        setServicios(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Cargando servicios...</div>;

  return (
    <Box sx={{
      py: 8,
      px: { xs: 1, md: 2 },
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      bgcolor: '#fff'
    }}>
      {servicios.map((servicio, index) => (
        <ServiceCard
          key={servicio.id || index}
          title={servicio.name}
          description={servicio.description}
          imageUrl={servicio.imageUrl}
          steps={[]} // Si tienes steps en la base de datos, pásalos aquí
          reverse={index % 2 === 1}
        />
      ))}
    </Box>
  );
};

export default ServiciosSection;