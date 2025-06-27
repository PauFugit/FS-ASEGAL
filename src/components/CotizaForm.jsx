import React from 'react';
import { Box, Typography, TextField, Button, MenuItem } from '@mui/material';

function CotizaForm() {
  const [service, setService] = React.useState('');

  return (
    <Box
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
        <TextField
          fullWidth
          placeholder="Tu teléfono de contacto"
          variant="filled"
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
        value={service}
        onChange={e => setService(e.target.value)}
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
      >
        <MenuItem value="" disabled >
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