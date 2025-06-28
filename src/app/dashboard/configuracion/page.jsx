'use client';

import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  TextField, 
  Button, 
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Lock as PasswordIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  CheckCircle as SuccessIcon,
  Lock as LockIcon
} from '@mui/icons-material';
import { useState } from 'react';

export default function ConfiguracionPage() {
  // Datos del usuario (simulados)
  const [userData, setUserData] = useState({
    nombre: 'Juan Pérez',
    email: 'admin@asegalbyf.com',
    telefono: '+56 9 1234 5678',
    direccion: 'Av. Principal 1234, Santiago, Chile',
    password: '',
    newPassword: '',
    confirmPassword: '',
    rol: 'admin',
    avatar: 'JP'
  });

  const [editMode, setEditMode] = useState(false);
  const [passwordEditMode, setPasswordEditMode] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios
    setEditMode(false);
    setPasswordEditMode(false);
    setSnackbarMessage('Cambios guardados exitosamente');
    setSnackbarOpen(true);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Validar que las contraseñas coincidan
    if (userData.newPassword !== userData.confirmPassword) {
      setSnackbarMessage('Las contraseñas no coinciden');
      setSnackbarOpen(true);
      return;
    }
    // Aquí iría la lógica para cambiar la contraseña
    setPasswordEditMode(false);
    setSnackbarMessage('Contraseña actualizada exitosamente');
    setSnackbarOpen(true);
    setUserData(prev => ({ ...prev, password: '', newPassword: '', confirmPassword: '' }));
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Configuración de Cuenta
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Administra tu información personal y configuración de seguridad
      </Typography>

      <Grid container spacing={3}>
        {/* Columna izquierda - Información personal */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <Typography variant="h6" fontWeight="bold">
                Información Personal
              </Typography>
              {!editMode && (
                <Button 
                  startIcon={<EditIcon />}
                  onClick={() => setEditMode(true)}
                  sx={{ textTransform: 'none' }}
                >
                  Editar
                </Button>
              )}
            </Box>

            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  fontSize: 48,
                  bgcolor: 'primary.main',
                  mb: 2
                }}
              >
                {userData.avatar}
              </Avatar>
              {editMode && (
                <Button variant="outlined" size="small" sx={{ mb: 3 }}>
                  Cambiar foto
                </Button>
              )}
            </Box>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre completo"
                    name="nombre"
                    value={userData.nombre}
                    onChange={handleChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: (
                        <PersonIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Correo electrónico"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: (
                        <EmailIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Teléfono"
                    name="telefono"
                    value={userData.telefono}
                    onChange={handleChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: (
                        <PhoneIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    name="direccion"
                    value={userData.direccion}
                    onChange={handleChange}
                    disabled={!editMode}
                    InputProps={{
                      startAdornment: (
                        <LocationIcon sx={{ color: 'action.active', mr: 1 }} />
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth disabled>
                    <InputLabel>Rol</InputLabel>
                    <Select
                      value={userData.rol}
                      label="Rol"
                    >
                      <MenuItem value="admin">Administrador</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {editMode && (
                  <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
                    <Button 
                      variant="outlined" 
                      onClick={() => setEditMode(false)}
                      sx={{ textTransform: 'none' }}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit"
                      variant="contained" 
                      startIcon={<SaveIcon />}
                      sx={{ textTransform: 'none' }}
                    >
                      Guardar cambios
                    </Button>
                  </Grid>
                )}
              </Grid>
            </form>
          </Card>
        </Grid>

        {/* Columna derecha - Seguridad */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Seguridad
            </Typography>

            {!passwordEditMode ? (
              <Box>
                <Typography variant="body1" mb={3}>
                  Para cambiar tu contraseña, haz clic en el botón "Cambiar contraseña".
                </Typography>
                <Button 
                  variant="contained"
                  startIcon={<LockIcon />}
                  onClick={() => setPasswordEditMode(true)}
                  sx={{ textTransform: 'none' }}
                >
                  Cambiar contraseña
                </Button>
              </Box>
            ) : (
              <form onSubmit={handlePasswordSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Contraseña actual"
                      name="password"
                      type="password"
                      value={userData.password}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <LockIcon sx={{ color: 'action.active', mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Nueva contraseña"
                      name="newPassword"
                      type="password"
                      value={userData.newPassword}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <LockIcon sx={{ color: 'action.active', mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confirmar nueva contraseña"
                      name="confirmPassword"
                      type="password"
                      value={userData.confirmPassword}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <LockIcon sx={{ color: 'action.active', mr: 1 }} />
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      La contraseña debe contener al menos 8 caracteres, incluyendo mayúsculas, números y caracteres especiales.
                    </Alert>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="flex-end" gap={2}>
                    <Button 
                      variant="outlined" 
                      onClick={() => setPasswordEditMode(false)}
                      sx={{ textTransform: 'none' }}
                    >
                      Cancelar
                    </Button>
                    <Button 
                      type="submit"
                      variant="contained" 
                      startIcon={<SaveIcon />}
                      sx={{ textTransform: 'none' }}
                    >
                      Actualizar contraseña
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Card>

          {/* Sección de preferencias */}
          <Card sx={{ p: 3, borderRadius: 2, mt: 3 }}>
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Preferencias
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Configura tus preferencias de notificaciones y apariencia.
            </Typography>
            <Button 
              variant="outlined" 
              sx={{ mt: 2, textTransform: 'none' }}
            >
              Configurar preferencias
            </Button>
          </Card>
        </Grid>
      </Grid>

      {/* Notificación de éxito */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          icon={<SuccessIcon fontSize="inherit" />}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}