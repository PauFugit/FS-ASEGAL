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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Snackbar,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  School as CourseIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon
} from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { uploadToSupabase, validateFile } from '@/lib/uploadUtils';

export default function CoursesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const [resourceData, setResourceData] = useState({
    name: '',
    summary: '',
    type: 'CAPACITACION',
    description: '',
    linkUrl: '',
    references: '',
    imageUrl: ''
  });

  // Cargar recursos al montar
  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const res = await fetch('/api/recursos');
      if (res.ok) {
        const resources = await res.json();
        const capacitaciones = resources.filter(resource => resource.type === 'CAPACITACION');
        setResources(capacitaciones);
      } else {
        showSnackbar('Error al cargar cursos', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showSnackbar('Error de conexión', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleFileUpload = async (file) => {
    const validation = validateFile(file, 5, ['image/jpeg', 'image/png', 'image/webp']);
    if (!validation.valid) {
      showSnackbar(validation.error, 'error');
      return null;
    }

    setUploading(true);
    try {
      const url = await uploadToSupabase(file, 'blog-images');
      if (!url) {
        throw new Error('No se recibió URL del servidor');
      }

      showSnackbar('Imagen subida exitosamente');
      return url;
    } catch (error) {
      console.error('Upload error:', error);
      showSnackbar(`Error subiendo imagen: ${error.message}`, 'error');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = await handleFileUpload(file);
    if (imageUrl) {
      setResourceData(prev => ({ ...prev, imageUrl }));
    }
  };

  const handleCreateResource = async () => {
    if (!resourceData.name.trim()) {
      showSnackbar('El nombre es requerido', 'error');
      return;
    }

    if (!resourceData.imageUrl) {
      showSnackbar('La imagen es requerida', 'error');
      return;
    }

    try {
      const url = editingResource ? `/api/recursos/${editingResource.id}` : '/api/recursos';
      const method = editingResource ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resourceData),
      });

      const responseText = await res.text();
      let resultResource = null;

      if (responseText) {
        try {
          resultResource = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          throw new Error('Respuesta inválida del servidor');
        }
      }

      if (res.ok) {
        if (editingResource) {
          setResources(prev => prev.map(resource =>
            resource.id === editingResource.id ? resultResource : resource
          ));
          showSnackbar('Curso actualizado exitosamente');
        } else {
          setResources(prev => [resultResource, ...prev]);
          showSnackbar('Curso creado exitosamente');
        }

        setOpenDialog(false);
        resetForm();
      } else {
        const error = resultResource?.error || `Error ${res.status}: ${res.statusText}`;
        showSnackbar(error, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showSnackbar(error.message || 'Error de conexión', 'error');
    }
  };

  const handleEditResource = (resource) => {
    setEditingResource(resource);
    setResourceData({
      name: resource.name || '',
      summary: resource.summary || '',
      type: resource.type || 'CAPACITACION',
      description: resource.description || '',
      linkUrl: resource.linkUrl || '',
      references: resource.references || '',
      imageUrl: resource.imageUrl || ''
    });
    setOpenDialog(true);
  };

  const handleDeleteResource = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este curso?')) return;

    try {
      const res = await fetch(`/api/recursos/${id}`, {
        method: 'DELETE',
      });

      const responseText = await res.text();
      let responseData = {};

      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
        }
      }

      if (res.ok) {
        setResources(prev => prev.filter(resource => resource.id !== id));
        showSnackbar(responseData.message || 'Curso eliminado exitosamente');
      } else {
        showSnackbar(responseData.error || 'Error al eliminar curso', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showSnackbar('Error de conexión', 'error');
    }
  };

  const resetForm = () => {
    setResourceData({
      name: '',
      summary: '',
      type: 'CAPACITACION',
      description: '',
      linkUrl: '',
      references: '',
      imageUrl: ''
    });
    setEditingResource(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (resource.summary && resource.summary.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Gestión de Cursos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
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
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredResources
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <CourseIcon color="primary" />
                      <Typography>{resource.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ maxWidth: 300 }}>
                      {resource.summary}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={resource.type}
                      size="small"
                      color="primary"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(resource.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditResource(resource)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteResource(resource.id)}
                    >
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
          count={filteredResources.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      {/* Diálogo para crear/editar curso */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {editingResource ? 'Editar Curso' : 'Nuevo Curso'}
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <TextField
              label="Nombre *"
              value={resourceData.name}
              onChange={(e) => setResourceData({ ...resourceData, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Resumen"
              value={resourceData.summary}
              onChange={(e) => setResourceData({ ...resourceData, summary: e.target.value })}
              multiline
              rows={3}
              fullWidth
              required
            />
            <TextField
              label="Descripción"
              value={resourceData.description}
              onChange={(e) => setResourceData({ ...resourceData, description: e.target.value })}
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              label="Enlace del curso"
              value={resourceData.linkUrl}
              onChange={(e) => setResourceData({ ...resourceData, linkUrl: e.target.value })}
              fullWidth
              placeholder="https://ejemplo.com/curso"
            />
            <TextField
              label="Referencias"
              value={resourceData.references}
              onChange={(e) => setResourceData({ ...resourceData, references: e.target.value })}
              multiline
              rows={2}
              fullWidth
            />

            {/* Upload de imagen */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Imagen * (JPEG, PNG, WebP - Máx. 5MB)
              </Typography>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                fullWidth
              >
                {uploading ? 'Subiendo...' :
                  resourceData.imageUrl ? 'Imagen seleccionada' : 'Seleccionar imagen'}
              </Button>
              {resourceData.imageUrl && (
                <FormHelperText sx={{ color: 'success.main' }}>
                  ✓ Imagen {editingResource ? 'actual' : 'lista para subir'}
                </FormHelperText>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={handleCreateResource}
            variant="contained"
            disabled={!resourceData.name || !resourceData.imageUrl || uploading}
          >
            {editingResource ? 'Actualizar Curso' : 'Crear Curso'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}