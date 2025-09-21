'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Button, Stack, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';

const CursosCapacitacionesSection = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [visibleCourses, setVisibleCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    const updateVisibleCourses = () => {
      const width = window.innerWidth;
      let visibleCount = 3; // Default para desktop
      
      if (width < 600) { // Mobile
        visibleCount = 1;
      } else if (width < 900) { // Tablet
        visibleCount = 2;
      }
      
      setVisibleCourses(courses.slice(0, visibleCount));
    };

    updateVisibleCourses();
    window.addEventListener('resize', updateVisibleCourses);
    
    return () => {
      window.removeEventListener('resize', updateVisibleCourses);
    };
  }, [courses]);

  const loadCourses = async () => {
    try {
      const res = await fetch('/api/public/recursos');
      if (res.ok) {
        const data = await res.json();
        // Filtrar solo capacitaciones
        const capacitaciones = data.data.filter(resource => resource.type === 'CAPACITACION');
        setCourses(capacitaciones);
      } else {
        console.error('Error loading courses');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

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

  const CourseCard = ({ course, index }) => {
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
        onClick={() => handleOpen(course)}
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
          backgroundImage: `url(${course.imageUrl})`,
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
          {course.name}
        </Typography>
      </Box>
    );
  };

  if (loading) {
    return (
      <Box sx={{ 
        py: { xs: 4, md: 8 },
        px: { xs: 2, sm: 4, md: 8, lg: 12 },
        maxWidth: 1600,
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

      {courses.length === 0 ? (
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ py: 8 }}>
          No hay cursos disponibles
        </Typography>
      ) : (
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
                  key={course.id}
                  course={course}
                  index={index}
                />
              ))}
            </Stack>
          </Box>

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
      )}

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
          {selectedCourse?.name && (
            <>¿Te interesa capacitarte sobre <span style={{ color: '#F2AC57' }}>{selectedCourse.name}</span>?</>
          )}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
          <Typography sx={{ mb: 2, color: '#00325a' }}>
            {selectedCourse?.summary}
          </Typography>
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