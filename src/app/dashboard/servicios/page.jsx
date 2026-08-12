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
  FormHelperText,
  FormControlLabel,
  Switch
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  DesignServices as ServiceIcon,
  AttachMoney as PriceIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon
} from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { uploadToSupabase, validateFile } from '@/lib/uploadUtils';

const emptyForm = {
  name: '',
  description: '',
  longDescription: '',
  price: '',
  priceAmount: '',
  quoteOnly: true,
  imageUrl: '',
  images: [],
  status: 'publicado'
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [uploading, setUploading] = useState({ image: false, gallery: false });
  const fileInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [serviceData, setServiceData] = useState(emptyForm);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await fetch('/api/servicios');
      if (res.ok) {
        const { data } = await res.json();
        setServices(data || []);
      } else {
        showSnackbar('Error al cargar servicios', 'error');
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
    try {
      return await uploadToSupabase(file, 'service-images');
    } catch (error) {
      showSnackbar(`Error subiendo imagen: ${error.message}`, 'error');
      return null;
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, image: true }));
    const url = await handleFileUpload(file);
    if (url) setServiceData(prev => ({ ...prev, imageUrl: url }));
    setUploading(prev => ({ ...prev, image: false }));
  };

  const handleGalleryUpload = async (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;
    setUploading(prev => ({ ...prev, gallery: true }));
    const urls = [];
    for (const file of files) {
      const url = await handleFileUpload(file);
      if (url) urls.push(url);
    }
    if (urls.length) {
      setServiceData(prev => ({ ...prev, images: [...prev.images, ...urls] }));
      showSnackbar(`${urls.length} imagen(es) agregada(s) a la galería`);
    }
    setUploading(prev => ({ ...prev, gallery: false }));
  };

  const removeGalleryImage = (index) => {
    setServiceData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));
  };

  const handleSaveService = async () => {
    if (!serviceData.name.trim()) {
      showSnackbar('El nombre es requerido', 'error');
      return;
    }
    if (!serviceData.description.trim()) {
      showSnackbar('La descripción breve es requerida', 'error');
      return;
    }
    if (!serviceData.imageUrl) {
      showSnackbar('La imagen principal es requerida', 'error');
      return;
    }

    try {
      const url = editingService ? `/api/servicios/${editingService.id}` : '/api/servicios';
      const method = editingService ? 'PUT' : 'POST';

      const payload = {
        name: serviceData.name,
        description: serviceData.description,
        longDescription: serviceData.longDescription || null,
        price: serviceData.price || null,
        priceAmount: serviceData.quoteOnly ? null : (serviceData.priceAmount ? parseInt(serviceData.priceAmount, 10) : null),
        imageUrl: serviceData.imageUrl,
        images: serviceData.images,
        status: serviceData.status,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const responseText = await res.text();
      let result = null;
      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error('Respuesta inválida del servidor');
        }
      }

      if (res.ok) {
        if (editingService) {
          setServices(prev => prev.map(s => s.id === editingService.id ? (result.data || result) : s));
          showSnackbar('Servicio actualizado exitosamente');
        } else {
          setServices(prev => [result, ...prev]);
          showSnackbar('Servicio creado exitosamente');
        }
        setOpenDialog(false);
        resetForm();
      } else {
        showSnackbar(result?.error || `Error ${res.status}: ${res.statusText}`, 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showSnackbar(error.message || 'Error de conexión', 'error');
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setServiceData({
      name: service.name || '',
      description: service.description || '',
      longDescription: service.longDescription || '',
      price: service.price || '',
      priceAmount: service.priceAmount ? String(service.priceAmount) : '',
      quoteOnly: !service.priceAmount,
      imageUrl: service.imageUrl || '',
      images: service.images || [],
      status: service.status || 'publicado'
    });
    setOpenDialog(true);
  };

  const handleDeleteService = async (id) => {
    if (!confirm('¿Estás seguro de eliminar este servicio?')) return;

    try {
      const res = await fetch(`/api/servicios/${id}`, { method: 'DELETE' });
      const responseText = await res.text();
      let responseData = {};
      if (responseText) {
        try { responseData = JSON.parse(responseText); } catch {}
      }

      if (res.ok) {
        setServices(prev => prev.filter(s => s.id !== id));
        showSnackbar(responseData.message || 'Servicio eliminado exitosamente');
      } else {
        showSnackbar(responseData.error || 'Error al eliminar servicio', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showSnackbar('Error de conexión', 'error');
    }
  };

  const resetForm = () => {
    setServiceData(emptyForm);
    setEditingService(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Typography variant="h4" fontWeight="bold">Gestión de Servicios</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
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

      <TableContainer component={Paper} sx={{ borderRadius: 2, overflowX: 'auto' }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead sx={{ backgroundColor: 'grey.100' }}>
            <TableRow>
              <TableCell>Servicio</TableCell>
              <TableCell>Precio</TableCell>
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
                      <Typography>
                        {service.priceAmount
                          ? `$${service.priceAmount.toLocaleString('es-CL')}`
                          : (service.price || 'Cotizar')}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={service.status || 'publicado'}
                      size="small"
                      color={service.status === 'publicado' ? 'success' : 'default'}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" color="primary" onClick={() => handleEditService(service)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteService(service.id)}>
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
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {editingService ? 'Editar Servicio' : 'Nuevo Servicio'}
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            <TextField
              label="Nombre *"
              value={serviceData.name}
              onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Descripción breve (para la grilla) *"
              value={serviceData.description}
              onChange={(e) => setServiceData({ ...serviceData, description: e.target.value })}
              multiline
              rows={2}
              fullWidth
              required
            />
            <TextField
              label="Descripción larga (página de detalle)"
              value={serviceData.longDescription}
              onChange={(e) => setServiceData({ ...serviceData, longDescription: e.target.value })}
              multiline
              rows={5}
              fullWidth
            />

            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={serviceData.quoteOnly}
                    onChange={(e) => setServiceData({ ...serviceData, quoteOnly: e.target.checked })}
                  />
                }
                label="Servicio a cotizar (sin precio fijo)"
              />
              {!serviceData.quoteOnly && (
                <TextField
                  label="Precio (CLP)"
                  type="number"
                  value={serviceData.priceAmount}
                  onChange={(e) => setServiceData({ ...serviceData, priceAmount: e.target.value })}
                  fullWidth
                  sx={{ mt: 2 }}
                />
              )}
              <TextField
                label="Texto de precio a mostrar (ej. 'Desde $50.000')"
                value={serviceData.price}
                onChange={(e) => setServiceData({ ...serviceData, price: e.target.value })}
                fullWidth
                sx={{ mt: 2 }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Imagen principal * (JPEG, PNG, WebP - Máx. 5MB)
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
                 serviceData.imageUrl ? 'Imagen seleccionada' : 'Seleccionar imagen'}
              </Button>
              {serviceData.imageUrl && (
                <FormHelperText sx={{ color: 'success.main' }}>
                  ✓ Imagen {editingService ? 'actual' : 'lista para subir'}
                </FormHelperText>
              )}
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Galería de imágenes (opcional)
              </Typography>
              <input
                ref={galleryInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleGalleryUpload}
                style={{ display: 'none' }}
              />
              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={() => galleryInputRef.current?.click()}
                disabled={uploading.gallery}
                fullWidth
              >
                {uploading.gallery ? 'Subiendo...' : 'Agregar imágenes a la galería'}
              </Button>
              {serviceData.images.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {serviceData.images.map((img, idx) => (
                    <Box key={idx} sx={{ position: 'relative' }}>
                      {}
                      <img src={img} alt={`galería ${idx + 1}`} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                      <IconButton
                        size="small"
                        onClick={() => removeGalleryImage(idx)}
                        sx={{ position: 'absolute', top: -8, right: -8, bgcolor: 'error.main', color: 'white', '&:hover': { bgcolor: 'error.dark' } }}
                      >
                        <CloseIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>

            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={serviceData.status}
                label="Estado"
                onChange={(e) => setServiceData({ ...serviceData, status: e.target.value })}
              >
                <MenuItem value="publicado">Publicado</MenuItem>
                <MenuItem value="borrador">Borrador</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            onClick={handleSaveService}
            variant="contained"
            disabled={!serviceData.name || !serviceData.description || !serviceData.imageUrl || uploading.image || uploading.gallery}
          >
            {editingService ? 'Actualizar Servicio' : 'Crear Servicio'}
          </Button>
        </DialogActions>
      </Dialog>

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
