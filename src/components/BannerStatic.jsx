import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

function BannerStatic({ image, text, color }) {
  // Normalizar la ruta de la imagen
  const normalizeImagePath = (img) => {
    if (!img) return '/default-banner.jpg';
    if (img.startsWith('/') || img.startsWith('http')) return img;
    return `/${img}`;
  };

  const imageSrc = normalizeImagePath(image);

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 400,
        overflow: 'hidden',
      }}
    >
      <Image
        src={imageSrc}
        alt={text || 'Banner'}
        fill
        style={{
          objectFit: 'cover',
        }}
        quality={80}
        priority
        sizes="100vw"
      />
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          bgcolor: '#18148C',
          color: '#fff',
          px: 3,
          py: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 'bold',
            letterSpacing: '0.25rem',
            fontSize: '1.5rem',
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
}

export default BannerStatic;