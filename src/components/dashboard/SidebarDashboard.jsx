'use client'; // Marcar como componente de cliente

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Toolbar,
  useMediaQuery
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  Settings as SettingsIcon,
  DesignServices as ServicesIcon
} from '@mui/icons-material';
import { usePathname } from 'next/navigation'; // Usar usePathname en lugar de useRouter
import Link from 'next/link';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Usuarios', icon: <PeopleIcon />, path: '/dashboard/usuarios' },
  { text: 'Plantillas', icon: <ArticleIcon />, path: '/dashboard/plantillas' },
  { text: 'Cursos', icon: <SchoolIcon />, path: '/dashboard/cursos' },
  { text: 'Blog', icon: <EmailIcon />, path: '/dashboard/blog' },
  { text: 'Servicios', icon: <ServicesIcon />, path: '/dashboard/servicios' },
];

export default function SidebarDashboard({ isSidebarOpen, isMobileSidebarOpen, setIsMobileSidebarOpen }) {
  const isMobile = useMediaQuery('(max-width:600px)');
  const pathname = usePathname(); // Reemplazamos useRouter por usePathname

  const drawerContent = (
    <>
      <Toolbar sx={{ backgroundColor: 'primary.main' }}>
        <Box sx={{ 
          width: '100%', 
          display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          py: 2
        }}>
          <Box
            component="img"
            src="/logo.png"
            sx={{ 
              height: 80,
              filter: 'brightness(0) invert(1)'
            }}
            alt="Logo Admin"
          />
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              selected={pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'action.selected',
                  color: 'primary.main',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'text.secondary' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="persistent"
          open={isSidebarOpen}
          sx={{
            width: isSidebarOpen ? 240 : 0,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: isSidebarOpen ? 240 : 0,
              boxSizing: 'border-box',
              borderRight: 'none',
              boxShadow: 3,
              transition: 'width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
              overflowX: 'hidden',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}