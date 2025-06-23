import React from 'react';
import { Box, Typography, Link, IconButton, Stack } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: '#fff', pt: 5, width: '100%', position: 'relative', left: 0, right: 0, marginLeft: 0, marginRight: 0 }}>
      {/* Primera fila: logo, descripción y links */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 2, md: 6 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'flex-start', md: 'flex-start' },
          justifyContent: 'space-between',
          gap: { xs: 3, md: 0 },
        }}
      >
        {/* Logo y descripción */}
        <Box sx={{ flex: 1, minWidth: 220, display: 'flex', alignItems: 'flex-start', gap: 3 }}>
          <Box component="img" src="/logo.png" alt="Asegal B&F" sx={{ height: 100 }} />
          <Typography
            variant="body2"
            sx={{
              color: '#003366',
              fontSize: { xs: '1rem', md: '1.05rem' },
              lineHeight: 1.4,
            }}
          >
            Asesorías para el aseguramiento de calidad para empresas gastronómicas, expertas en garantizar la seguridad alimentaria y el cumplimiento regulatorio.<br />
            <Box component="span" sx={{ fontWeight: 700 }}>
              Impulsa tu negocio al siguiente nivel, asesórate con Asegal B&F.
            </Box>
          </Typography>
        </Box>

        {/* Links */}
        <Box
          sx={{
            flex: 1,
            minWidth: 180,
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-start', md: 'flex-end' },
            mt: { xs: 2, md: 0 },
            gap: 0.5,
          }}
        >
          <Link
            href="/nosotras"
            underline="none"
            sx={{
              color: '#003366',
              fontWeight: 700,
              fontSize: '1.05rem',
              mb: 0.5,
              fontFamily: 'inherit',
            }}
          >
            Sobre Asegal B&F
          </Link>
          <Link href="/misionyvision" underline="none" sx={{ color: '#003366', fontWeight: 500, fontStyle: 'italic', mb: 0.5 }}>
            Misión y Visión
          </Link>
          <Link href="/politicasdeprivacidad" underline="none" sx={{ color: '#003366', fontWeight: 500, fontStyle: 'italic', mb: 0.5 }}>
            Políticas de Privacidad
          </Link>
          <Link href="/contacto" underline="none" sx={{ color: '#003366', fontWeight: 700, fontStyle: 'italic', mb: 0.5 }}>
            Contáctanos
          </Link>
          <Link href="/cotiza" underline="none" sx={{ color: '#003366', fontWeight: 700, fontStyle: 'italic' }}>
            Cotiza
          </Link>
        </Box>
      </Box>

      {/* Franja inferior: redes sociales y contacto */}
      <Box
        sx={{
          mt: 5,
          borderTop: '1.5px solid #e1d6fa',
          borderRadius: 20,
          bgcolor: '#fff',
          width: '100%',
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          py: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          boxShadow: '0 2px 8px 0 rgba(80,0,200,0.03)',
        }}
      >
        {/* Redes sociales */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Stack direction="row" spacing={1.5} sx={{ mb: 1 }}>
            <IconButton
              href="#"
              sx={{
                color: '#e4405f',
                width: 40,
                height: 40,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="#"
              sx={{
                color: '#1877f3',
                width: 40,
                height: 40,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="#"
              sx={{
                color: '#ea4335',
                width: 40,
                height: 40,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
              }}
            >
              <EmailIcon />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            sx={{
              color: '#003366',
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: '1rem',
            }}
          >
            Encuéntranos en redes sociales
          </Typography>
        </Box>

        {/* Contacto */}
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            bgcolor: '#fff',
            border: '1.5px solid #e1d6fa',
            borderRadius: 20,
            px: 2.5,
            py: 1,
            minWidth: 260,
            justifyContent: 'center',
          }}
        >
          <PhoneIcon sx={{ color: '#003366', fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: '#003366', fontWeight: 500 }}>
            +56 9 9492 8092
          </Typography>
          <EmailIcon sx={{ color: '#003366', fontSize: 20, ml: 2 }} />
          <Typography variant="body2" sx={{ color: '#003366', fontWeight: 500 }}>
            contacto@asegalbyfasesorias.cl
          </Typography>
        </Stack>
      </Box>

      {/* Copyright */}
      <Typography
        variant="body2"
        align="center"
        sx={{
          mt: 3,
          color: '#003366',
          fontStyle: 'italic',
          fontWeight: 500,
          fontSize: '1rem',
        }}
      >
        {currentYear} © Asegal B&F Asesorías - Todos los Derechos Reservados
      </Typography>
    </Box>
  );
}

export default Footer;