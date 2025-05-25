import React from 'react';
import { Box, Typography, Grid, Avatar, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const leftImages = [
  '/cuadrouno.jpg',
  '/cuadrodos.jpg',
  '/cuadrotres.jpg'
];

const rightImage = '/cuadrosuperior.jpg';

const whyItems = [
  'Compromiso con la calidad',
  'Experiencia en el rubro',
  'Disposición y Cercanía',
  'Rapidez y Seguridad'
];

function AboutUsSection() {
  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', py: { xs: 4, md: 8 }, px: { xs: 2, md: 4 } }}>
      <Grid container spacing={2} alignItems="flex-start">
        {/* Título y texto a la izquierda, imagen a la derecha */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 500,
              color: '#003366',
              letterSpacing: '0.12em',
              mb: 2,
              textTransform: 'uppercase',
              fontSize: { xs: 20, md: 28 },
              textShadow: '1px 2px 4px #e0e0e0'
            }}
          >
            ASEGAL B&F ASESORÍAS
          </Typography>
          <Typography sx={{ color: '#003366', mb: 4, fontSize: { xs: 15, md: 17 } }}>
            Profesionales expertas en garantizar la seguridad alimentaria y el cumplimiento regulatorio, con nuestra cercanía y confiabilidad hacemos que tu emprendimiento logre que cada alimento servido sea de la más alta calidad, impulsando tu negocio al siguiente nivel.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Avatar
            variant="rounded"
            src={rightImage}
            alt="about-right"
            sx={{
              width: 200,
              height: 130,
              mb: 2,
              boxShadow: 2,
              borderRadius: 3,
              objectFit: 'cover'
            }}
          />
        </Grid>

        {/* Imágenes verticales a la izquierda */}
        <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {leftImages.map((img, idx) => (
            <Avatar
              key={img}
              variant="rounded"
              src={img}
              alt={`about-img-${idx}`}
              sx={{
                width: 90,
                height: 70,
                mb: 2,
                boxShadow: 2,
                borderRadius: 2,
                objectFit: 'cover'
              }}
            />
          ))}
        </Grid>

        {/* ¿Por qué ASEGAL B&F? a la derecha */}
        <Grid item xs={12} md={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
          <Typography
            variant="h6"
            sx={{
              color: '#003366',
              fontWeight: 500,
              mb: 2,
              fontSize: { xs: 18, md: 22 },
              textShadow: '1px 2px 4px #e0e0e0'
            }}
          >
            ¿POR QUÉ ASEGAL B&F?
          </Typography>
          <List>
            {whyItems.map((item) => (
              <ListItem key={item} disableGutters sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <CheckCircleIcon sx={{ color: '#43B97F', fontSize: 32 }} />
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    sx: { color: '#003366', fontWeight: 500, fontSize: { xs: 15, md: 17 } }
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AboutUsSection;