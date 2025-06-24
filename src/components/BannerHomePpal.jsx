import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const BannerHomePpal = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: { xs: '2rem 1rem', md: '3rem' },
        borderRadius: '8px',
        marginBottom: '2rem',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '300px'
      }}
    >
      {/* Left bubbles */}
      <Box
        sx={{
          position: 'absolute',
          left: '-50px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          display: { xs: 'none', md: 'block' }
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '-30px',
          top: '30%',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: 'rgba(25, 118, 210, 0.08)',
          display: { xs: 'none', md: 'block' }
        }}
      />

      {/* Content */}
      <Box
        sx={{
          flex: 1,
          zIndex: 1,
          padding: { xs: '0', md: '0 2rem' }
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '2rem', md: '2.5rem' },
            marginBottom: '1rem',
            color: '#18148C',
          }}
        >
          EMPRENDE
          <br />
          CON SEGURIDAD
        </Typography>
        
        <Typography
          variant="h5"
          component="p"
          sx={{
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            marginBottom: '2rem',
            color: '#0B5B8C',
            maxWidth: '500px'
          }}
        >
          Impulsamos tu negocio en base a los más altos estándares de calidad
        </Typography>
        
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
        >
          <Button
            variant="contained"
            href="/nosotras" 
            sx={{
              backgroundColor: '#18148C',
              padding: '0.5rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#F26A1B',
              },
            }}
          >
            Conoce más
          </Button>
          
          <Button
            variant="outlined"
            href="/servicios" 
            sx={{
              borderColor: '#f2AC57',
              color: '#f2AC57',
              padding: '0.5rem 2rem',
              fontSize: '1rem',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                borderColor: '#18148C',
                color: '#18148C',
              },
            }}
          >
            Descubre nuestros servicios
          </Button>
        </Stack>
      </Box>

      {/* Right bubbles */}
      <Box
        sx={{
          position: 'absolute',
          right: '-80px',
          top: '20%',
          width: '250px',
          height: '250px',
          borderRadius: '50%',
          backgroundColor: 'rgba(25, 118, 210, 0.1)',
          display: { xs: 'none', md: 'block' }
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          right: '-40px',
          bottom: '20%',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          backgroundColor: 'rgba(25, 118, 210, 0.08)',
          display: { xs: 'none', md: 'block' }
        }}
      />
    </Box>
  );
};

export default BannerHomePpal;