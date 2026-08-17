'use client'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LockIcon from '@mui/icons-material/Lock';

const PROVIDERS = {
  webpay: {
    label: 'Webpay Plus',
    sublabel: 'Tarjetas de crédito y débito',
    endpoint: '/api/pago/webpay/iniciar',
    icon: CreditCardIcon,
    accent: '#18148C',
  },
  mercadopago: {
    label: 'Mercado Pago',
    sublabel: 'Tarjetas, cuotas y saldo en cuenta',
    endpoint: '/api/pago/mercadopago/iniciar',
    icon: AccountBalanceWalletIcon,
    accent: '#F2AC57',
  },
};

export default function BotonComprarServicio({ serviceId, serviceName, serviceDescription, priceAmount }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [provider, setProvider] = useState('webpay');
  const [buyer, setBuyer] = useState({ name: '', email: '', phone: '' });

  const formatCLP = (amount) => amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  const handleClose = () => {
    if (loading) return;
    setOpen(false);
    setError('');
  };

  const handleComprar = async () => {
    if (!buyer.name.trim() || !buyer.email.trim()) {
      setError('Nombre y correo son requeridos');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch(PROVIDERS[provider].endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          buyerName: buyer.name,
          buyerEmail: buyer.email,
          buyerPhone: buyer.phone,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'No se pudo iniciar el pago');
        setLoading(false);
        return;
      }

      if (provider === 'webpay') {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.url;
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = 'token_ws';
        input.value = data.token;
        form.appendChild(input);
        document.body.appendChild(form);
        form.submit();
      } else {
        window.location.href = data.url;
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        startIcon={<ShoppingCartIcon />}
        sx={{
          backgroundColor: '#18148C',
          color: 'white',
          borderRadius: '24px',
          px: 4,
          py: 1.2,
          fontWeight: 600,
          textTransform: 'none',
          '&:hover': { backgroundColor: '#0f0c5e' },
        }}
      >
        Comprar ahora
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '22px',
            overflow: 'hidden',
            border: '1px solid rgba(24,20,140,0.12)',
            position: 'relative',
            '@keyframes sparkleFloat': {
              '0%, 100%': { opacity: 0, transform: 'scale(0.6) rotate(0deg)' },
              '15%': { opacity: 1, transform: 'scale(1) rotate(10deg)' },
              '35%': { opacity: 0, transform: 'scale(0.6) rotate(20deg)' },
            },
          },
        }}
      >
        {[
          { top: '6%', left: '90%', size: 16, delay: '0s', dur: '4s' },
          { top: '38%', left: '4%', size: 12, delay: '1.4s', dur: '4.5s' },
          { top: '68%', left: '93%', size: 10, delay: '2.6s', dur: '5s' },
          { top: '85%', left: '10%', size: 14, delay: '0.8s', dur: '4.2s' },
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
              color: '#F2AC57',
              animation: `sparkleFloat ${s.dur} ease-in-out ${s.delay} infinite`,
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
              <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
            </svg>
          </Box>
        ))}

        {}
        <Box
          sx={{
            bgcolor: '#fff',
            borderBottom: '2px solid #18148C',
            px: 3,
            pt: 3,
            pb: 2.5,
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: 76,
              height: 76,
              borderRadius: '50%',
              border: '2px solid #18148C',
              bgcolor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 1.5,
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Asegal B&F"
              sx={{ width: '68%', height: '68%', objectFit: 'contain' }}
            />
          </Box>
          <Typography sx={{ color: '#18148C', fontWeight: 700, fontSize: '1.05rem' }}>
            Estás realizando un pago a Asegal B&F
          </Typography>
        </Box>

        <DialogContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Box
            sx={{
              borderRadius: '16px',
              border: '1px solid rgba(24,20,140,0.12)',
              bgcolor: '#F7F7FB',
              p: 2.2,
              mb: 3,
            }}
          >
            <Typography sx={{ color: '#18148C', fontWeight: 700, fontSize: '1.05rem', mb: 0.5 }}>
              {serviceName}
            </Typography>
            <Typography
              sx={{
                color: '#F2AC57',
                fontWeight: 800,
                fontSize: '1.6rem',
                lineHeight: 1.2,
                mb: serviceDescription ? 1 : 0,
              }}
            >
              {formatCLP(priceAmount)}
            </Typography>
            {serviceDescription && (
              <Typography sx={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.6 }}>
                {serviceDescription}
              </Typography>
            )}
          </Box>

          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: '10px' }}>{error}</Alert>}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nombre completo *"
              value={buyer.name}
              onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
              fullWidth
              required
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            />
            <TextField
              label="Correo electrónico *"
              type="email"
              value={buyer.email}
              onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
              fullWidth
              required
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            />
            <TextField
              label="Teléfono"
              value={buyer.phone}
              onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
              fullWidth
              size="small"
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
            />
          </Box>

          <Typography sx={{ mt: 3, mb: 1.5, fontWeight: 700, color: '#18148C', fontSize: '0.95rem' }}>
            Selecciona el medio de pago
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {Object.entries(PROVIDERS).map(([key, p]) => {
              const Icon = p.icon;
              const selected = provider === key;
              return (
                <Box
                  key={key}
                  onClick={() => setProvider(key)}
                  role="radio"
                  aria-checked={selected}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.6,
                    borderRadius: '14px',
                    border: selected ? `2px solid ${p.accent}` : '1px solid rgba(0,0,0,0.12)',
                    bgcolor: selected ? `${p.accent}0F` : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': { borderColor: p.accent },
                  }}
                >
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `2px solid ${selected ? p.accent : 'rgba(0,0,0,0.25)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {selected && (
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: p.accent }} />
                    )}
                  </Box>
                  <Box
                    sx={{
                      width: 38,
                      height: 38,
                      borderRadius: '10px',
                      bgcolor: `${p.accent}1A`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon sx={{ color: p.accent, fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#222' }}>
                      {p.label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.75rem', color: '#666' }}>
                      {p.sublabel}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, mt: 3 }}>
            <Button
              onClick={handleClose}
              disabled={loading}
              fullWidth
              sx={{
                borderRadius: '24px',
                border: '1.5px solid rgba(24,20,140,0.3)',
                color: '#18148C',
                textTransform: 'none',
                fontWeight: 600,
                py: 1.1,
                '&:hover': { borderColor: '#18148C', bgcolor: 'rgba(24,20,140,0.05)' },
              }}
            >
              Volver
            </Button>
            <Button
              onClick={handleComprar}
              disabled={loading}
              fullWidth
              variant="contained"
              sx={{
                borderRadius: '24px',
                textTransform: 'none',
                fontWeight: 700,
                py: 1.1,
                backgroundColor: '#F2AC57',
                boxShadow: '0px 4px 14px rgba(242,172,87,0.4)',
                '&:hover': { backgroundColor: '#d9903f' },
              }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Pagar'}
            </Button>
          </Box>

          <Divider sx={{ my: 2.5 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, justifyContent: 'center' }}>
            <LockIcon sx={{ fontSize: 14, color: '#888' }} />
            <Typography sx={{ fontSize: '0.72rem', color: '#888', textAlign: 'center' }}>
              Pago seguro procesado por {PROVIDERS[provider].label}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
