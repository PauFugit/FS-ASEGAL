import React from 'react';
import { Box, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Image from 'next/image';

const images = [
  '/xqasegal2.jpg', // superior izquierda
  '/xqasegal4.jpg', // centro izquierda
  '/xqasegal3.jpg', // inferior izquierda
  '/xqasegal5.jpg'  // derecha
];

const features = [
  'Compromiso con la calidad',
  'Experiencia en el rubro',
  'Disposición y Cercanía',
  'Rapidez y Seguridad'
];

function AboutUsSection() {
  return (
    <Box sx={{ 
      width: '100%', 
      bgcolor: '#fff', 
      pt: { xs: 4, md: 8 }, 
      pb: { xs: 4, md: 8 }, 
      px: { xs: 2, sm: 4, md: 8 },
      mx: 'auto'
    }}>
      {/* Título */}
      <Typography
        variant="h4"
        sx={{
          color: '#18148C',
          fontWeight: 500,
          letterSpacing: { xs: '0.08em', md: '0.18em' },
          fontSize: { xs: 20, sm: 24, md: 32, xl: 48 },
          mb: { xs: 3, md: 6 },
          textTransform: 'uppercase',
          textShadow: '1px 2px 4px #0B5B8C',
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        ASEGAL B&F ASESORÍAS
      </Typography>

      {/* Primera sección: Descripción + Imagen */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column-reverse', md: 'row' }, 
        alignItems: 'flex-start',
        mb: { xs: 3, md: 2 }
      }}>
        {/* Descripción */}
        <Typography
          variant="body1"
          sx={{
            color: '#18148C',
            maxWidth: 1000,
            fontSize: { xs: 16, sm: 18, md: 20, xl: 25 },
            py: { xs: 2, md: 4 },
            px: { xs: 0, md: 4, lg: 20 },
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          Profesionales expertas en seguridad alimentaria y cumplimiento regulatorio, comprometidas en potenciar tus proyectos gastronómicos para alcanzar nuevos mercados con productos confiables y seguros para tus clientes.
        </Typography>
        
        {/* Imagen superior derecha - Solo visible en desktop */}
        <Box sx={{ 
          flex: 1, 
          display: { xs: 'none', md: 'flex' }, 
          flexDirection: 'column', 
          alignItems: 'flex-end', 
          position: 'relative', 
          minWidth: 250 
        }}>
          <Box
            component="img"
            src={images[3]}
            alt="aboutus"
            sx={{
              width: { md: 400, lg: 500 },
              height: { md: 200, lg: 250 },
              borderRadius: 4,
              objectFit: 'cover',
              boxShadow: 2,
              mb: 1,
              ml: 4
            }}
          />
        </Box>
      </Box>

      {/* Segunda sección: Imágenes verticales y beneficios */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' }, 
        alignItems: { xs: 'center', md: 'flex-start' },
        mt: { xs: 4, md: 12 }
      }}>
        {/* Columna de imágenes - Versión mobile/tablet (horizontal) */}
        <Box sx={{ 
          display: { xs: 'flex', md: 'none' }, 
          flexDirection: 'row', 
          gap: 2,
          mb: 4,
          overflowX: 'auto',
          width: '100%',
          py: 1,
          px: 1
        }}>
          {images.slice(0, 3).map((img, index) => (
            <Box
              key={index}
              sx={{
                minWidth: 200,
                height: 120,
                borderRadius: 3,
                overflow: 'hidden',
                position: 'relative',
                boxShadow: 2,
                flexShrink: 0
              }}
            >
              <Image
                src={img}
                alt={`aboutus-${index}`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Box>

        {/* Columna de imágenes - Versión desktop (vertical) */}
        <Box sx={{ 
          position: 'relative', 
          mr: 4, 
          minWidth: 170,
          display: { xs: 'none', md: 'block' }
        }}>
          <Box sx={{ 
            position: 'relative', 
            zIndex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 2 
          }}>
            {images.slice(0, 3).map((img, index) => (
              <Box
                key={index}
                sx={{
                  width: 300,
                  height: 150,
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: 2,
                  mb: 2
                }}
              >
                <Image
                  src={img}
                  alt={`aboutus-${index}`}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Beneficios */}
        <Box sx={{ 
          ml: { xs: 0, md: 8 }, 
          mt: { xs: 0, md: 2 },
          width: '100%',
          maxWidth: { xs: '100%', md: 'auto' }
        }}>
          <Typography
            variant="h5"
            sx={{
              color: '#18148C',
              fontWeight: 700,
              mb: { xs: 3, md: 6 },
              textShadow: '1px 2px 4px #0B5B8C',
              letterSpacing: '0.04em', 
              fontSize: { xs: 18, sm: 20, md: 25, xl: 40 },
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            ¿POR QUÉ ASEGAL B&F?
          </Typography>
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: { xs: 1, md: 2 }
          }}>
            {features.map((feature, idx) => (
              <Box key={feature} sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: { xs: 1, md: 2 },
                p: 1,
                backgroundColor: { xs: '#f5f9ff', md: 'transparent' },
                borderRadius: 2
              }}>
                <CheckCircleIcon sx={{ 
                  color: '#43b97f', 
                  fontSize: { xs: 40, md: 60 }, 
                  mr: 2 
                }} />
                <Typography variant="h6" sx={{ 
                  color: '#18148C', 
                  fontWeight: 400, 
                  fontSize: { xs: 16, sm: 18, md: 24, xl: 30 } 
                }}>
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