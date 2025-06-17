'use client'
import { Box, Fab, Tooltip } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsAppButton = () => {
  // Reemplaza con tu número de WhatsApp (elimina espacios, guiones, etc.)
  const phoneNumber = '56994928092'; 
  const message = 'Hola, tengo una consulta sobre sus servicios';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 1000,
      }}
    >
      <Tooltip title="Consultar por WhatsApp" placement="left" arrow>
        <Fab
          color="success"
          aria-label="WhatsApp"
          onClick={() => window.open(whatsappUrl, '_blank')}
          sx={{
            backgroundColor: '#25D366',
            color: 'white',
            '&:hover': {
              backgroundColor: '#128C7E',
              transform: 'scale(1.1)',
              transition: 'all 0.3s ease'
            }
        }}>
          <WhatsAppIcon sx={{ fontSize: 32 }} />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default WhatsAppButton;