'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const courses = [
  {
    title: "BPM",
    image: "/bannerServicios2.jpg"
  },
  {
    title: "Resolución Sanitaria",
    image: "/cursoextra5.jpg"
  },
  {
    title: "Etiquetado Nutricional",
    image: "/cursoextra2.webp"
  }
];

const CourseCard = ({ title, image, index, onClick }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      cardRef.current.style.opacity = '0';
      cardRef.current.style.transition = `opacity 0.5s ${index * 0.1}s ease-out`;
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [index]);

  return (
    <Box 
      ref={cardRef}
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        cursor: 'pointer',
        '&:hover': {
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease'
        }
      }}
    >
      <Box sx={{
        width: { xs: 220, sm: 240, md: 300 },
        height: { xs: 220, sm: 240, md: 300 },
        borderRadius: '50%',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '4px solid white',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'transform 0.3s ease'
      }} />
      <Typography variant="h6" sx={{ 
        color: '#18148C',
        fontWeight: 600,
        fontSize: { xs: '1rem', md: '1.1rem' },
        textAlign: 'center',
        mt: 1
      }}>
        {title}
      </Typography>
    </Box>
  );
};

const CursosCapacitacionesSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [visibleCourses, setVisibleCourses] = useState(courses);

  const handleOpen = (course) => {
    setSelectedCourse(course);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCourse(null);
  };

  const handleContact = () => {
    window.location.href = '/contacto';
  };

  // Determinar cuántas cards mostrar según el tamaño de pantalla
  const getVisibleCourses = () => {
    const width = window.innerWidth;
    if (width < 600) { // Mobile
      return [courses[0]]; // Solo la primera card
    } else if (width < 900) { // Tablet
      return courses.slice(0, 2); // Primeras 2 cards
    } else { // Desktop
      return courses; // Todas las cards
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setVisibleCourses(getVisibleCourses());
    };

    // Establecer el estado inicial
    setVisibleCourses(getVisibleCourses());
    
    // Escuchar cambios de tamaño
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box sx={{ 
      py: { xs: 4, md: 8 },
      px: { xs: 2, sm: 4, md: 8, lg: 12 },
      maxWidth: 1600,
      mx: 'auto',
      position: 'relative'
    }}>
      <Typography variant="h4" sx={{ 
        mb: { xs: 4, md: 8 },
        fontWeight: 500,
        color: '#18148C',
        textAlign: { xs: 'center', md: 'left' },
        px: { xs: 2, sm: 0 },
        fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.125rem', xl: '3rem' },
        textShadow: '1px 2px 4px #0B5B8C'
      }}>
        CURSOS Y CAPACITACIONES
      </Typography>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Box sx={{
          width: '100%',
          overflowX: 'auto',
          pb: 3,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          mb: 4,
        }}>
          <Stack 
            direction="row"
            spacing={{ xs: 4, sm: 6, md: 6 }}
            sx={{
              width: 'max-content',
              mx: 'auto',
              px: { xs: 2, sm: 0 }
            }}
          >
            {visibleCourses.map((course, index) => (
              <CourseCard 
                key={index}
                title={course.title} 
                image={course.image}
                index={index}
                onClick={() => handleOpen(course)}
              />
            ))}
          </Stack>
        </Box>

        {/* Línea decorativa inferior y botón "Leer más" */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          alignItems: 'center', 
          width: '100%',
          mt: { xs: 4, md: 6 },
          px: { xs: 2, sm: 0 }
        }}>
          <Box sx={{
            flex: 1,
            borderBottom: '2px solid #0B5B8C',
            mr: { xs: 0, sm: 3 },
            mb: { xs: 3, sm: 0 },
            width: { xs: '80%', sm: 'auto' }
          }} />
          <Button
            variant="contained"
            href="/recursos"
            sx={{
              bgcolor: '#1A1773',
              color: '#ffffff',
              borderRadius: '24px',
              fontWeight: 600,
              py: 1.2,
              px: 4,
              fontSize: { xs: 16, sm: 20 },
              boxShadow: '0px 2px 8px rgba(67,185,127,0.10)',
              textTransform: 'italic',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                bgcolor: '#ffffff',
                color: '#F2AC57', 
                boxShadow: '0px 4px 12px rgba(#82C6E8, 0.2)',
              }
            }}
          >
            VER MÁS
          </Button>
        </Box>
      </Box>

      {/* Modal para agendar sesión */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        aria-labelledby="agendar-capacitacion-title"
      >
        <DialogTitle
          id="agendar-capacitacion-title"
          sx={{
            color: '#18148C',
            fontWeight: 700,
            fontSize: { xs: '1.2rem', sm: '1.4rem' },
            textAlign: 'center'
          }}
        >
          {selectedCourse?.title && (
            <>¿Te interesa capacitarte sobre <span style={{ color: '#F2AC57' }}>{selectedCourse.title}</span>?</>
          )}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
          <Typography sx={{ mb: 2, color: '#00325a' }}>
            Agenda una sesión con nuestro equipo para gestionar tu capacitación personalizada.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ 
          justifyContent: 'center', 
          pb: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Button
            variant="contained"
            onClick={handleContact}
            sx={{
              bgcolor: '#18148C',
              color: '#fff',
              borderRadius: '24px',
              fontWeight: 600,
              px: 4,
              py: 1.2,
              fontSize: { xs: 16, sm: 18 },
              textTransform: 'none',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': {
                bgcolor: '#F2AC57',
                color: '#18148C'
              }
            }}
          >
            Contáctanos
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              color: '#18148C',
              fontWeight: 500,
              ml: { xs: 0, sm: 2 },
              mt: { xs: 1, sm: 0 },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CursosCapacitacionesSection;