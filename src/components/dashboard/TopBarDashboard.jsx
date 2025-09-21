'use client';

import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Avatar, 
  Menu, 
  MenuItem, 
  Box,
  Divider,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function TopBarDashboard({ isSidebarOpen, setIsSidebarOpen, setIsMobileSidebarOpen }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const open = Boolean(anchorEl);
  const router = useRouter();

  // Función para obtener datos del usuario de forma segura
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`/api/usuarios/${userId}`);
      if (response.ok) {
        const data = await response.json();
        // Manejar ambos formatos: { data: user } o user directamente
        return data.data || data;
      }
      return null;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
    }
  };

  // Obtener usuario al cargar
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          setUser(authUser);
          
          // Obtener datos completos del usuario desde tu API
          const userDataFromApi = await fetchUserData(authUser.id);
          if (userDataFromApi) {
            setUserData(userDataFromApi);
          } else {
            // Si falla la API, usar datos básicos de Supabase
            console.warn('No se pudieron obtener datos completos del usuario');
          }
        }
      } catch (error) {
        console.error('Error obteniendo usuario:', error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setUserData(null);
        } else if (session?.user) {
          setUser(session.user);
          // Volver a cargar datos del usuario cuando cambie la sesión
          const userData = await fetchUserData(session.user.id);
          if (userData) {
            setUserData(userData);
          }
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    router.push('/dashboard');
  };

  const handleLogout = async () => {
    try {
      console.log('Iniciando logout...');
      
      // Cerrar sesión en Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Error al cerrar sesión:', error);
        return;
      }
      
      console.log('Sesión cerrada en Supabase');
      handleClose();
      
      // Forzar una recarga completa para limpiar el estado
      window.location.href = '/login';
      
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    }
  };

  const getUserName = () => {
    if (!userData && !user) return 'Usuario';
    
    if (userData) {
      return userData.name || userData.username || user?.email?.split('@')[0] || 'Usuario';
    }
    
    return user?.user_metadata?.name || 
           user?.user_metadata?.full_name || 
           user?.email?.split('@')[0] || 
           'Usuario';
  };

  const getUserEmail = () => {
    return user?.email || '';
  };

  const getUserAvatar = () => {
    if (userData?.image) {
      return userData.image;
    }
    
    if (user?.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url;
    }
    
    if (userData?.avatar && typeof userData.avatar === 'string' && userData.avatar.startsWith('http')) {
      return userData.avatar;
    }
    
    return null;
  };

  const getUserInitials = () => {
    if (userData?.name) {
      const names = userData.name.split(' ');
      if (names.length >= 2) {
        return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
      }
      return userData.name.charAt(0).toUpperCase();
    }
    
    if (user?.user_metadata?.name) {
      const names = user.user_metadata.name.split(' ');
      if (names.length >= 2) {
        return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
      }
      return user.user_metadata.name.charAt(0).toUpperCase();
    }
    
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    
    return 'U';
  };

  if (loading) {
    return (
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${isSidebarOpen ? 240 : 0}px)` },
          ml: { sm: `${isSidebarOpen ? 240 : 0}px` },
          backgroundColor: 'background.paper',
          color: 'text.primary',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <CircularProgress size={24} />
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${isSidebarOpen ? 240 : 0}px)` },
        ml: { sm: `${isSidebarOpen ? 240 : 0}px` },
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, margin 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => isMobile ? setIsMobileSidebarOpen(true) : setIsSidebarOpen(!isSidebarOpen)}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        {/* Título con mejor estilo */}
        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ 
            flexGrow: 1,
            background: 'linear-gradient(45deg, #1A1773 0%, #3A3791 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'italic',
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
        Panel de Administración
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Información del usuario */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'flex-end', mr: 1 }}>
            <Typography variant="body2" fontWeight="medium" color="primary.main">
              {getUserName()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {getUserEmail()}
            </Typography>
          </Box>

          {/* Avatar y menú */}
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ 
              ml: 1,
              border: '2px solid',
              borderColor: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark',
              }
            }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar 
              src={getUserAvatar()}
              sx={{ 
                width: 38, 
                height: 38,
                bgcolor: getUserAvatar() ? 'transparent' : 'primary.main',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)'
                }
              }}
            >
              {getUserInitials()}
            </Avatar>
          </IconButton>
        </Box>

        {/* Menú desplegable */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 3,
            sx: {
              overflow: 'visible',
              mt: 1.5,
              minWidth: 220,
              borderRadius: 2,
              '& .MuiAvatar-root': {
                width: 36,
                height: 36,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {/* Información del usuario en el menú */}
          <MenuItem disabled sx={{ opacity: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
              <Avatar 
                src={getUserAvatar()}
                sx={{ 
                  width: 40, 
                  height: 40,
                  bgcolor: getUserAvatar() ? 'transparent' : 'primary.main',
                  fontSize: '16px'
                }}
              >
                {getUserInitials()}
              </Avatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="subtitle2" fontWeight="bold" color="primary.main">
                  {getUserName()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {getUserEmail()}
                </Typography>
              </Box>
            </Box>
          </MenuItem>
          
          <Divider />
          
          <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
            <AccountCircleIcon sx={{ mr: 1.5, fontSize: 22, color: 'primary.main' }} /> 
            <Typography variant="body2">Panel de Administración</Typography>
          </MenuItem>
          
          <Divider />
          
          <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
            <LogoutIcon sx={{ mr: 1.5, fontSize: 22 }} /> 
            <Typography variant="body2">Cerrar sesión</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}