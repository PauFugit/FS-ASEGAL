'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const templates = [
  {
    title: "Control recepción materias primas",
    image: "/contactosection2.jpg",
    pdf: "/pdfs/RegistroControlRecepcion.pdf"
  },
  {
    title: "Control temperaturas alimentos",
    image: "/cntactosection.jpg",
    pdf: "/pdfs/plantilla2.pdf"
  },
  {
    title: "Control sanitización alimentos",
    image: "/plantillaextra1.jpg",
    pdf: "/pdfs/RegistroControlLimpiezaSanitizaciones.pdf"
  },
  {
    title: "Control de desechos",
    image: "/plantillaextra2.jpg",
    pdf: "/pdfs/plantilla4.pdf"
  },
  {
    title: "Limpieza y sanitización de superficies.",
    image: "/plantillaextra4.jpg",
    pdf: "/pdfs/RegistroControlLimpiezaSanitizaciones.pdf"
  },
  {
    title: "Control aspecto del personal",
    image: "/servicios1.jpg",
    pdf: "/pdfs/RegistroControlHigienePersonal.pdf"
  },
  {
    title: "Control de producción (trazabilidad)",
    image: "/plantillaextra5.jpg",
    pdf: "/pdfs/plantilla7.pdf"
  }
];

const TemplateCard = ({ title, image, index, onClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Box
      sx={{
        width: '100%',
        opacity: isVisible ? 1 : 0,
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 0.5s ease, transform 0.3s ease',
        transitionDelay: `${index * 0.1}s`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Card sx={{
        width: '100%',
        maxWidth: 300,
        height: 300,
        borderRadius: 2,
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
        }
      }}>
        <Box sx={{
          height: 200,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'transform 0.3s ease',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }} />
        <CardContent sx={{ 
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          backgroundColor: '#f9f9f9'
        }}>
          <Typography variant="h6" align="center" sx={{ 
            color: '#2d4c6a',
            fontWeight: 600,
            fontSize: '1.4rem',
            lineHeight: 1.3
          }}>
            {title}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

const PlantillasPageSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const handleOpen = (pdf) => {
    setSelectedPdf(pdf);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPdf(null);
  };

  return (
    <Box sx={{ 
      py: 6,
      px: { xs: 3, sm: 6, md: 8, lg: 12 },
      mx: 'auto'
    }}>
      <Typography variant="h4" sx={{ 
        mb: 5,
        fontWeight: 600,
        color: '#1A1773',
        textAlign: 'left',
        px: { xs: 2, sm: 0 },
        fontSize: { xs: '1.8rem', md: '2.125rem', xl: '3rem' }
      }}>
        PLANTILLAS
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
            lg: '1fr 1fr 1fr 1fr'
          },
          gap: { xs: 3, sm: 4, md: 5 },
          width: '100%',
          justifyItems: 'center',
          alignItems: 'stretch',
          mb: 4
        }}
      >
        {templates.map((template, index) => (
          <Box key={index} sx={{ 
            width: '100%', 
            maxWidth: 280,
            display: 'flex',
            justifyContent: 'center'
          }}>
            <TemplateCard 
              title={template.title} 
              image={template.image}
              index={index}
              onClick={() => handleOpen(template.pdf)}
            />
          </Box>
        ))}
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { height: { xs: '90vh', md: '90vh' }, background: '#222' }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <IconButton onClick={handleClose} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ flex: 1, height: { xs: '80vh', md: '80vh' }, p: 0 }}>
          {selectedPdf && (
            <iframe
              src={selectedPdf}
              title="Plantilla PDF"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default PlantillasPageSection;