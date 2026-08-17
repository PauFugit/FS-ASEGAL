import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function ServiciosIntro() {
  return (
    <Container maxWidth={false} sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 1, md: 2 } }}>
      <Box
        sx={{
          position: 'relative',
          maxWidth: { xs: 380, sm: 620, md: 950, lg: 1100, xl: 1260 },
          mx: 'auto',
          p: { xs: 3, md: 4 },
          borderRadius: '18px',
          border: '1px solid rgba(24,20,140,0.15)',
          borderLeft: '5px solid #F2AC57',
          bgcolor: 'rgba(24,20,140,0.03)',
          boxShadow: '0 8px 28px rgba(24,20,140,0.08)',
          textAlign: { xs: 'left', md: 'center' },
          overflow: 'hidden',
          '@keyframes sparkleTwinkle': {
            '0%, 100%': { opacity: 0, transform: 'scale(0.5) rotate(0deg)' },
            '50%': { opacity: 1, transform: 'scale(1.15) rotate(20deg)' },
          },
          '@keyframes shineSweepIntro': {
            '0%': { transform: 'translateX(-130%) skewX(-20deg)' },
            '55%, 100%': { transform: 'translateX(230%) skewX(-20deg)' },
          },
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            top: -30,
            right: -30,
            width: 140,
            height: 140,
            borderRadius: '50%',
            bgcolor: 'rgba(242,172,87,0.10)',
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            bottom: -40,
            left: -20,
            width: 100,
            height: 100,
            borderRadius: '50%',
            bgcolor: 'rgba(24,20,140,0.06)',
          }}
        />

        {}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            width: '35%',
            background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.65), transparent)',
            animation: 'shineSweepIntro 6s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        {[
          { top: '12%', left: '8%', size: 20, delay: '0s', dur: '3.2s', color: '#F2AC57' },
          { top: '18%', left: '90%', size: 26, delay: '0.6s', dur: '3.6s', color: '#18148C' },
          { top: '72%', left: '95%', size: 18, delay: '1.4s', dur: '3s', color: '#F2AC57' },
          { top: '80%', left: '6%', size: 22, delay: '2.1s', dur: '3.4s', color: '#18148C' },
          { top: '8%', left: '50%', size: 14, delay: '2.8s', dur: '3.8s', color: '#F2AC57' },
        ].map((s, i) => (
          <Box
            key={i}
            aria-hidden
            sx={{
              position: 'absolute',
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              color: s.color,
              animation: `sparkleTwinkle ${s.dur} ease-in-out ${s.delay} infinite`,
              pointerEvents: 'none',
              filter: 'drop-shadow(0 0 4px rgba(242,172,87,0.5))',
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
              <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
            </svg>
          </Box>
        ))}
        <Typography
          variant="body1"
          sx={{
            position: 'relative',
            zIndex: 2,
            color: '#333',
            lineHeight: 1.9,
            fontSize: { xs: '1rem', md: '1.1rem' },
            fontStyle: 'italic',
            maxWidth: 900,
            mx: 'auto',
          }}
        >
          En Asegal B&amp;F ofrecemos un conjunto de servicios especializados en seguridad alimentaria y cumplimiento
          regulatorio, diseñados para acompañar a tu negocio gastronómico en cada etapa de su desarrollo: desde la
          obtención de tu Resolución Sanitaria, hasta la implementación de Buenas Prácticas de Manipulación,
          auditorías, etiquetado nutricional y capacitación de tu equipo.
        </Typography>
      </Box>
    </Container>
  );
}
