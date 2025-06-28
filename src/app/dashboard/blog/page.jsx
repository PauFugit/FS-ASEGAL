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
  Article as PostIcon,
  Visibility as ViewIcon,
  CalendarToday as DateIcon
} from '@mui/icons-material';
import { useState } from 'react';

const posts = [
  { id: 1, title: 'Introducción al QA Testing', author: 'Juan Pérez', date: '2023-10-15', views: 1245, status: 'publicado' },
  { id: 2, title: 'Mejores prácticas en Automation', author: 'María García', date: '2023-11-05', views: 892, status: 'publicado' },
  { id: 3, title: 'Seguridad en aplicaciones web', author: 'Carlos López', date: '2023-09-20', views: 1567, status: 'borrador' },
  { id: 4, title: 'Nuevas tendencias en testing', author: 'Ana Martínez', date: '2023-12-01', views: 432, status: 'programado' },
];

export default function BlogPage() {
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

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'publicado': return 'success';
      case 'borrador': return 'warning';
      case 'programado': return 'info';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Gestión del Blog</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Nueva Entrada
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2, borderRadius: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar entradas..."
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
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Vistas</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPosts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <PostIcon color="primary" />
                      <Typography>{post.title}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DateIcon fontSize="small" color="action" />
                      <Typography>{new Date(post.date).toLocaleDateString()}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{post.views}</TableCell>
                  <TableCell>
                    <Chip 
                      label={post.status} 
                      size="small"
                      color={getStatusColor(post.status)}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
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
          count={filteredPosts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}