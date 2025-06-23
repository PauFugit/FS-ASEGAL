import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function ContactoSection() {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: '#e6f6fd',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Fondo dividido */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: { xs: '100%', md: '30%' }, // Azul 30%
          height: '100%',
          bgcolor: '#1a1773',
          zIndex: 0,
          transition: 'width 0.3s',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: { xs: '100%', md: '70%' }, // Celeste 70%
          height: '100%',
          bgcolor: '#e6f6fd',
          zIndex: 0,
        }}
      />
      {/* Contenido principal */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '80vh',
          width: '100%',
          gap: { xs: 4, md: 8 },
          px: { xs: 2, md: 8 },
        }}
      >
        {/* Formulario grande y centrado */}
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: 2,
            boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
            border: '1.5px solid #9FBA47',
            p: { xs: 3, sm: 4, md: 6 },
            minWidth: { xs: '95%', sm: 400, md: 480 },
            maxWidth: { xs: '98%', sm: 540, md: 600 },
            width: { xs: '100%', md: '600px' },
            mx: 'auto',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: '#D28251',
              fontWeight: 500,
              mb: 1,
              fontStyle: 'italic',
              fontSize: '1.1rem',
            }}
          >
            ¿Tienes preguntas?
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: '#1a1773',
              fontWeight: 700,
              mb: 3,
              fontStyle: 'italic',
              fontSize: { xs: '2rem', sm: '2.3rem' },
            }}
          >
            Envíanos un mensaje
          </Typography>
          <TextField
            fullWidth
            placeholder="Tu Nombre"
            variant="filled"
            sx={{
              mb: 2,
              bgcolor: '#ededed',
              borderRadius: 1,
              boxShadow: 1,
              input: { fontStyle: 'italic' },
            }}
            InputProps={{ disableUnderline: true }}
          />
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              placeholder="Tu correo electrónico"
              variant="filled"
              sx={{
                bgcolor: '#ededed',
                borderRadius: 1,
                boxShadow: 1,
                input: { fontStyle: 'italic' },
              }}
              InputProps={{ disableUnderline: true }}
            />
            <TextField
              fullWidth
              placeholder="Tu teléfono de contacto"
              variant="filled"
              sx={{
                bgcolor: '#ededed',
                borderRadius: 1,
                boxShadow: 1,
                input: { fontStyle: 'italic' },
              }}
              InputProps={{ disableUnderline: true }}
            />
          </Box>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="Tu mensaje aquí"
            variant="filled"
            sx={{
              mb: 3,
              bgcolor: '#ededed',
              borderRadius: 1,
              boxShadow: 1,
              input: { fontStyle: 'italic' },
            }}
            InputProps={{ disableUnderline: true }}
          />
          <Button
            fullWidth
            sx={{
              bgcolor: '#D28251',
              color: '#fff',
              fontWeight: 600,
              borderRadius: 5,
              boxShadow: 2,
              fontSize: '1.2rem',
              textTransform: 'none',
              py: 1,
              '&:hover': { bgcolor: '#9FBA47' },
              fontStyle: 'italic',
            }}
          >
            Enviar
          </Button>
        </Box>
        {/* Imagen a la derecha */}
        <Box
          sx={{
            mt: { xs: 4, md: 0 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              width: { xs: 240, sm: 320, md: 440 },
              height: { xs: 240, sm: 320, md: 440 },
              border: '3px solid #9FBA47',
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: '#fff',
              boxShadow: 4,
            }}
          >
            <img
              src="/cuadrouno.jpg"
              alt="Contacto"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </Box>
        </Box>
      </Box>
      {/* Barra inferior de contacto */}
      <Box
        sx={{
          backgroundColor: '#1a1773',
          p: 2,
          pr: { xs: 2, md: 6 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: { xs: 'center', md: 'flex-end' },
          alignItems: 'center',
          gap: 2,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: { xs: 0, md: 40 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', color: '#fff', gap: 1, mb: { xs: 1, sm: 0 } }}>
          <PhoneIcon sx={{ fontSize: 22 }} />
          <Typography variant="body1" sx={{ fontWeight: 500, fontSize: { xs: '1rem', sm: '1.1rem' } }}>
            +56 9 9492 8092
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
  );
}

export default ContactoSection;