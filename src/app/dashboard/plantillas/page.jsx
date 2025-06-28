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
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Description as TemplateIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { useState } from 'react';

const templates = [
  { id: 1, name: 'Plantilla de Contrato', category: 'Legal', status: 'publicado', downloads: 245 },
  { id: 2, name: 'Formato de Reporte', category: 'Informes', status: 'borrador', downloads: 89 },
  { id: 3, name: 'Presentación Ejecutiva', category: 'Marketing', status: 'publicado', downloads: 512 },
  { id: 4, name: 'Checklist de Auditoría', category: 'Calidad', status: 'archivado', downloads: 132 },
];

export default function TemplatesPage() {
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

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'publicado': return 'success';
      case 'borrador': return 'warning';
      case 'archivado': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Gestión de Plantillas</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Nueva Plantilla
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2, borderRadius: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar plantillas..."
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
              <TableCell>Nombre</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Descargas</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTemplates
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((template) => (
                <TableRow key={template.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <TemplateIcon color="primary" />
                      <Typography>{template.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{template.category}</TableCell>
                  <TableCell>
                    <Chip 
                      label={template.status} 
                      size="small"
                      color={getStatusColor(template.status)}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>{template.downloads}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary">
                      <ViewIcon fontSize="small" />
                    </IconButton>
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
          count={filteredTemplates.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}