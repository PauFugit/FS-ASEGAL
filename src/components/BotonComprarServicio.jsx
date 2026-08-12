'use client'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const PROVIDERS = {
  webpay: { label: 'Webpay Plus', endpoint: '/api/pago/webpay/iniciar' },
  mercadopago: { label: 'Mercado Pago', endpoint: '/api/pago/mercadopago/iniciar' },
};

export default function BotonComprarServicio({ serviceId, serviceName, priceAmount }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [provider, setProvider] = useState('webpay');
  const [buyer, setBuyer] = useState({ name: '', email: '', phone: '' });

  const formatCLP = (amount) => amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

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

      <Dialog open={open} onClose={() => !loading && setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Comprar {serviceName}</DialogTitle>
        <DialogContent>
          <Typography variant="h6" sx={{ color: '#18148C', fontWeight: 700, mb: 2 }}>
            {formatCLP(priceAmount)}
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" gutterBottom>Método de pago</Typography>
              <ToggleButtonGroup
                value={provider}
                exclusive
                onChange={(e, value) => value && setProvider(value)}
                fullWidth
                size="small"
              >
                <ToggleButton value="webpay">Webpay Plus</ToggleButton>
                <ToggleButton value="mercadopago">Mercado Pago</ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <TextField
              label="Nombre completo *"
              value={buyer.name}
              onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Correo electrónico *"
              type="email"
              value={buyer.email}
              onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Teléfono"
              value={buyer.phone}
              onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} disabled={loading}>Cancelar</Button>
          <Button onClick={handleComprar} variant="contained" disabled={loading}>
            {loading ? 'Redirigiendo...' : `Pagar con ${PROVIDERS[provider].label}`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
