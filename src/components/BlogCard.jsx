import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Box from '@mui/material/Box';

function BlogCard({ image, title, description }) {
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
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{
          objectFit: 'cover', width: '100%',
          height: 140, // <-- Aquí puedes cambiar el valor
          objectFit: 'cover',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          transition: 'filter 0.2s',
          padding: 2,
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ color: '#1565c0', fontWeight: 500 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ color: '#1565c0' }}>
          {description}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <IconButton
          sx={{
            bgcolor: '#00325a',
            color: '#fff',
            '&:hover': { bgcolor: '#1565c0' },
            boxShadow: 2,
          }}
        >
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    </Card>
  );
}

export default BlogCard;