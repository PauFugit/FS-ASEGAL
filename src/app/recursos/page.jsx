import PlantillasPageSection from '@/components/PlantillasPageSection'
import React from 'react'
import BannerStatic from '@/components/BannerStatic'
import { Box, Typography, Stack } from '@mui/material'
import BannerRecursos from '@/components/BannerRecursos';

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
      </Box>
    </Box>
  );
};

function page() {
  return (
    <div>
      <BannerStatic
        image="bannerRecursos.jpg"
        text="RECURSOS COMPLEMENTARIOS"
      />
      <PlantillasPageSection />
      <CursosCapacitacionesSection />
      <BannerRecursos/>
    </div>
  )
}

export default page