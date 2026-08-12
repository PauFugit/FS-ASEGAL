'use client'
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ESTADOS = {
  aprobada: {
    icon: CheckCircleIcon,
    color: '#2e7d32',
    title: '¡Pago aprobado!',
    message: 'Tu compra fue confirmada exitosamente. Te enviamos un correo con el detalle.',
  },
  rechazada: {
    icon: CancelIcon,
    color: '#d32f2f',
    title: 'Pago rechazado',
    message: 'La transacción no pudo ser procesada. Puedes intentarlo nuevamente o contactarnos.',
  },
  anulada: {
    icon: CancelIcon,
    color: '#d32f2f',
    title: 'Pago cancelado',
    message: 'Cancelaste la transacción antes de completarla.',
  },
  expirada: {
    icon: ScheduleIcon,
    color: '#ed6c02',
    title: 'Tiempo agotado',
    message: 'La sesión de pago expiró. Por favor, intenta nuevamente.',
  },
  error: {
    icon: ErrorOutlineIcon,
    color: '#ed6c02',
    title: 'Ocurrió un problema',
    message: 'No pudimos confirmar el estado de tu pago. Si el monto fue descontado, contáctanos.',
  },
};

function ResultadoContent() {
  const searchParams = useSearchParams();
  const estado = searchParams.get('estado') || 'error';
  const orden = searchParams.get('orden');
  const info = ESTADOS[estado] || ESTADOS.error;
  const Icon = info.icon;

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
      <Icon sx={{ fontSize: 72, color: info.color, mb: 2 }} />
      <Typography variant="h4" sx={{ fontWeight: 700, color: '#18148C', mb: 2 }}>
        {info.title}
      </Typography>
      <Typography variant="body1" sx={{ color: '#333', mb: orden ? 1 : 4 }}>
        {info.message}
      </Typography>
      {orden && (
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
          N° de orden: {orden}
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button component={Link} href="/servicios" variant="outlined" sx={{ textTransform: 'none' }}>
          Volver a servicios
        </Button>
        <Button component={Link} href="/contacto" variant="contained" sx={{ backgroundColor: '#18148C', textTransform: 'none' }}>
          Contactar a Asegal B&F
        </Button>
      </Box>
    </Container>
  );
}

export default function PagoResultadoClient() {
  return (
    <Suspense fallback={null}>
      <ResultadoContent />
    </Suspense>
  );
}
