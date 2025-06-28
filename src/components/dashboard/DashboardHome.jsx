import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar, 
  LinearProgress
} from '@mui/material';
import {
  People as PeopleIcon,
  Article as ArticleIcon,
  School as SchoolIcon,
  Email as EmailIcon,
  DesignServices as ServicesIcon
} from '@mui/icons-material';

const DashboardHome = () => {
  const stats = [
    { title: 'Usuarios', value: '1,245', icon: <PeopleIcon />, color: 'primary.main', progress: 75 },
    { title: 'Plantillas', value: '56', icon: <ArticleIcon />, color: 'secondary.main', progress: 45 },
    { title: 'Cursos', value: '23', icon: <SchoolIcon />, color: 'success.main', progress: 60 },
    { title: 'Entradas Blog', value: '89', icon: <EmailIcon />, color: 'warning.main', progress: 30 },
    { title: 'Servicios', value: '12', icon: <ServicesIcon />, color: 'error.main', progress: 90 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Resumen General
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Bienvenido al panel de administración. Aquí puedes gestionar todos los aspectos de tu sitio web.
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <Card sx={{ 
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
                    color: `${stat.color}.dark`,
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
    </Box>
  );
};

export default DashboardHome;