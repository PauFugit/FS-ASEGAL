'use client';
import React from 'react';

import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  LinearProgress,
  Button,
  Stack,
  Divider
} from '@mui/material';
import {
  People as PeopleIcon,
  Article as ArticleIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  DesignServices as ServicesIcon,
  Add as AddIcon,
  Notifications as NotificationsIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as StatsIcon
} from '@mui/icons-material';

export default function DashboardPage() {
  // Datos de ejemplo - reemplaza con tus datos reales
  const stats = [
    { title: 'Usuarios', value: '1,245', icon: <PeopleIcon />, color: 'primary', progress: 75 },
    { title: 'Plantillas', value: '56', icon: <ArticleIcon />, color: 'secondary', progress: 45 },
    { title: 'Cursos', value: '23', icon: <SchoolIcon />, color: 'success', progress: 60 },
    { title: 'Entradas Blog', value: '89', icon: <EmailIcon />, color: 'warning', progress: 30 },
    { title: 'Servicios', value: '12', icon: <ServicesIcon />, color: 'error', progress: 90 },
  ];

  const recentActivities = [
    { id: 1, action: 'Nuevo usuario registrado', time: 'Hace 5 minutos', icon: <PeopleIcon color="primary" /> },
    { id: 2, action: 'Plantilla actualizada', time: 'Hace 30 minutos', icon: <ArticleIcon color="secondary" /> },
    { id: 3, action: 'Curso publicado', time: 'Hace 2 horas', icon: <SchoolIcon color="success" /> },
    { id: 4, action: 'Nueva entrada de blog', time: 'Ayer', icon: <EmailIcon color="warning" /> },
  ];

  const quickActions = [
    { label: 'Agregar usuario', icon: <AddIcon />, path: '/dashboard/usuarios/nuevo' },
    { label: 'Crear plantilla', icon: <AddIcon />, path: '/dashboard/plantillas/nueva' },
    { label: 'Programar curso', icon: <AddIcon />, path: '/dashboard/cursos/nuevo' },
    { label: 'Publicar entrada', icon: <AddIcon />, path: '/dashboard/blog/nueva' },
  ];

  return (
    <Box>
      {/* Encabezado */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4
      }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Panel de Administración
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Bienvenido de nuevo, aquí tienes un resumen de tu sitio
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          startIcon={<NotificationsIcon />}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            boxShadow: 'none'
          }}
        >
          Notificaciones
        </Button>
      </Box>

      {/* Estadísticas rápidas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Card sx={{ 
              height: '100%',
              boxShadow: 3,
              borderRadius: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  mb: 2
                }}>
                  <Avatar sx={{ 
                    backgroundColor: `${stat.color}.light`, 
                    color: `${stat.color}.main`,
                    width: 48,
                    height: 48
                  }}>
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h4" component="div">
                    {stat.value}
                  </Typography>
                </Box>
                <Typography variant="subtitle1" color="text.secondary">
                  {stat.title}
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={stat.progress} 
                  sx={{ 
                    mt: 2,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: `${stat.color}.light`,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: `${stat.color}.main`
                    }
                  }} 
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sección inferior con dos columnas */}
      <Grid container spacing={3}>
        {/* Columna izquierda - Acciones rápidas y estadísticas */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 3, p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Acciones Rápidas
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={action.icon}
                    sx={{
                      justifyContent: 'flex-start',
                      py: 2,
                      borderRadius: 2,
                      textTransform: 'none'
                    }}
                  >
                    {action.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Card>

          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Estadísticas Mensuales
            </Typography>
            <Box sx={{ height: 300, backgroundColor: 'grey.100', borderRadius: 2 }}>
              {/* Aquí iría tu gráfico - puedes usar Chart.js, ApexCharts, etc. */}
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <Typography color="text.secondary">
                  Gráfico de estadísticas (implementar con tu librería preferida)
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>

        {/* Columna derecha - Actividad reciente */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Actividad Reciente
            </Typography>
            <Stack spacing={3}>
              {recentActivities.map((activity) => (
                <Box key={activity.id}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar sx={{ 
                      width: 40, 
                      height: 40,
                      bgcolor: 'background.default'
                    }}>
                      {activity.icon}
                    </Avatar>
                    <Box>
                      <Typography fontWeight="medium">{activity.action}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.time}
                      </Typography>
                    </Box>
                  </Box>
                  {activity.id !== recentActivities.length && <Divider sx={{ mt: 2 }} />}
                </Box>
              ))}
            </Stack>
          </Card>

          <Card sx={{ mt: 3, p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Próximos Eventos
            </Typography>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main' }}>
                <CalendarIcon />
              </Avatar>
              <Box>
                <Typography fontWeight="medium">Reunión de equipo</Typography>
                <Typography variant="body2" color="text.secondary">
                  Hoy, 15:00 - 16:00
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Avatar sx={{ bgcolor: 'success.light', color: 'success.main' }}>
                <StatsIcon />
              </Avatar>
              <Box>
                <Typography fontWeight="medium">Reporte mensual</Typography>
                <Typography variant="body2" color="text.secondary">
                  Vence en 3 días
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}