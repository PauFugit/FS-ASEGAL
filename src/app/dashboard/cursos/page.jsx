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
  School as CourseIcon,
  Event as CalendarIcon,
  People as StudentsIcon
} from '@mui/icons-material';
import { useState } from 'react';

const courses = [
  { id: 1, title: 'Introducción a QA', instructor: 'Juan Pérez', date: '2023-10-15', students: 32, status: 'activo' },
  { id: 2, title: 'Automation Testing', instructor: 'María García', date: '2023-11-05', students: 18, status: 'activo' },
  { id: 3, title: 'Seguridad en Testing', instructor: 'Carlos López', date: '2023-09-20', students: 45, status: 'completado' },
  { id: 4, title: 'Performance Testing', instructor: 'Ana Martínez', date: '2023-12-01', students: 12, status: 'programado' },
];

export default function CoursesPage() {
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

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'activo': return 'success';
      case 'programado': return 'warning';
      case 'completado': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Gestión de Cursos</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Nuevo Curso
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2, borderRadius: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar cursos..."
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
              <TableCell>Curso</TableCell>
              <TableCell>Instructor</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Estudiantes</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCourses
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((course) => (
                <TableRow key={course.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CourseIcon color="primary" />
                      <Typography>{course.title}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', color: 'white' }}>
                        {course.instructor.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      <Typography>{course.instructor}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{new Date(course.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StudentsIcon fontSize="small" color="action" />
                      <Typography>{course.students}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={course.status} 
                      size="small"
                      color={getStatusColor(course.status)}
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
          count={filteredCourses.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}