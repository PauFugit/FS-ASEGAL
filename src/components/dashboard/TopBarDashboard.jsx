'use client';

import {
  AppBar, Toolbar, IconButton, Typography, Avatar,
  Menu, MenuItem, Box, Divider, useMediaQuery, CircularProgress
} from '@mui/material';
import {
  Menu as MenuIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function TopBarDashboard({ isSidebarOpen, setIsSidebarOpen, setIsMobileSidebarOpen }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const { data: session, status } = useSession();

  const user = session?.user;

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleProfile = () => { handleClose(); router.push('/dashboard'); };

  const handleLogout = async () => {
    handleClose();
    await signOut({ callbackUrl: '/login' });
  };

  const getUserName = () => user?.name || user?.email?.split('@')[0] || 'Usuario';
  const getUserEmail = () => user?.email || '';
  const getUserAvatar = () => user?.image || null;
  const getUserInitials = () => {
    if (user?.name) {
      const parts = user.name.split(' ');
      return parts.length >= 2
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : parts[0][0].toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || 'U';
  };

  if (status === 'loading') {
    return (
      <AppBar position="fixed" sx={{ backgroundColor: 'background.paper', color: 'text.primary', boxShadow: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)' }}>
        <Toolbar><CircularProgress size={24} /></Toolbar>
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
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.12)',
        transition: 'width 225ms cubic-bezier(0.4,0,0.6,1) 0ms, margin 225ms cubic-bezier(0.4,0,0.6,1) 0ms',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => isMobile ? setIsMobileSidebarOpen(true) : setIsSidebarOpen(!isSidebarOpen)}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

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
          }}
        >
          Panel de Administración
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'flex-end', mr: 1 }}>
            <Typography variant="body2" fontWeight="medium" color="primary.main">{getUserName()}</Typography>
            <Typography variant="caption" color="text.secondary">{getUserEmail()}</Typography>
          </Box>

          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 1, border: '2px solid', borderColor: 'primary.main' }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              src={getUserAvatar()}
              sx={{ width: 38, height: 38, bgcolor: getUserAvatar() ? 'transparent' : 'primary.main', fontSize: '16px', fontWeight: 'bold' }}
            >
              {getUserInitials()}
            </Avatar>
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          PaperProps={{ elevation: 3, sx: { overflow: 'visible', mt: 1.5, minWidth: 220, borderRadius: 2 } }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem disabled sx={{ opacity: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}>
              <Avatar src={getUserAvatar()} sx={{ width: 40, height: 40, bgcolor: 'primary.main', fontSize: '16px' }}>
                {getUserInitials()}
              </Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" color="primary.main">{getUserName()}</Typography>
                <Typography variant="caption" color="text.secondary">{getUserEmail()}</Typography>
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
