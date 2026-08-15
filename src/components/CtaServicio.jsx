'use client'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import DescriptionIcon from '@mui/icons-material/Description';

const WHATSAPP_NUMBER = '+56994928092';

export default function CtaServicio({ serviceName, sx }) {
  const [open, setOpen] = useState(false);

  const whatsappMessage = `Hola, quiero cotizar el servicio "${serviceName}"`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
  const cotizaUrl = `/cotiza?servicio=${encodeURIComponent(serviceName)}`;

  return (
    <Box sx={{ mt: 4, ...sx }}>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
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

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>¿Cómo quieres cotizar?</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
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
                py: 1.2,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#128C7E' },
              }}
            >
              Cotizar por WhatsApp
            </Button>
            <Button
              variant="contained"
              href={cotizaUrl}
              startIcon={<DescriptionIcon />}
              sx={{
                backgroundColor: '#18148C',
                color: 'white',
                borderRadius: '24px',
                py: 1.2,
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': { backgroundColor: '#0f0c5e' },
              }}
            >
              Cotizar por formulario
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
