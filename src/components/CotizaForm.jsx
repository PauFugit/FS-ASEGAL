'use client';
import React, { useState } from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';

function CotizaForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/cotizacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        alert('¡Solicitud de cotización enviada con éxito!');
        setFormData({
          name: '',
          lastname: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        });
      } else {
        alert(result.error || 'Error al enviar la cotización');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('No se pudo enviar la cotización. Intenta nuevamente.');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        bgcolor: '#f6fbff',
        borderRadius: 0,
        p: { xs: 2, sm: 3 },
        maxWidth: 600,
        width: '100%',
        mx: 'auto',
        boxShadow: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography
        sx={{
          color: '#18148C',
          fontWeight: 500,
          fontSize: 15,
          mb: 1,
        }}
      >
        Completa el formulario y te contestaremos dentro de las próximas 12 horas
      </Typography>

      <TextField
        fullWidth
        placeholder="Tu Nombre"
        variant="filled"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        sx={{
          bgcolor: '#fff',
          borderRadius: 3,
          mb: 1,
          '& .MuiFilledInput-root': {
            borderRadius: 3,
            background: '#fff',
            boxShadow: '0 1px 4px #0001',
          },
        }}
        InputProps={{ disableUnderline: true }}
        required
      />

      <TextField
        fullWidth
        placeholder="Tu Apellido"
        variant="filled"
        value={formData.lastname}
        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
        sx={{
          bgcolor: '#fff',
          borderRadius: 3,
          mb: 1,
          '& .MuiFilledInput-root': {
            borderRadius: 3,
            background: '#fff',
            boxShadow: '0 1px 4px #0001',
          },
        }}
        InputProps={{ disableUnderline: true }}
        required
      />

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 1,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <TextField
          fullWidth
          placeholder="Tu correo electrónico"
          variant="filled"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          sx={{
            bgcolor: '#fff',
            borderRadius: 3,
            '& .MuiFilledInput-root': {
              borderRadius: 3,
              background: '#fff',
              boxShadow: '0 1px 4px #0001',
            },
          }}
          InputProps={{ disableUnderline: true }}
          required
        />
        <TextField
          fullWidth
          placeholder="Tu teléfono de contacto"
          variant="filled"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          sx={{
            bgcolor: '#fff',
            borderRadius: 3,
            '& .MuiFilledInput-root': {
              borderRadius: 3,
              background: '#fff',
              boxShadow: '0 1px 4px #0001',
            },
          }}
          InputProps={{ disableUnderline: true }}
        />
      </Box>

      <TextField
        select
        fullWidth
        value={formData.service}
        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
        placeholder="Selecciona el servicio que deseas cotizar"
        variant="filled"
        sx={{
          bgcolor: '#fff',
          borderRadius: 3,
          mb: 1,
          '& .MuiFilledInput-root': {
            borderRadius: 3,
            background: '#fff',
            boxShadow: '0 1px 4px #0001',
          },
        }}
        InputProps={{ disableUnderline: true }}
        required
      >
        <MenuItem value="" disabled>
          Selecciona el servicio que deseas cotizar
        </MenuItem>
        <MenuItem value="Tramitación resolución sanitaria">1. Tramitación resolución sanitaria</MenuItem>
        <MenuItem value="Auditorias">2. Auditorias</MenuItem>
        <MenuItem value="Sistemas de gestión de calidad">3. Sistemas de gestión de calidad</MenuItem>
        <MenuItem value="Capacitaciones">4. Capacitaciones</MenuItem>
        <MenuItem value="Etiquetado nutricional">5. Etiquetado nutricional</MenuItem>
      </TextField>

      <TextField
        fullWidth
        multiline
        minRows={4}
        placeholder="Tu mensaje aquí"
        variant="filled"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        sx={{
          bgcolor: '#fff',
          borderRadius: 3,
          mb: 1,
          '& .MuiFilledInput-root': {
            borderRadius: 3,
            background: '#fff',
            boxShadow: '0 1px 4px #0001',
          },
        }}
        InputProps={{ disableUnderline: true }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          bgcolor: '#18148C',
          color: '#fff',
          borderRadius: '20px',
          fontWeight: 600,
          fontStyle: 'italic',
          fontSize: 18,
          mt: 1,
          py: 1,
          boxShadow: '0px 2px 8px 0px #1A177322',
          textTransform: 'none',
          '&:hover': {
            bgcolor: '#F2AC57',
            color: '#fff',
          },
        }}
      >
        Cotiza
      </Button>
    </Box>
  );
}

export default CotizaForm;