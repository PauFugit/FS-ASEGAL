'use client';

import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Search as SearchIcon,
  ReceiptLong as OrderIcon,
  AttachMoney as PriceIcon,
  CalendarToday as DateIcon
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

const STATUS_COLOR = {
  INICIADA: 'default',
  AUTORIZADA: 'success',
  RECHAZADA: 'error',
  ANULADA: 'error',
  EXPIRADA: 'warning',
};

export default function OrdenesPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('TODOS');
  const [providerFilter, setProviderFilter] = useState('TODOS');

  useEffect(() => {
    fetch('/api/ordenes')
      .then((res) => res.json())
      .then(({ data }) => setOrders(data || []))
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.buyOrder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'TODOS' || order.status === statusFilter;
    const matchesProvider = providerFilter === 'TODOS' || order.provider === providerFilter;
    return matchesSearch && matchesStatus && matchesProvider;
  });

  const PROVIDER_LABEL = { WEBPAY: 'Webpay Plus', MERCADOPAGO: 'Mercado Pago' };

  const formatCLP = (amount) => amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>Órdenes de Compra</Typography>

      <Paper sx={{ mb: 3, p: 2, borderRadius: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por orden, servicio o comprador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            sx: { borderRadius: 2 }
          }}
          sx={{ flex: 2, minWidth: 240 }}
        />
        <FormControl sx={{ flex: 1, minWidth: 180 }}>
          <InputLabel>Estado</InputLabel>
          <Select
            value={statusFilter}
            label="Estado"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="TODOS">Todos</MenuItem>
            <MenuItem value="INICIADA">Iniciada</MenuItem>
            <MenuItem value="AUTORIZADA">Autorizada</MenuItem>
            <MenuItem value="RECHAZADA">Rechazada</MenuItem>
            <MenuItem value="ANULADA">Anulada</MenuItem>
            <MenuItem value="EXPIRADA">Expirada</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ flex: 1, minWidth: 180 }}>
          <InputLabel>Proveedor</InputLabel>
          <Select
            value={providerFilter}
            label="Proveedor"
            onChange={(e) => setProviderFilter(e.target.value)}
          >
            <MenuItem value="TODOS">Todos</MenuItem>
            <MenuItem value="WEBPAY">Webpay Plus</MenuItem>
            <MenuItem value="MERCADOPAGO">Mercado Pago</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: 2, overflowX: 'auto' }}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead sx={{ backgroundColor: 'grey.100' }}>
            <TableRow>
              <TableCell>Orden</TableCell>
              <TableCell>Servicio</TableCell>
              <TableCell>Proveedor</TableCell>
              <TableCell>Comprador</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <OrderIcon color="primary" fontSize="small" />
                      <Typography variant="body2">{order.buyOrder}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{order.serviceName}</TableCell>
                  <TableCell>
                    <Chip
                      label={PROVIDER_LABEL[order.provider] || order.provider}
                      size="small"
                      variant="outlined"
                      color={order.provider === 'MERCADOPAGO' ? 'info' : 'primary'}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{order.buyerName}</Typography>
                    <Typography variant="caption" color="text.secondary">{order.buyerEmail}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PriceIcon fontSize="small" color="action" />
                      {formatCLP(order.amount)}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <DateIcon fontSize="small" color="action" />
                      {new Date(order.createdAt).toLocaleDateString('es-CL')}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      size="small"
                      color={STATUS_COLOR[order.status] || 'default'}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={filteredOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>
    </Box>
  );
}
