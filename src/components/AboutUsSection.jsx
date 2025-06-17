import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const images = [
  '/cuadrouno.jpg', // superior izquierda
  '/cuadrodos.jpg', // centro izquierda
  '/cuadrotres.jpg', // inferior izquierda
  '/cuadrosuperior.jpg'  // derecha
];

const features = [
  'Compromiso con la calidad',
  'Experiencia en el rubro',
  'Disposición y Cercanía',
  'Rapidez y Seguridad'
];

function AboutUsSection() {
  return (
    <Box sx={{ width: '100%', bgcolor: '#fff', pt: { xs: 6, md: 8 }, pb: 8, px: { xs: 2, md: 8 }, maxWidth: 1200, mx: 'auto' }}>
      {/* Título */}
      <Typography
        variant="h4"
        sx={{
          color: '#003366',
          fontWeight: 500,
          letterSpacing: '0.18em',
          mb: 6,
          textTransform: 'uppercase'
        }}
      >
        ASEGAL B&F ASESORÍAS
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
        {/* Línea y punto decorativo */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2, mt: 1 }}>
          <Box sx={{ width: 12, height: 12, bgcolor: '#ffe066', borderRadius: '50%', mb: 0.5 }} />
          <Box sx={{ width: 3, height: 120, bgcolor: '#ffe066' }} />
        </Box>
        {/* Descripción */}
        <Typography
          variant="body1"
          sx={{
            color: '#003366',
            maxWidth: 480,
            fontSize: { xs: 16, md: 18 },
            py:2,
          }}
        >
            Profesionales expertas en seguridad alimentaria y cumplimiento regulatorio, comprometidas en potenciar tus proyectos gastronómicos para alcanzar nuevos mercados con productos confiables y seguros para tus clientes.        </Typography>
        {/* Imagen superior derecha con línea y punto */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', position: 'relative', minWidth: 250 }}>
          <Box
            component="img"
            src={images[3]}
            alt="aboutus"
            sx={{
              width: 280,
              height: 140,
              borderRadius: 4,
              objectFit: 'cover',
              boxShadow: 2,
              mb: 1,
              ml: 4
            }}
          />
          <Box sx={{
            position: 'absolute',
            left: '50%',
            top: 140,
            width: 3,
            height: 32,
            bgcolor: '#ffe066'
          }} />
          <Box sx={{
            position: 'absolute',
            left: '50%',
            top: 172,
            width: 14,
            height: 14,
            bgcolor: '#ffe066',
            borderRadius: '50%'
          }} />
        </Box>
      </Box>

      {/* Imágenes verticales y beneficios */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', mt: 2 }}>
        {/* Columna de imágenes con línea vertical */}
        <Box sx={{ position: 'relative', mr: 4, minWidth: 170 }}>
          {/* Línea vertical */}
          <Box sx={{
            position: 'absolute',
            left: 32,
            top: 0,
            width: 3,
            height: 260,
            bgcolor: '#ffe066',
            zIndex: 0
          }} />
          {/* Imágenes alineadas verticalmente */}
          <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box
              component="img"
              src={images[0]}
              alt="aboutus"
              sx={{
                width: 150,
                height: 100,
                borderRadius: 3,
                objectFit: 'cover',
                boxShadow: 2,
                mb: 2,
                ml: 0
              }}
            />
            <Box
              component="img"
              src={images[1]}
              alt="aboutus"
              sx={{
                width: 150,
                height: 100,
                borderRadius: 3,
                objectFit: 'cover',
                boxShadow: 2,
                mb: 2,
                ml: 0
              }}
            />
            <Box
              component="img"
              src={images[2]}
              alt="aboutus"
              sx={{
                width: 150,
                height: 100,
                borderRadius: 3,
                objectFit: 'cover',
                boxShadow: 2,
                ml: 0
              }}
            />
          </Box>
        </Box>
        {/* Beneficios */}
        <Box sx={{ ml: { xs: 2, md: 8 }, mt: 2 }}>
          <Typography
            variant="h5"
            sx={{
              color: '#003366',
              fontWeight: 700,
              mb: 3,
              textShadow: '1px 2px 4px #e0e0e0',
              letterSpacing: '0.04em'
            }}
          >
            ¿POR QUÉ ASEGAL B&F?
          </Typography>
          <Box>
            {features.map((feature, idx) => (
              <Box key={feature} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleIcon sx={{ color: '#43b97f', fontSize: 36, mr: 2 }} />
                <Typography variant="h6" sx={{ color: '#003366', fontWeight: 400, fontSize: 20 }}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default AboutUsSection;