'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Dialog, IconButton, CircularProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const PlantillasPageSection = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const res = await fetch('/api/public/plantillas');
      if (res.ok) {
        const data = await res.json();
        // Filtrar solo plantillas
        const plantillas = data; 
        setTemplates(plantillas);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPdf(null);
  };

  const TemplateCard = ({ template, index }) => {
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
        onClick={() => handleOpen(template.pdfUrl)}
      >
        <Card sx={{
          width: '100%',
          maxWidth: 300,
          height: 350,
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
            backgroundImage: `url(${template.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            position: 'relative'
          }}>
            {/* Badge de PDF */}
            <Box sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(255,255,255,0.9)',
              borderRadius: 2,
              p: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 0.5
            }}>
              {/* Puedes agregar un icono de PDF aquí si quieres */}
            </Box>
          </Box>
          
          <CardContent sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 2,
            backgroundColor: '#f9f9f9'
          }}>
            <Typography variant="h6" align="center" sx={{ 
              color: '#2d4c6a',
              fontWeight: 600,
              fontSize: '1.5rem',
              lineHeight: 1.3,
            }}>
              {template.name}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 1,
              opacity: isHovered ? 1 : 0.7,
              transition: 'opacity 0.3s ease'
            }}>
              {/* Espacio para botones adicionales si los necesitas */}
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  };

  if (loading) {
    return (
      <Box sx={{ 
        py: 6,
        px: { xs: 3, sm: 6, md: 8, lg: 12 },
        mx: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 400
      }}>
        <CircularProgress />
      </Box>
    );
  }

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

      {templates.length === 0 ? (
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ py: 8 }}>
          No hay plantillas disponibles
        </Typography>
      ) : (
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
            <Box key={template.id} sx={{ 
              width: '100%', 
              maxWidth: 280,
              display: 'flex',
              justifyContent: 'center'
            }}>
              <TemplateCard 
                template={template}
                index={index}
              />
            </Box>
          ))}
        </Box>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { 
            height: { xs: '90vh', md: '90vh' },
            maxWidth: { xs: '95vw', md: '80vw' }
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          backgroundColor: '#18148C',
          color: 'white'
        }}>
          <Typography variant="h6">
            Visualizador de PDF
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ 
          flex: 1, 
          height: 'calc(100% - 64px)',
          p: 0 
        }}>
          {selectedPdf && (
            <iframe
              src={selectedPdf}
              title="Plantilla PDF"
              width="100%"
              height="100%"
              style={{ 
                border: 'none',
                minHeight: '500px'
              }}
            />
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default PlantillasPageSection;