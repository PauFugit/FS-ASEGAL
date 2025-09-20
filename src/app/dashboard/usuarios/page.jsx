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
  IconButton as MuiIconButton
} from '@mui/material';
import {
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Person as PersonIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

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

  // Estado para el formulario de nuevo usuario
  const [newUser, setNewUser] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    role: 'CLIENT',
    username: '',
    phone: '',
    company: ''
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
    active: true
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
      company: ''
    });
  };

  const handleOpenEditDialog = (user) => {
    setEditingUser(user);
    setEditUser({
      id: user.id,
      name: user.name.split(' ')[0] || '',
      lastname: user.name.split(' ').slice(1).join(' ') || '',
      email: user.email,
      password: '', // Dejar vacío para no cambiar la contraseña
      role: user.role,
      username: user.username,
      phone: user.phone || '',
      company: user.company || '',
      active: user.status === 'active'
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
      active: true
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
      // Preparar datos para enviar (si password está vacío, no incluirlo)
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

  const handleDeleteUser = async (userId) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }

    try {
      const res = await fetch(`/api/usuarios/${userId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setUsers(prev => prev.filter(user => user.id !== userId));
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', color: 'white' }}>
                        {user.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="body1">{user.name}</Typography>
                        <Typography variant="body2" color="textSecondary">
                          {user.company}
                        </Typography>
                      </Box>
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
                      onClick={() => handleDeleteUser(user.id)}
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