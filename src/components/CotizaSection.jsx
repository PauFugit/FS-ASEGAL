'use client'

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import CotizaForm from './CotizaForm';

const CotizaSection = () => {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#18148C',
        py: { xs: 4, md: 6 },
        px: { xs: 1, sm: 3, md: 6 },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'stretch',
          width: '100%',
          maxWidth: 1100,
          gap: { xs: 4, md: 6 },
        }}
      >
        {/* Imagen a la izquierda */}
        <Box
          sx={{
            flex: 1,
            minWidth: { xs: '100%', md: 350 },
            maxWidth: { md: 420 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: { xs: 2, md: 0 },
          }}
        >
          <Box
            component="img"
            src="/bannerplus1.jpg"
            alt="Cotiza"
            sx={{
              width: 500,
              height: { xs: 220, sm: 280, md: 500 },
              maxWidth: 420,
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
            }}
          />
        </Box>
        {/* Formulario a la derecha */}
        <Box
          sx={{
            flex: 1.2,
            minWidth: { xs: '100%', md: 500 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CotizaForm />
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
              mt: 3,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', gap: 1 }}>
              <PhoneIcon sx={{ fontSize: 22 }} />
              <Typography variant="body1" sx={{ fontWeight: 500, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                +56 9 9492 8092 / +56 9 4232 7704
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', gap: 1 }}>
              <EmailIcon sx={{ fontSize: 22 }} />
              <Typography variant="body1" sx={{ fontWeight: 500, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                contacto@asegalbyfasesorias.cl
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CotizaSection;