import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function BannerStatic({ image, text }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 300,
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        src={image}
        alt={text}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          bgcolor: 'rgba(0,44,70,0.95)',
          color: '#fff',
          px: 3,
          py: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 'bold',
            letterSpacing: '0.15em',
            fontSize: '1.1rem',
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

export default BannerStatic;