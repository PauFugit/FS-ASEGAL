'use client';

import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardActionArea,
  Container,
  useTheme,
  useMediaQuery,
  keyframes
} from '@mui/material';
import { 
  Article as BlogIcon,
  Description as TemplatesIcon,
  School as CoursesIcon,
  People as UsersIcon
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { styled } from '@mui/system';

// Animación de flotación para las tarjetas
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Animación de entrada para el título
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Animación de entrada escalonada para las tarjetas
const slideIn = keyframes`
  from { opacity: 0; transform: translateY(30px) scale(0.8); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

// Componente de tarjeta circular animada con styled
const AnimatedCard = styled(Card)(({ theme, delay }) => ({
  borderRadius: '50%',
  width: theme.breakpoints.values.xs ? 120 : 150,
  height: theme.breakpoints.values.xs ? 120 : 150,
  boxShadow: theme.shadows[3],
  animation: `${slideIn} 0.6s ease-out ${delay}ms both, ${floatAnimation} 3s ease-in-out ${delay + 600}ms infinite`,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[6],
    transform: 'scale(1.05) rotate(2deg)',
    animation: `${floatAnimation} 1.5s ease-in-out infinite`,
  },
  [theme.breakpoints.up('md')]: {
    width: 170,
    height: 170,
  }
}));

const AnimatedTitle = styled(Typography)({
  animation: `${fadeIn} 0.8s ease-out`,
});

const DashboardCard = ({ title, path, icon: Icon, color, delay }) => {
  const router = useRouter();
  const theme = useTheme();
  
  return (
    <AnimatedCard delay={delay} sx={{ backgroundColor: color }}>
      <CardActionArea 
        onClick={() => router.push(path)}
        sx={{ 
          width: '100%', 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          padding: 2,
          color: 'white',
          '&:hover': {
            backgroundColor: theme.palette[color.split('.')[0]]?.dark || color,
          }
        }}
      >
        <Icon sx={{ 
          fontSize: { xs: 40, sm: 50, md: 60 }, 
          mb: 1 
        }} />
        <Typography 
          variant="body2" 
          sx={{ 
            fontSize: { xs: '0.75rem', sm: '0.85rem', md: '0.9rem' },
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.2
          }}
        >
          {title}
        </Typography>
      </CardActionArea>
    </AnimatedCard>
  );
};

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user: userData } } = await supabase.auth.getUser();
        if (userData) {
          setUser(userData);
          
          // Obtener nombre completo del usuario
          const name = userData.user_metadata?.name || '';
          const lastname = userData.user_metadata?.lastname || '';
          const fullName = `${name} ${lastname}`.trim();
          
          if (fullName) {
            setUserName(fullName);
          } else {
            setUserName(userData.email?.split('@')[0] || 'Usuario');
          }
        }
      } catch (error) {
        console.error('Error obteniendo usuario:', error);
      }
    };

    getUser();
  }, []);

  const dashboardItems = [
    {
      title: 'BLOG',
      path: '/dashboard/blog',
      icon: BlogIcon,
      color: theme.palette.primary.main,
      delay: 100
    },
    {
      title: 'PLANTILLAS',
      path: '/dashboard/plantillas',
      icon: TemplatesIcon,
      color: theme.palette.secondary.main,
      delay: 200
    },
    {
      title: 'CURSOS',
      path: '/dashboard/cursos',
      icon: CoursesIcon,
      color: theme.palette.info.main,
      delay: 300
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Encabezado de bienvenida */}
      <Box textAlign="center" mb={6}>
        <AnimatedTitle 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: theme.palette.primary.main,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          ¡Bienvenido{userName ? `, ${userName}` : ''}!
        </AnimatedTitle>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ 
            fontSize: { xs: '1rem', sm: '1.2rem' },
            animation: `${fadeIn} 1s ease-out 0.2s both`
          }}
        >
          Gestiona tu contenido desde el panel de administración
        </Typography>
      </Box>

      {/* Grid de tarjetas circulares */}
      <Grid 
        container 
        spacing={4} 
        justifyContent="center"
        sx={{ 
          mt: 2,
          px: { xs: 2, sm: 0 }
        }}
      >
        {dashboardItems.map((item, index) => (
          <Grid 
            item 
            key={item.title} 
            xs={6} 
            sm={4} 
            md={3}
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              mb: { xs: 2, sm: 0 }
            }}
          >
            <DashboardCard
              title={item.title}
              path={item.path}
              icon={item.icon}
              color={item.color}
              delay={item.delay}
            />
          </Grid>
        ))}
      </Grid>

      {/* Mensaje adicional */}
      <Box 
        textAlign="center" 
        mt={8}
        sx={{ 
          backgroundColor: 'grey.50', 
          p: 3, 
          borderRadius: 2,
          mx: { xs: 2, sm: 0 },
          animation: `${fadeIn} 1s ease-out 0.8s both`
        }}
      >
        <Typography variant="body1" color="text.secondary">
          Selecciona una categoría para comenzar a gestionar tu contenido. 
          Cada sección te permite crear, editar y eliminar elementos específicos.
        </Typography>
      </Box>
    </Container>
  );
}