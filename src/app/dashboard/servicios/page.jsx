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
  Button,
  IconButton,
  Chip,
  Avatar
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  DesignServices as ServiceIcon,
  AttachMoney as PriceIcon,
  Star as FeaturedIcon
} from '@mui/icons-material';
import { useState } from 'react';

const services = [
  { id: 1, name: 'Auditoría de Calidad', price: 1200, duration: '2 semanas', featured: true, status: 'activo' },
  { id: 2, name: 'Consultoría QA', price: 800, duration: '1 semana', featured: false, status: 'activo' },
  { id: 3, name: 'Automation Testing', price: 1500, duration: '3 semanas', featured: true, status: 'inactivo' },
  { id: 4, name: 'Training en Testing', price: 2000, duration: '4 semanas', featured: false, status: 'activo' },
];

export default function ServicesPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Gestión de Servicios</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Nuevo Servicio
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2, borderRadius: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar servicios..."
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
        />
      </Paper>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'grey.100' }}>
            <TableRow>
              <TableCell>Servicio</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Duración</TableCell>
              <TableCell>Destacado</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredServices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <ServiceIcon color="primary" />
                      <Typography>{service.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PriceIcon fontSize="small" color="action" />
                      <Typography>${service.price}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell>
                    {service.featured ? (
                      <FeaturedIcon color="warning" />
                    ) : (
                      <FeaturedIcon color="disabled" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={service.status} 
                      size="small"
                      color={service.status === 'activo' ? 'success' : 'error'}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredServices.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}