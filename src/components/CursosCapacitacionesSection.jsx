'use client'
import React from 'react';
import { Box, Typography, Button, Stack, Link } from '@mui/material';
import { motion } from 'framer-motion';

const courses = [
  {
    title: "BPM",
    image: "/capahome1.jpg"
  },
  {
    title: "Resolución Sanitaria",
    image: "/capahome2.jpg"
  },
  {
    title: "Etiquetado Nutricional",
    image: "/capahome3.webp"
  }
];

const CourseCard = ({ title, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}>
        <Box sx={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          border: '4px solid white',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }} />
        <Typography variant="h6" sx={{ 
          color: '#2d4c6a',
          fontWeight: 600,
          fontSize: '1.1rem',
          textAlign: 'center',
          mt: 1
        }}>
          {title}
        </Typography>
      </Box>
    </motion.div>
  );
};

const CursosCapacitacionesSection = () => {
  return (
    <Box sx={{ 
      py: 8,
      px: { xs: 3, sm: 6, md: 8, lg: 12 },
      maxWidth: 1600,
      mx: 'auto',
      position: 'relative'
    }}>
      <Typography variant="h4" sx={{ 
        mb: 6,
        fontWeight: 700,
        color: '#2d4c6a',
        textAlign: 'left',
        px: { xs: 2, sm: 0 }
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
            mb: 4
          }}
        >
          {courses.map((course, index) => (
            <CourseCard 
              key={index}
              title={course.title} 
              image={course.image}
              index={index} 
            />
          ))}
        </Stack>

        {/* Línea decorativa inferior y botón "Leer más" */}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 6 }}>
                <Box sx={{
                  flex: 1,
                  borderBottom: '2px solid #1565c0',
                  mr: 3
                }} />
                <Button
                  variant="contained"
                  href="/recursos"
                  sx={{
                    bgcolor: '#43b97f',
                    color: '#ffffff',
                    borderRadius: '24px',
                    fontWeight: 600,
                    py: 1.2,
                    px: 4,
                    fontSize: 20,
                    boxShadow: '0px 2px 8px rgba(67,185,127,0.10)',
                    textTransform: 'italic',
                    '&:hover': {
                      bgcolor: '#003366'
                    }
                  }}
                >
                  VER MÁS
                </Button>
              </Box>
            </Box>
    </Box>
  );
};

export default CursosCapacitacionesSection;