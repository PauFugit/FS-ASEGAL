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
    image: "/cursoextra2.jpg"
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
        width: 300,
        height: 300,
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
        fontSize: '1.1rem',
        textAlign: 'center',
        mt: 1
      }}>
        {title}
      </Typography>
    </Box>
  );
};

const CursosCapacitacionesPageSection = () => {
  const [open, setOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  return (
    <Box sx={{ 
      py: 8,
      px: { xs: 3, sm: 6, md: 8, lg: 12 },
      maxWidth: 1600,
      mx: 'auto',
      position: 'relative'
    }}>
      <Typography variant="h4" sx={{ 
        mb: 8,
        fontWeight: 500,
        color: '#18148C',
        textAlign: 'left',
        px: { xs: 2, sm: 0 },
        fontSize: { xs: '1.8rem', md: '2.125rem', xl:48 },
        textShadow: '1px 2px 4px #0B5B8C'
      }}>
        CURSOS Y CAPACITACIONES
      </Typography>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Stack 
          direction="row"
          spacing={6}
          sx={{
            width: '100%',
            justifyContent: 'center',
            overflowX: 'auto',
            pb: 3,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            mb: 4,
          }}
        >
          {courses.map((course, index) => (
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
            <>¿Te interesa <span style={{ color: '#F2AC57' }}>{selectedCourse.title}</span>?</>
          )}
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
          <Typography sx={{ mb: 2, color: '#00325a' }}>
            Agenda una sesión con nuestro equipo para gestionar tu capacitación personalizada.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
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
              fontSize: 18,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#F2AC57',
                color: '#18148C'
              }
            }}
          >
            Ir a contacto
          </Button>
          <Button
            onClick={handleClose}
            sx={{
              color: '#18148C',
              fontWeight: 500,
              ml: 2
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CursosCapacitacionesPageSection;