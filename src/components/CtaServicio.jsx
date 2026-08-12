'use client'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

const WHATSAPP_NUMBER = '+56994928092';

export default function CtaServicio({ serviceName }) {
  const whatsappMessage = `Hola, quiero cotizar el servicio "${serviceName}"`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
  const cotizaUrl = `/cotiza?servicio=${encodeURIComponent(serviceName)}`;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mt: 4,
      }}
    >
      <Button
        variant="contained"
        href={cotizaUrl}
        startIcon={<RequestQuoteIcon />}
        sx={{
          backgroundColor: '#F2AC57',
          color: 'white',
          borderRadius: '24px',
          px: 4,
          py: 1.2,
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0px 2px 8px 0px #F2AC5722',
          '&:hover': {
            backgroundColor: '#ffffff',
            color: '#F2AC57',
            border: '2px solid #F2AC57',
          },
        }}
      >
        Cotizar servicio
      </Button>
      <Button
        variant="contained"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        startIcon={<WhatsAppIcon />}
        sx={{
          backgroundColor: '#25D366',
          color: 'white',
          borderRadius: '24px',
          px: 4,
          py: 1.2,
          fontWeight: 600,
          textTransform: 'none',
          '&:hover': { backgroundColor: '#128C7E' },
        }}
      >
        Consultar por WhatsApp
      </Button>
    </Box>
  );
}
