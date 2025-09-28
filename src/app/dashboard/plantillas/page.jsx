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
  Description as TemplateIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  PictureAsPdf as PdfIcon
} from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { uploadToSupabase, validateFile } from '@/lib/uploadUtils';

export default function TemplatesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [uploading, setUploading] = useState({ image: false, pdf: false });
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const [resourceData, setResourceData] = useState({
    name: '',
    summary: '',
    type: 'PLANTILLA',
    description: '',
    linkUrl: '',
    references: '',
    imageUrl: '',
    pdfUrl: ''
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
        const plantillas = resources.filter(resource => resource.type === 'PLANTILLA');
        setResources(plantillas);
      } else {
        showSnackbar('Error al cargar plantillas', 'error');
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

  const handleFileUpload = async (file, type) => {
    const maxSize = type === 'image' ? 5 : 10;
    const allowedTypes = type === 'image'
      ? ['image/jpeg', 'image/png', 'image/webp']
      : ['application/pdf'];

    const validation = validateFile(file, maxSize, allowedTypes);
    if (!validation.valid) {
      showSnackbar(validation.error, 'error');
      return null;
    }

    setUploading(prev => ({ ...prev, [type]: true }));
    try {
      const bucketName = type === 'image' ? 'blog-images' : 'blog-pdfs';
      const url = await uploadToSupabase(file, bucketName);

      if (!url) {
        throw new Error('No se recibió URL del servidor');
      }

      showSnackbar(`${type === 'image' ? 'Imagen' : 'PDF'} subido exitosamente`);
      return url;
    } catch (error) {
      console.error('Upload error:', error);
      showSnackbar(`Error subiendo ${type === 'image' ? 'imagen' : 'PDF'}: ${error.message}`, 'error');
      return null;
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = await handleFileUpload(file, 'image');
    if (imageUrl) {
      setResourceData(prev => ({ ...prev, imageUrl }));
    }
  };

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const pdfUrl = await handleFileUpload(file, 'pdf');
    if (pdfUrl) {
      setResourceData(prev => ({ ...prev, pdfUrl, linkUrl: pdfUrl }));
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

    if (!resourceData.pdfUrl) {
      showSnackbar('El PDF es requerido', 'error');
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
          showSnackbar('Plantilla actualizada exitosamente');
        } else {
          setResources(prev => [resultResource, ...prev]);
          showSnackbar('Plantilla creada exitosamente');
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
      type: resource.type || 'PLANTILLA',
      description: resource.description || '',
      linkUrl: resource.linkUrl || '',
      references: resource.references || '',
      imageUrl: resource.imageUrl || '',
      pdfUrl: resource.pdfUrl || ''
    });
    setOpenDialog(true);
  };

  const handleDeleteResource = async (id) => {
    if (!confirm('¿Estás seguro de eliminar esta plantilla?')) return;

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
        showSnackbar(responseData.message || 'Plantilla eliminada exitosamente');
      } else {
        showSnackbar(responseData.error || 'Error al eliminar plantilla', 'error');
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
      type: 'PLANTILLA',
      description: '',
      linkUrl: '',
      references: '',
      imageUrl: '',
      pdfUrl: ''
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
        <Typography variant="h4" fontWeight="bold">Gestión de Plantillas</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
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
              <TableCell>PDF</TableCell>
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
                      <TemplateIcon color="primary" />
                      <Typography>{resource.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {resource.pdfUrl ? (
                      <Chip
                        icon={<PdfIcon />}
                        label="PDF Adjunto"
                        color="success"
                        size="small"
                      />
                    ) : (
                      <Chip
                        label="Sin PDF"
                        color="default"
                        size="small"
                      />
                    )}
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

      {/* Diálogo para crear/editar plantilla */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {editingResource ? 'Editar Plantilla' : 'Nueva Plantilla'}
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
              label="Resumen (Opcional)"
              value={resourceData.summary}
              onChange={(e) => setResourceData({ ...resourceData, summary: e.target.value })}
              multiline
              rows={2}
              fullWidth
            />
            <TextField
              label="Descripción (Opcional)"
              value={resourceData.description}
              onChange={(e) => setResourceData({ ...resourceData, description: e.target.value })}
              multiline
              rows={3}
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
                disabled={uploading.image}
                fullWidth
              >
                {uploading.image ? 'Subiendo...' :
                  resourceData.imageUrl ? 'Imagen seleccionada' : 'Seleccionar imagen'}
              </Button>
              {resourceData.imageUrl && (
                <FormHelperText sx={{ color: 'success.main' }}>
                  ✓ Imagen {editingResource ? 'actual' : 'lista para subir'}
                </FormHelperText>
              )}
            </Box>

            {/* Upload de PDF */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                PDF * (Máx. 10MB)
              </Typography>
              <input
                ref={pdfInputRef}
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                style={{ display: 'none' }}
              />
              <Button
                variant="outlined"
                startIcon={<PdfIcon />}
                onClick={() => pdfInputRef.current?.click()}
                disabled={uploading.pdf}
                fullWidth
              >
                {uploading.pdf ? 'Subiendo...' :
                  resourceData.pdfUrl ? 'PDF seleccionado' : 'Seleccionar PDF'}
              </Button>
              {resourceData.pdfUrl && (
                <FormHelperText sx={{ color: 'success.main' }}>
                  ✓ PDF {editingResource ? 'actual' : 'listo para subir'}
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
            disabled={!resourceData.name || !resourceData.imageUrl || !resourceData.pdfUrl || uploading.image || uploading.pdf}
          >
            {editingResource ? 'Actualizar Plantilla' : 'Crear Plantilla'}
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