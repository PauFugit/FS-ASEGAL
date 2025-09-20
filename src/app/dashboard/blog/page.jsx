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
  Article as PostIcon,
  Visibility as ViewIcon,
  CalendarToday as DateIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon
} from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { uploadToSupabase, validateFile } from '@/lib/uploadUtils';

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [uploading, setUploading] = useState({ image: false, pdf: false });
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const [postData, setPostData] = useState({
    title: '',
    author: '',
    summary: '',
    link: '',
    bodyText: '',
    references: '',
    imageUrl: '',
    pdfUrl: '',
    status: 'publicado'
  });

  // Cargar posts al montar
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        showSnackbar('Error al cargar posts', 'error');
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
    const validation = validateFile(file, type === 'image' ? 5 : 10);
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
      console.error('Upload error details:', error);
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
      setPostData(prev => ({ ...prev, imageUrl }));
    }
  };

  const handlePdfUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const pdfUrl = await handleFileUpload(file, 'pdf');
    if (pdfUrl) {
      setPostData(prev => ({ ...prev, pdfUrl }));
    }
  };

  const handleCreatePost = async () => {
  // Validaciones
  if (!postData.title.trim()) {
    showSnackbar('El título es requerido', 'error');
    return;
  }

  if (!postData.summary.trim()) {
    showSnackbar('El resumen es requerido', 'error');
    return;
  }

  if (!postData.imageUrl) {
    showSnackbar('La imagen es requerida', 'error');
    return;
  }

  try {
    const url = editingPost ? `/api/blog/${editingPost.id}` : '/api/blog';
    const method = editingPost ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    // Verificar si la respuesta tiene contenido antes de parsear
    const responseText = await res.text();
    let resultPost = null;

    if (responseText) {
      try {
        resultPost = JSON.parse(responseText);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        throw new Error('Respuesta inválida del servidor');
      }
    }

    if (res.ok) {
      if (editingPost) {
        // Actualizar post existente
        setPosts(prev => prev.map(post => 
          post.id === editingPost.id ? resultPost : post
        ));
        showSnackbar('Post actualizado exitosamente');
      } else {
        // Crear nuevo post
        setPosts(prev => [resultPost, ...prev]);
        showSnackbar('Post creado exitosamente');
      }
      
      setOpenDialog(false);
      resetForm();
    } else {
      const error = resultPost?.error || `Error ${res.status}: ${res.statusText}`;
      showSnackbar(error, 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showSnackbar(error.message || 'Error de conexión', 'error');
  }
};

  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostData({
      title: post.title || '',
      author: post.author || '',
      summary: post.summary || '',
      link: post.link || '',
      bodyText: post.bodyText || '',
      references: post.references || '',
      imageUrl: post.imageUrl || '',
      pdfUrl: post.pdfUrl || '',
      status: post.status || 'publicado'
    });
    setOpenDialog(true);
  };

const handleDeletePost = async (id) => {
  if (!confirm('¿Estás seguro de eliminar este post?')) return;

  try {
    const res = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });

    // Verificar si la respuesta tiene contenido
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
      setPosts(prev => prev.filter(post => post.id !== id));
      showSnackbar(responseData.message || 'Post eliminado exitosamente');
    } else {
      showSnackbar(responseData.error || 'Error al eliminar post', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showSnackbar('Error de conexión', 'error');
  }
};

  const resetForm = () => {
    setPostData({
      title: '',
      author: '',
      summary: '',
      link: '',
      bodyText: '',
      references: '',
      imageUrl: '',
      pdfUrl: '',
      status: 'publicado'
    });
    setEditingPost(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetForm();
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.author && post.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'publicado': return 'success';
      case 'borrador': return 'warning';
      case 'programado': return 'info';
      default: return 'default';
    }
  };

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
        <Typography variant="h4" fontWeight="bold">Gestión del Blog</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
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
                  <TableCell>{post.author || 'Anónimo'}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <DateIcon fontSize="small" color="action" />
                      <Typography>{new Date(post.createdAt).toLocaleDateString()}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={post.status || 'publicado'} 
                      size="small"
                      color={getStatusColor(post.status || 'publicado')}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small" 
                      color="primary"
                      onClick={() => handleEditPost(post)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error"
                      onClick={() => handleDeletePost(post.id)}
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
          count={filteredPosts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </TableContainer>

      {/* Diálogo para crear/editar post */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {editingPost ? 'Editar Entrada de Blog' : 'Nueva Entrada de Blog'}
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
            {/* Campos de texto */}
            <TextField
              label="Título *"
              value={postData.title}
              onChange={(e) => setPostData({...postData, title: e.target.value})}
              fullWidth
              required
            />
            <TextField
              label="Autor"
              value={postData.author}
              onChange={(e) => setPostData({...postData, author: e.target.value})}
              fullWidth
            />
            <TextField
              label="Resumen *"
              value={postData.summary}
              onChange={(e) => setPostData({...postData, summary: e.target.value})}
              multiline
              rows={3}
              fullWidth
              required
            />
            <TextField
              label="Contenido completo"
              value={postData.bodyText}
              onChange={(e) => setPostData({...postData, bodyText: e.target.value})}
              multiline
              rows={4}
              fullWidth
            />
            <TextField
              label="Referencias"
              value={postData.references}
              onChange={(e) => setPostData({...postData, references: e.target.value})}
              multiline
              rows={2}
              fullWidth
            />
            <TextField
              label="Enlace externo"
              value={postData.link}
              onChange={(e) => setPostData({...postData, link: e.target.value})}
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
                 postData.imageUrl ? 'Imagen seleccionada' : 'Seleccionar imagen'}
              </Button>
              {postData.imageUrl && (
                <FormHelperText sx={{ color: 'success.main' }}>
                  ✓ Imagen {editingPost ? 'actual' : 'lista para subir'}
                </FormHelperText>
              )}
            </Box>

            {/* Upload de PDF */}
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                PDF (Opcional - Máx. 10MB)
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
                startIcon={<UploadIcon />}
                onClick={() => pdfInputRef.current?.click()}
                disabled={uploading.pdf}
                fullWidth
              >
                {uploading.pdf ? 'Subiendo...' : 
                 postData.pdfUrl ? 'PDF seleccionado' : 'Seleccionar PDF'}
              </Button>
              {postData.pdfUrl && (
                <FormHelperText sx={{ color: 'success.main' }}>
                  ✓ PDF {editingPost ? 'actual' : 'listo para subir'}
                </FormHelperText>
              )}
            </Box>

            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                value={postData.status}
                label="Estado"
                onChange={(e) => setPostData({...postData, status: e.target.value})}
              >
                <MenuItem value="publicado">Publicado</MenuItem>
                <MenuItem value="borrador">Borrador</MenuItem>
                <MenuItem value="programado">Programado</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button 
            onClick={handleCreatePost} 
            variant="contained"
            disabled={!postData.title || !postData.summary || !postData.imageUrl || uploading.image || uploading.pdf}
          >
            {editingPost ? 'Actualizar Entrada' : 'Crear Entrada'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({...snackbar, open: false})}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({...snackbar, open: false})}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}