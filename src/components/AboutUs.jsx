'use client';
import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Avatar, useTheme } from '@mui/material';
import {
  EmojiObjects as InnovationIcon,
  GppGood as QualityIcon,
  Handshake as CommitmentIcon,
} from '@mui/icons-material';

const AboutUs = () => {
  const theme = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentCommitmentImageIndex, setCurrentCommitmentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Imágenes para los carruseles
  const galleryImages = [
    '/bannerplus5.jpg',
    '/bannerplus3.jpg',
    '/bannerplus2.jpg',
  ];

  const commitmentImages = [
    '/bannerplus7.jpg',
    '/bannerplus1.jpg',
    '/bannerplus4.jpg'
  ];

  // Cambio automático de imágenes con efecto fade CSS
  useEffect(() => {
    const interval1 = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex(prev => (prev + 1) % galleryImages.length);
        setFade(true);
      }, 300);
    }, 4000);
    
    const interval2 = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentCommitmentImageIndex(prev => (prev + 1) % commitmentImages.length);
        setFade(true);
      }, 300);
    }, 3500);
    
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [galleryImages.length, commitmentImages.length]);

  // Valores corporativos (solo 3)
  const values = [
    { icon: <QualityIcon fontSize="large" />, title: "Calidad", description: "Excelencia en nuestros servicios" },
    { icon: <CommitmentIcon fontSize="large" />, title: "Compromiso", description: "Dedicación con nuestros clientes" },
    { icon: <InnovationIcon fontSize="large" />, title: "Innovación", description: "Soluciones creativas y actualizadas" }
  ];

  // Estilos para las animaciones CSS
  const fadeStyles = {
    opacity: fade ? 1 : 0,
    transition: 'opacity 0.5s ease-in-out',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: 0,
    left: 0
  };

  const hoverStyles = {
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.03)'
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Título principal */}
      <Typography variant="h2" align="center" sx={{ 
        mb: 6,
        color: '#18148C',
        fontWeight: 700,
        position: 'relative',
        fontSize: { xs: '2rem', md: '2.5rem', xl: '3rem' },
        '&:after': {
          content: '""',
          display: 'block',
          width: 100,
          height: 4,
          backgroundColor: '#F2AC57',
          margin: '20px auto 0',
          borderRadius: 2,
        }
      }}>
        ASEGAL B&F
      </Typography>

      {/* Sección Historia */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: { xs: 4, md: 6 },
        mb: { xs: 8, md: 10 }
      }}>
        {/* Contenedor de imagen con efecto fade CSS */}
        <Box sx={{ 
          flex: 1,
          position: 'relative',
          height: { xs: 250, md: 350 },
          width: '100%',
          minWidth: { xs: '100%', md: '50%' },
          borderRadius: '24px',
          boxShadow: 3,
          overflow: 'hidden'
        }}>
          <Box
            component="img"
            src={galleryImages[currentImageIndex]}
            alt="Nuestro trabajo"
            sx={fadeStyles}
          />
        </Box>

        {/* Contenido */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 0, md: 2 }
        }}>
          <Typography variant="h4" gutterBottom sx={{ 
            color: '#18148C',
            fontWeight: 600,
            mb: 3,
            fontSize: { xs: '1.5rem', md: '1.75rem', xl: '2.1rem'}
          }}>
            Nuestra Historia
          </Typography>
          <Typography paragraph sx={{ 
            color: theme.palette.text.secondary,
            fontSize: { xs: '1rem', md: '1.1rem', xl: '1.3rem'}
          }}>
            Somos <Box component="span" sx={{ 
              fontWeight: 600,
              color: '#F2AC57'
            }}>Carolina Fernández y Carolina Berthelon</Box>, ingenieras en alimentos y fundadoras de <Box component="span" sx={{ 
              fontWeight: 600,
              color: '#18148C'
            }}>Asegal B&F</Box>. Comprometidas con el crecimiento de empresas en la industria alimentaria, brindamos soluciones personalizadas para cada necesidad.
          </Typography>
        </Box>
      </Box>

      {/* Sección Compromiso */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row-reverse' },
        alignItems: 'center',
        gap: { xs: 4, md: 6 },
        mb: { xs: 8, md: 10 }
      }}>
        {/* Contenedor de imagen con dimensiones fijas */}
        <Box sx={{ 
          flex: 1,
          position: 'relative',
          height: { xs: 250, md: 350 },
          width: '100%',
          minWidth: { xs: '100%', md: '50%' },
          borderRadius: '24px',
          boxShadow: 3,
          overflow: 'hidden'
        }}>
          <Box
            component="img"
            src={commitmentImages[currentCommitmentImageIndex]}
            alt="Nuestro compromiso"
            sx={fadeStyles}
          />
        </Box>

        {/* Contenido */}
        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 0, md: 2 }
        }}>
          <Typography variant="h4" gutterBottom sx={{ 
            color: '#18148C',
            fontWeight: 600,
            mb: 3,
            fontSize: { xs: '1.5rem', md: '1.75rem', xl: '2.1rem' }
          }}>
            Nuestro Compromiso
          </Typography>
          <Typography paragraph sx={{ 
            color: '#18148C',
            fontSize: { xs: '1rem', md: '1.1rem', xl: '1.3rem' },
          }}>
            Con <Box component="span" sx={{ 
              fontWeight: 600,
              color: '#18148C'
            }}>experiencia y cercanía</Box> ofrecemos asesoría personalizada para fortalecer tu negocio, garantizando productos <Box component="span" sx={{ 
              fontWeight: 600,
              color: '#18148C'
            }}>seguros y confiables</Box> que cumplen con normas regulatorias y estándares de calidad.
          </Typography>
        </Box>
      </Box>

      
      {/* Sección del Equipo */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        gap: { xs: 4, md: 6 },
        backgroundColor: '#82C6E820',
        borderRadius: '24px',
        p: { xs: 3, md: 5 },
        
      }}>
        {/* Fotos del equipo */}
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 4,
          flex: 1,
          justifyContent: 'center'
        }}>
          <Avatar
            src="/burbujanosotras1.5.png"
            alt="Carolina Fernández"
            sx={{
              width: { xs: 160, md: 200, xl: 250 },
              height: { xs: 160, md: 200, xl: 250 },
              border: `4px solid white`,
              boxShadow: 3,
              ...hoverStyles
            }}
          />
          <Avatar
            src="/burbujanosotras2.png"
            alt="Carolina Berthelon"
            sx={{
              width: { xs: 160, md: 200, xl: 250  },
              height: { xs: 160, md: 200, xl: 250  },
              border: `4px solid white`,
              boxShadow: 4,
              ...hoverStyles
            }}
          />
        </Box>

        {/* Texto del equipo */}
        <Box sx={{ 
          flex: 1,
          textAlign: { xs: 'center', md: 'left' }
        }}>
          <Typography variant="h4" gutterBottom sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 600,
            mb: 3,
            fontSize: { xs: '1.5rem', md: '1.75rem', xl: '2.2rem'}
          }}>
            Nuestro Equipo
          </Typography>
          <Typography paragraph sx={{ 
            color: theme.palette.text.secondary,
            fontSize: { xs: '1rem', md: '1.1rem', xl: '1.3rem' },
            mb: 3
          }}>
            Dos profesionales apasionadas por la <Box component="span" sx={{ 
              fontWeight: 600,
              color: '#18148C'
            }}>seguridad alimentaria</Box> y el <Box component="span" sx={{ 
              fontWeight: 600,
              color: '#18148C'
            }}>éxito de tus proyectos</Box>, combinando experiencia técnica con un enfoque personalizado para cada cliente.
          </Typography>
        </Box>
      </Box>

      {/* Sección de Valores */}
      <Box sx={{ 
        mb: 6,
        px: { xs: 0, md: 4 }
      }}>
        <Typography variant="h4" align="center" sx={{ 
          mb: 5, mt:8,
          color: theme.palette.primary.main,
          fontWeight: 600,
          fontSize: { xs: '1.5rem', md: '1.75rem', xl: '2.2rem'  },
        }}>
          Nuestros Valores
        </Typography>
        
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 4,
          px: { xs: 2, sm: 0 }
        }}>
          {values.map((value, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 3,
                ...hoverStyles
              }}
            >
              <Box sx={{ 
                color: '#F26A1B',
                fontSize: '3rem',
                mb: 2,
                lineHeight: 1
              }}>
                {value.icon}
              </Box>
              <Typography variant="h6" sx={{ 
                mb: 1.5,
                color: theme.palette.primary.main,
                fontWeight: 600,
                fontSize: '1.5rem'
              }}>
                {value.title}
              </Typography>
              <Typography variant="body1" sx={{ 
                color: theme.palette.text.secondary,
                fontSize: '1.2rem'
              }}>
                {value.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

    </Container>
  );
};

export default AboutUs;