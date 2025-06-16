import React from 'react'
import BannerStatic from '@/components/BannerStatic'
import BannerNewsletter from '@/components/BannerNewsletter'
import BlogCard from '@/components/BlogCard'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const cards = [
  {
    image: 'blogcard1.jpg',
    title: 'Buenas prácticas en la gastronomía',
    description: '¿Cuántas veces cometemos errores de los cuales ni nos percatamos que están mal? Acá van una serie de tips que te permiten generar buenas prácticas en la cocina...',
  },
  {
    image: 'blogcard2.jpg',
    title: 'Buenas prácticas en la gastronomía',
    description: '¿Cuántas veces cometemos errores de los cuales ni nos percatamos que están mal? Acá van una serie de tips que te permiten generar buenas prácticas en la cocina...',
  },
  {
    image: 'card3.jpg',
    title: 'Buenas prácticas en la gastronomía',
    description: '¿Cuántas veces cometemos errores de los cuales ni nos percatamos que están mal? Acá van una serie de tips que te permiten generar buenas prácticas en la cocina...',
  },
  {
    image: 'card4.jpg',
    title: 'Buenas prácticas en la gastronomía',
    description: '¿Cuántas veces cometemos errores de los cuales ni nos percatamos que están mal? Acá van una serie de tips que te permiten generar buenas prácticas en la cocina...',
  },
  {
    image: 'card5.jpg',
    title: 'Buenas prácticas en la gastronomía',
    description: '¿Cuántas veces cometemos errores de los cuales ni nos percatamos que están mal? Acá van una serie de tips que te permiten generar buenas prácticas en la cocina...',
  },
  {
    image: 'card6.jpg',
    title: 'Buenas prácticas en la gastronomía',
    description: '¿Cuántas veces cometemos errores de los cuales ni nos percatamos que están mal? Acá van una serie de tips que te permiten generar buenas prácticas en la cocina...',
  },
];

function page() {
  return (
    <div>
      <BannerStatic
        image="bannerBlog.jpg"
        text="NUESTRO BLOG"
      />

      <Box sx={{ mt: 5, mb: 2, px: 2 }}>
        <Typography variant="h5" sx={{ color: '#00325a', fontWeight: 500, mb: 2 }}>
          NOVEDADES Y CONSEJOS PARA TI
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
            gap: 4,
            justifyContent: 'center',
          }}
        >
          {cards.map((card, idx) => (
            <BlogCard
              key={idx}
              image={card.image}
              title={card.title}
              description={card.description}
            />
          ))}
        </Box>
      </Box>
      {/* Aquí podrías agregar los dots de paginación si lo necesitas */}
    
    <BannerNewsletter />
    </div>
  )
}

export default page