import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function BannerCotizacion() {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#0B5B8C90',
        py: { xs: 2, sm: 2, md: 2, xl: 3 },
        px: { xs: 2, sm: 3, md: 4 },
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
          gap: { xs: 1.5, sm: 2, md: 3 },
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: '#ffffff',
            fontSize: { xs: '0.9375rem', sm: '1rem', md: '1rem', xl: '1.25rem' },
            textAlign: { xs: 'center', sm: 'left' },
            fontWeight: 500,
            flex: 1,
            px: { xs: 1, sm: 0 },
            lineHeight: 1.4,
          }}
        >
          ¿Estás listo/a para dar el siguiente paso?
        </Typography>
        <Button
          href="/cotiza"
          variant="contained"
          sx={{
            backgroundColor: '#1A1773',
            color: '#fff',
            borderRadius: '20px',
            fontWeight: 500,
            fontSize: { xs: '0.875rem', sm: '0.9375rem', md: '0.9375rem' },
            px: { xs: 3, sm: 4 },
            py: { xs: 0.75, sm: 1 },
            boxShadow: '0px 2px 6px 0px #1A177333',
            textTransform: 'none',
            transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
            whiteSpace: 'nowrap',
            minWidth: { xs: '180px', sm: 'auto' },
            '&:hover': {
              backgroundColor: '#ffffff',
              color: '#F2AC57',
              transform: 'scale(1.04)',
              boxShadow: '0px 4px 12px 0px #1A177344',
            },
          }}
        >
          SOLICITA TU COTIZACIÓN
        </Button>
      </Box>
    </Box>
  );
}

export default BannerCotizacion;