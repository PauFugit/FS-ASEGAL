'use client'
import React, { useState } from 'react'
import BannerStatic from '@/components/BannerStatic'
import BannerNewsletter from '@/components/BannerNewsletter'
import BlogCard from '@/components/BlogCard'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

const cards = [
  {
    image: 'blogcard1.jpg',
    title: 'Lo que necesitas para iniciar tu negocio...',
    description: '¿Estás pensando en emprender en el mundo de la gastronomía? Aquí te dejamos una guía con los pasos esenciales para comenzar tu negocio de manera exitosa...',
    fullContent: 'Aquí va el contenido completo de la nota 1. Puedes agregar más texto, imágenes o lo que necesites para mostrar en el modal.'
  },
  {
    image: 'blogcard2.jpg',
    title: 'Tips para enfrentar con éxito una fiscalización de SEREMI',
    description: '¿Te preocupa una posible fiscalización de SEREMI? Aquí te compartimos consejos prácticos para estar preparado y cumplir con las normativas vigentes...',
    fullContent: 'Aquí va el contenido completo de la nota 2. Puedes agregar más texto, imágenes o lo que necesites para mostrar en el modal.'
  },
  {
    image: 'blogcard3.jpg',
    title: '¿Qué información debe contener una etiqueta nutricional?',
    description: 'La etiqueta nutricional es fundamental para informar a los consumidores sobre los productos alimenticios. Descubre qué información debe incluir y cómo interpretarla correctamente...',
    fullContent: 'Aquí va el contenido completo de la nota 3. Puedes agregar más texto, imágenes o lo que necesites para mostrar en el modal.'
  },
  {
    image: 'blogcard4.jpg',
    title: 'Buenas prácticas en la gastronomía',
    description: '¿Cuántas veces cometemos errores de los cuales ni nos percatamos que están mal? Acá van una serie de tips que te permiten generar buenas prácticas en la cocina...',
    fullContent: 'Aquí va el contenido completo de la nota 4. Puedes agregar más texto, imágenes o lo que necesites para mostrar en el modal.'
  },
  {
    image: 'blogcard5.jpg',
    title: 'Buenas prácticas en la gastronomía',
    description: '¿Cuántas veces cometemos errores de los cuales ni nos percatamos que están mal? Acá van una serie de tips que te permiten generar buenas prácticas en la cocina...',
    fullContent: 'Aquí va el contenido completo de la nota 5. Puedes agregar más texto, imágenes o lo que necesites para mostrar en el modal.'
  },
  {
    image: 'blogcard6.webp',
    title: 'Buenas prácticas en la gastronomía',
    description: '¿Cuántas veces cometemos errores de los cuales ni nos percatamos que están mal? Acá van una serie de tips que te permiten generar buenas prácticas en la cocina...',
    fullContent: 'Aquí va el contenido completo de la nota 6. Puedes agregar más texto, imágenes o lo que necesites para mostrar en el modal.'
  },
];

function Page() {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleOpen = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
  };

  return (
    <div>
      <BannerStatic
        image="bannerBlog.jpg"
        text="NUESTRO BLOG"
      />

      <Box sx={{ mt: 8, mb: 8, px: { xs: 1, sm: 2, md: 4 } }}>
        <Typography variant="h5" sx={{ color: '#00325a', fontWeight: 500, mb:8,
          fontSize: { xs: '1rem', md: '1.5rem', xl: '3rem' }
         }}>
          NOVEDADES Y CONSEJOS PARA TI
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr'
            },
            gap: { xs: 2, sm: 3, md: 4 },
            justifyContent: 'center',
            alignItems: 'stretch',
            width: '100%',
            maxWidth: 1200,
            mx: 'auto',
          }}
        >
          {cards.map((card, idx) => (
            <Box
              key={idx}
              sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}
              onClick={() => handleOpen(card)}
            >
              <BlogCard
                image={card.image}
                title={card.title}
                description={card.description}
                sx={{ cursor: 'pointer' }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Modal para mostrar información completa */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        aria-labelledby="blog-modal-title"
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', pr: 4 }}>
          {selectedCard?.title}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <img
              src={selectedCard?.image}
              alt={selectedCard?.title}
              style={{
                width: '100%',
                maxHeight: 250,
                objectFit: 'cover',
                borderRadius: 12,
                marginBottom: 16,
              }}
            />
            <Typography variant="body1" sx={{ color: '#00325a' }}>
              {selectedCard?.fullContent}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      <BannerNewsletter />
    </div>
  )
}

export default Page