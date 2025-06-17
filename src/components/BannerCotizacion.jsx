import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function BannerCotizacion() {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#FFED9C',
        py: { xs: 2, md: 2 },
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
            color: '#15355B',
            fontSize: { xs: 15, md: 16 },
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
            backgroundColor: '#15355B',
            color: '#fff',
            borderRadius: '20px',
            fontWeight: 500,
            fontSize: 15,
            px: 4,
            py: 1,
            boxShadow: '0px 2px 6px 0px #15355B33',
            textTransform: 'none',
            transition: 'all 0.2s cubic-bezier(.4,2,.6,1)',
            '&:hover': {
              backgroundColor: '#1a437a',
              color: '#fff',
              transform: 'scale(1.04)',
              boxShadow: '0px 4px 12px 0px #15355B44',
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