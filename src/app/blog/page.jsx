'use client'
import React, { useState } from 'react'
import BannerStatic from '@/components/BannerStatic'
import BannerNewsletter from '@/components/BannerNewsletter'
import BannerCierreTres from '@/components/BannerCierreTres'
import BlogCard from '@/components/BlogCard'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const cards = [
  {
    image: 'blogcard1.jpg',
    title: 'Lo que necesitas para iniciar tu negocio...',
    description: '¿Estás pensando en emprender en el mundo de la gastronomía? Aquí te dejamos una guía con los pasos esenciales para comenzar tu negocio de manera exitosa...',
    fullContent: 'Aquí va el contenido completo de la nota 1. Puedes agregar más texto, imágenes o lo que necesites para mostrar en el modal.',
    pdf: '/pdfs/blog1.pdf'
  },
  {
    image: 'servicios2.jpg',
    title: 'Tips para enfrentar con éxito una fiscalización de SEREMI',
    description: '¿Te preocupa una posible fiscalización de SEREMI? Aquí te compartimos consejos prácticos para estar preparado y cumplir con las normativas vigentes...',
    fullContent: 'Aquí va el contenido completo de la nota 2. Puedes agregar más texto, imágenes o lo que necesites para mostrar en el modal.',
    pdf: '/pdfs/blog2.pdf'
  },
  {
    image: 'cardservicios3.jpg',
    title: '¿Qué información debe contener una etiqueta nutricional?',
    description: 'La etiqueta nutricional es fundamental para informar a los consumidores sobre los productos alimenticios. Descubre qué información debe incluir y cómo interpretarla correctamente...',
    fullContent: 'Aquí va el contenido completo de la nota 3. Puedes agregar más texto, imágenes o lo que necesites para mostrar en el modal.',
    pdf: '/pdfs/blog3.pdf'
  },
  {
    image: 'bannerblog2.jpg',
    title: 'Ley 20.606 de Etiquetado de Alimentos en Chile',
    description: 'La Ley 20.606 regula el etiquetado de alimentos en Chile para promover una alimentación saludable. Conoce todo lo relativo a la ley, sus objetivos y cómo afecta a los productos alimenticios...',
    fullContent: 'Aquí va el contenido completo de la nota 4. Puedes agregar más texto, imágenes o lo que necesites para mostrar en el modal.',
    pdf: '/pdfs/blog4.pdf'
  },
];

function Page() {
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [startIdx, setStartIdx] = useState(0);

  // Cards por página según tamaño de pantalla
  const CARDS_PER_PAGE = 4;

  // Lógica para flechas
  const canGoBack = startIdx > 0;
  const canGoForward = startIdx + CARDS_PER_PAGE < cards.length;

  const handleOpen = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
  };

  const handlePrev = () => {
    if (canGoBack) setStartIdx(startIdx - CARDS_PER_PAGE);
  };

  const handleNext = () => {
    if (canGoForward) setStartIdx(startIdx + CARDS_PER_PAGE);
  };

  // Cards visibles en la página actual
  const visibleCards = cards.slice(startIdx, startIdx + CARDS_PER_PAGE);

  return (
    <div>
      <BannerStatic
        image="bannerblogcierre.jpg"
        text="NUESTRO BLOG"
      />

      <Box sx={{ mt: 8, mb: 8, px: { xs: 1, sm: 2, md: 4 } }}>
        <Typography variant="h5" sx={{
          color: '#18148C', fontWeight: 500, mb: 8,
          fontSize: { xs: '1.3rem', md: '1.5rem', xl: '3rem' }
        }}>
          NOVEDADES Y CONSEJOS PARA TI
        </Typography>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Flecha Izquierda */}
          {canGoBack && (
            <IconButton
              onClick={handlePrev}
              sx={{
                position: { md: 'absolute', xs: 'fixed' },
                left: { md: 10, xs: 10 },
                top: { xs: '50%', md: 'auto' },
                transform: { xs: 'translateY(-50%)', md: 'none' },
                zIndex: 10,
                background: '#fff',
                boxShadow: 2,
                '&:hover': { background: '#f4f6fa' },
                width: { xs: 40, md: 48 },
                height: { xs: 40, md: 48 },
              }}
              aria-label="Anterior"
            >
              <ArrowBackIosNewIcon sx={{ color: '#18148C', fontSize: { xs: 22, md: 28 } }} />
            </IconButton>
          )}
          {/* Cards */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr 1fr'
              },
              gap: { xs: 2, sm: 3, md: 4 },
              width: '100%',
              maxWidth: 1400,
              mx: 'auto',
            }}
          >
            {visibleCards.map((card, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'stretch',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px) scale(1.03)',
                    boxShadow: '0 8px 32px rgba(24,20,140,0.15)',
                  },
                }}
                onClick={() => handleOpen(card)}
              >
                <BlogCard
                  image={card.image}
                  title={card.title}
                  description={card.description}
                  sx={{
                    width: '100%',
                    maxWidth: 340,
                    minWidth: 0,
                    background: '#fff',
                    borderRadius: 4,
                    boxShadow: '0 2px 12px rgba(24,20,140,0.07)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                  }}
                  imgSx={{
                    width: '100%',
                    height: { xs: 180, sm: 180, md: 180, lg: 200 },
                    objectFit: 'cover',
                    borderRadius: '4px 4px 0 0',
                  }}
                  titleSx={{
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.1rem', lg: '1.2rem' },
                    color: '#18148C',
                    mb: 1,
                    minHeight: 56,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                  descSx={{
                    color: '#00325a',
                    fontSize: { xs: '0.95rem', md: '1rem' },
                    minHeight: 60,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                  }}
                />
              </Box>
            ))}
          </Box>
          {/* Flecha Derecha */}
          {canGoForward && (
            <IconButton
              onClick={handleNext}
              sx={{
                position: { md: 'absolute', xs: 'fixed' },
                right: { md: 10, xs: 10 },
                top: { xs: '50%', md: 'auto' },
                transform: { xs: 'translateY(-50%)', md: 'none' },
                zIndex: 10,
                background: '#fff',
                boxShadow: 2,
                '&:hover': { background: '#f4f6fa' },
                width: { xs: 40, md: 48 },
                height: { xs: 40, md: 48 },
              }}
              aria-label="Siguiente"
            >
              <ArrowForwardIosIcon sx={{ color: '#18148C', fontSize: { xs: 25, md: 30 } }} />
            </IconButton>
          )}
        </Box>
      </Box>
      {/* Modal para mostrar información completa */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
        aria-labelledby="blog-modal-title"
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            pr: 4,
            color: '#18148C',
            fontWeight: 700,
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            wordBreak: 'break-word',
          }}
        >
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
            {selectedCard?.pdf ? (
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: { xs: '1/1.3', sm: '16/9' },
                  minHeight: { xs: 300, sm: 400, md: 500 },
                  maxHeight: { xs: 400, sm: 600, md: 700 },
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <iframe
                  src={selectedCard.pdf}
                  title={selectedCard.title}
                  width="100%"
                  height="100%"
                  style={{
                    border: 'none',
                    borderRadius: 12,
                    width: '100%',
                    height: '100%',
                    minHeight: 300,
                    background: '#f4f6fa',
                  }}
                />
              </Box>
            ) : (
              <>
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
                <Typography variant="body1" sx={{ color: '#18148C' }}>
                  {selectedCard?.fullContent}
                </Typography>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <BannerNewsletter />
      <BannerCierreTres />
    </div>
  )
}

export default Page