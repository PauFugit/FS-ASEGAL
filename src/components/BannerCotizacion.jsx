import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function BannerCotizacion() {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#9FBA4790',
        py: { xs: 2, md: 2, xl:3 },
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
            color: '#ffffff',
            fontSize: { xs: 15, md: 16, xl:20 },
            textAlign: { xs: 'center', sm: 'left' },
            fontWeight: 500,
            flex: 1,
          }}
        >
          ¿Estás list@ para dar el siguiente paso?
        </Typography>
        <Button
          href="/cotiza"
          variant="contained"
          sx={{
            backgroundColor: '#1A1773',
            color: '#fff',
            borderRadius: '20px',
            fontWeight: 500,
            fontSize: 15,
            px: 4,
            py: 1,
            boxShadow: '0px 2px 6px 0px #1A177333',
            textTransform: 'none',
            transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
            '&:hover': {
              backgroundColor: '#ffffff',
              color: '#9FBA47',
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