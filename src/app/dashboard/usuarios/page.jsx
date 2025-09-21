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
  Avatar,
  Chip,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Alert,
  Snackbar,
  IconButton as MuiIconButton,
  FormHelperText
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  CameraAlt as CameraIcon
} from '@mui/icons-material';
import { useState, useEffect, useRef } from 'react';
import { uploadToSupabase, validateFile } from '@/lib/uploadUtils';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [editingUser, setEditingUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const editFileInputRef = useRef(null);

  // Estado para el formulario de nuevo usuario
  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    role: 'CLIENT',
    username: '',
    phone: '',
    company: '',
    image: ''
  });

  // Estado para el formulario de edición
  const [editUser, setEditUser] = useState({
    id: '',
    name: '',
    lastname: '',
    email: '',
    password: '',
    role: 'CLIENT',
    username: '',
    phone: '',
    company: '',
    active: true,
    image: ''
  });

  // Cargar usuarios al montar
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await fetch('/api/usuarios');
      if (res.ok) {
        const { data } = await res.json();
        setUsers(data || []);
      } else {
        const error = await res.json();
        showSnackbar(error.error || 'Error al cargar usuarios', 'error');
        if (res.status === 401 || res.status === 403) {
          showSnackbar('No tienes permisos para acceder a esta sección', 'error');
        }
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

  const handleFileUpload = async (file, isEdit = false) => {
    const validation = validateFile(file, 5, ['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
    if (!validation.valid) {
      showSnackbar(validation.error, 'error');
      return null;
    }

    setUploading(true);
    try {
      const url = await uploadToSupabase(file, 'user-avatars');
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

  const handleImageUpload = async (event, isEdit = false) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = await handleFileUpload(file, isEdit);
    if (imageUrl) {
      if (isEdit) {
        setEditUser(prev => ({ ...prev, image: imageUrl }));
      } else {
        setNewUser(prev => ({ ...prev, image: imageUrl }));
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handlers para el formulario de creación
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  // Handlers para el formulario de edición
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({ ...prev, [name]: value }));
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewUser({
      name: '',
      lastname: '',
      email: '',
      password: '',
      role: 'CLIENT',
      username: '',
      phone: '',
      company: '',
      image: ''
    });
  };

  const handleOpenEditDialog = (user) => {
    setEditingUser(user);
    setEditUser({
      id: user.id,
      name: user.name.split(' ')[0] || '',
      lastname: user.name.split(' ').slice(1).join(' ') || '',
      email: user.email,
      password: '',
      role: user.role,
      username: user.username,
      phone: user.phone || '',
      company: user.company || '',
      active: user.status === 'active',
      image: user.image || ''
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setEditingUser(null);
    setEditUser({
      id: '',
      name: '',
      lastname: '',
      email: '',
      password: '',
      role: 'CLIENT',
      username: '',
      phone: '',
      company: '',
      active: true,
      image: ''
    });
  };

  const handleCreateUser = async () => {
    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (res.ok) {
        const createdUser = await res.json();
        setUsers(prev => [createdUser, ...prev]);
        handleCloseDialog();
        showSnackbar('Usuario creado exitosamente');
      } else {
        const error = await res.json();
        showSnackbar(error.error || 'Error al crear usuario', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showSnackbar('Error de conexión', 'error');
    }
  };

  const handleUpdateUser = async () => {
    try {
      // Preparar datos para enviar
      const updateData = { ...editUser };
      if (!updateData.password) {
        delete updateData.password;
      }

      const res = await fetch('/api/usuarios', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUsers(prev => prev.map(user =>
          user.id === updatedUser.id ? updatedUser : user
        ));
        handleCloseEditDialog();
        showSnackbar('Usuario actualizado exitosamente');
      } else {
        const error = await res.json();
        showSnackbar(error.error || 'Error al actualizar usuario', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showSnackbar('Error de conexión', 'error');
    }
  };

  const handleDeleteUser = async (user) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }

    try {
      // Usar el email en lugar del ID
      const res = await fetch(`/api/usuarios/${user.email}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setUsers(prev => prev.filter(u => u.id !== user.id));
        showSnackbar('Usuario eliminado exitosamente');
      } else {
        const error = await res.json();
        showSnackbar(error.error || 'Error al eliminar usuario', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      showSnackbar('Error de conexión', 'error');
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const getAvatarContent = (user, size = 40) => {
    if (user.image) {
      return (
        <Avatar
          src={user.image}
          sx={{ width: size, height: size }}
        />
      );
    }

    const initials = user.avatar || 'U';
    return (
      <Avatar
        sx={{
          width: size,
          height: size,
          bgcolor: 'primary.main',
          color: 'white',
          fontSize: size * 0.4
        }}
      >
        {initials}
      </Avatar>
    );
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando usuarios...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">Gestión de Usuarios</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Nuevo Usuario
        </Button>
      </Box>

      <Paper sx={{ mb: 3, p: 2, borderRadius: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar usuarios por nombre, email o username..."
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
              <TableCell>Avatar</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell align="right">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {getAvatarContent(user)}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="body1">{user.name}</Typography>
                      {user.company && (
                        <Typography variant="body2" color="textSecondary">
                          {user.company}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      color={user.role === 'ADMIN' ? 'primary' : 'default'}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      size="small"
                      color={user.status === 'active' ? 'success' : 'error'}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenEditDialog(user)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteUser(user)}
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
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Diálogo para crear nuevo usuario */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Crear Nuevo Usuario
            <MuiIconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </MuiIconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {/* Upload de imagen */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              {getAvatarContent(
                { image: newUser.image, avatar: (newUser.name[0] || 'U') + (newUser.lastname[0] || '') },
                80
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, false)}
                style={{ display: 'none' }}
              />
              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                sx={{ mt: 1 }}
              >
                {uploading ? 'Subiendo...' : 'Seleccionar imagen'}
              </Button>
              {newUser.image && (
                <FormHelperText sx={{ color: 'success.main' }}>
                  ✓ Imagen seleccionada
                </FormHelperText>
              )}
            </Box>

            <TextField
              label="Nombre *"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Apellido"
              name="lastname"
              value={newUser.lastname}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Email *"
              name="email"
              type="email"
              value={newUser.email}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Contraseña *"
              name="password"
              type="password"
              value={newUser.password}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Nombre de usuario *"
              name="username"
              value={newUser.username}
              onChange={handleInputChange}
              required
              fullWidth
            />
            <TextField
              label="Teléfono"
              name="phone"
              value={newUser.phone}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Empresa"
              name="company"
              value={newUser.company}
              onChange={handleInputChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Rol *</InputLabel>
              <Select
                name="role"
                value={newUser.role}
                onChange={handleInputChange}
                label="Rol *"
              >
                <MenuItem value="ADMIN">Administrador</MenuItem>
                <MenuItem value="TEAM">Equipo</MenuItem>
                <MenuItem value="CLIENT">Cliente</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleCreateUser}
            variant="contained"
            color="primary"
            disabled={!newUser.name || !newUser.email || !newUser.password || !newUser.username}
          >
            Crear Usuario
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para editar usuario */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            Editar Usuario
            <MuiIconButton onClick={handleCloseEditDialog}>
              <CloseIcon />
            </MuiIconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {/* Upload de imagen para edición */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
              {getAvatarContent(
                { image: editUser.image, avatar: (editUser.name[0] || 'U') + (editUser.lastname[0] || '') },
                80
              )}
              <input
                ref={editFileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, true)}
                style={{ display: 'none' }}
              />
              <Button
                variant="outlined"
                startIcon={<UploadIcon />}
                onClick={() => editFileInputRef.current?.click()}
                disabled={uploading}
                sx={{ mt: 1 }}
              >
                {uploading ? 'Subiendo...' : 'Cambiar imagen'}
              </Button>
              {editUser.image && (
                <FormHelperText sx={{ color: 'success.main' }}>
                  ✓ Imagen seleccionada
                </FormHelperText>
              )}
            </Box>

            <TextField
              label="Nombre *"
              name="name"
              value={editUser.name}
              onChange={handleEditInputChange}
              required
              fullWidth
            />
            <TextField
              label="Apellido"
              name="lastname"
              value={editUser.lastname}
              onChange={handleEditInputChange}
              fullWidth
            />
            <TextField
              label="Email *"
              name="email"
              type="email"
              value={editUser.email}
              onChange={handleEditInputChange}
              required
              fullWidth
            />
            <TextField
              label="Nueva Contraseña (dejar vacío para mantener la actual)"
              name="password"
              type="password"
              value={editUser.password}
              onChange={handleEditInputChange}
              fullWidth
            />
            <TextField
              label="Nombre de usuario *"
              name="username"
              value={editUser.username}
              onChange={handleEditInputChange}
              required
              fullWidth
            />
            <TextField
              label="Teléfono"
              name="phone"
              value={editUser.phone}
              onChange={handleEditInputChange}
              fullWidth
            />
            <TextField
              label="Empresa"
              name="company"
              value={editUser.company}
              onChange={handleEditInputChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Rol *</InputLabel>
              <Select
                name="role"
                value={editUser.role}
                onChange={handleEditInputChange}
                label="Rol *"
              >
                <MenuItem value="ADMIN">Administrador</MenuItem>
                <MenuItem value="TEAM">Equipo</MenuItem>
                <MenuItem value="CLIENT">Cliente</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Estado *</InputLabel>
              <Select
                name="active"
                value={editUser.active}
                onChange={(e) => setEditUser(prev => ({ ...prev, active: e.target.value }))}
                label="Estado *"
              >
                <MenuItem value={true}>Activo</MenuItem>
                <MenuItem value={false}>Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="secondary">
            Cancelar
          </Button>
          <Button
            onClick={handleUpdateUser}
            variant="contained"
            color="primary"
            disabled={!editUser.name || !editUser.email || !editUser.username}
          >
            Actualizar Usuario
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}