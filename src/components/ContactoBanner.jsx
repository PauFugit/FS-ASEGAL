import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function ContactoBanner() {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#003366',
        py: { xs: 3, md: 3 },
        px: { xs: 2, md: 0 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: '#fff',
            fontSize: { xs: 16, md: 18 },
            textAlign: { xs: 'center', sm: 'left' },
            flex: 1,
          }}
        >
          ¿Estás listo para empezar? ¡Estamos aquí para ayudarte!
        </Typography>
        <Button
          href="/contacto"
          variant="contained"
          sx={{
            backgroundColor: '#FFC800',
            color: '#003366',
            borderRadius: '24px',
            fontWeight: 500,
            fontStyle: 'italic',
            fontSize: 16,
            px: 4,
            py: 1.2,
            boxShadow: '0px 2px 8px 0px #00000022',
            textTransform: 'none',
            transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
            '&:hover': {
              backgroundColor: '#FFD740',
              color: '#003366',
              transform: 'scale(1.05)',
              boxShadow: '0px 4px 16px 0px #FFC80044',
            },
          }}
        >
          Contáctanos ahora
        </Button>
      </Box>
    </Box>
  );
}

export default ContactoBanner;