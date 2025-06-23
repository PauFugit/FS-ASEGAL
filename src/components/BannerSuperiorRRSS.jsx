import React from 'react';
import { Box, Typography, Stack, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';

function BannerSuperiorRRSS() {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#1A1773',
        minHeight: 34,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 1.5, md: 3 },
      }}
    >
      {/* Redes sociales a la izquierda */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Link href="https://www.instagram.com/asegalbf" target="_blank" rel="noopener" sx={{ color: '#fff', fontSize: 20 }}>
          <InstagramIcon fontSize="small" />
        </Link>
        <Link href="https://facebook.com" target="_blank" rel="noopener" sx={{ color: '#fff', fontSize: 20 }}>
          <FacebookIcon fontSize="small" />
        </Link>
        <Link href="mailto:correo@ejemplo.com" sx={{ color: '#fff', fontSize: 20 }}>
          <EmailIcon fontSize="small" />
        </Link>
      </Stack>

      {/* Textos a la derecha */}
      <Stack direction="row" spacing={4} alignItems="center">
        <Typography
          variant="caption"
          sx={{
            color: '#fff',
            fontSize: 13,
            letterSpacing: 0.2,
            fontWeight: 400,
            textTransform: 'uppercase',
          }}
        >
          ATENCIÓN <b>PRESENCIAL I Y II REGIÓN</b>
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: '#fff',
            fontSize: 13,
            letterSpacing: 0.2,
            fontWeight: 400,
            textTransform: 'uppercase',
          }}
        >
          ATENCIÓN ONLINE EN TODO CHILE
        </Typography>
      </Stack>
    </Box>
  );
}

export default BannerSuperiorRRSS;