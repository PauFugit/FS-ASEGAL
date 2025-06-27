'use client'
import { Box, Fab, Fade, Tooltip, useScrollTrigger } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const FloatingButtons = () => {
  // Configuración WhatsApp
  const phoneNumber = '56912345678';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hola, tengo una consulta')}`;

  // Configuración Scroll to Top
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 300,
  });

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center'
      }}
    >
      {/* Botón de WhatsApp */}
      <Tooltip title="Consultar por WhatsApp" placement="left" arrow>
        <Fab
          color="success"
          aria-label="WhatsApp"
          onClick={() => window.open(whatsappUrl, '_blank')}
          sx={{
            backgroundColor: '#25D366',
            color: 'white',
            '&:hover': { backgroundColor: '#128C7E' }
          }}
        >
          <WhatsAppIcon sx={{ fontSize: 32 }} />
        </Fab>
      </Tooltip>

      {/* Botón Scroll to Top - solo visible al hacer scroll */}
      <Fade in={trigger}>
        <Fab
          size="medium"
          aria-label="subir arriba"
          onClick={handleScrollTop}
          sx={{
            backgroundColor: '#18148C',
            color: 'white',
            '&:hover': { backgroundColor: '#F2AC57' }
          }}
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Fade>
    </Box>
  );
};

export default FloatingButtons;