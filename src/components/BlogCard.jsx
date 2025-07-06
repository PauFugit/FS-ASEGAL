'use client'

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Image from 'next/image';
import Typography from '@mui/material/Typography';

function BlogCard({ image, title, description }) {
  // Función para normalizar la ruta de la imagen
  const normalizeImagePath = (img) => {
    // Si no hay imagen, retornar una por defecto
    if (!img) return '/default-blog-image.jpg';
    
    // Si ya es una ruta absoluta (comienza con /) o URL completa, usarla tal cual
    if (img.startsWith('/') || img.startsWith('http')) {
      return img;
    }
    
    // Si es un nombre de archivo sin ruta, agregar / al inicio
    return `/${img}`;
  };

  const imageSrc = normalizeImagePath(image);
  const [imageError, setImageError] = React.useState(false);

  return (
    <Card
      sx={{
        width: 300,
        bgcolor: '#e3f2fd',
        boxShadow: 3,
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 370,
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: 140 }}>
        <Image
          src={imageError ? '/default-blog-image.jpg' : imageSrc}
          alt={title || 'Imagen del blog'}
          fill
          style={{
            objectFit: 'cover',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
          sizes="(max-width: 768px) 100vw, 300px"
          onError={() => setImageError(true)}
        />
      </div>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#18148C', fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: '#1565c0' }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BlogCard;