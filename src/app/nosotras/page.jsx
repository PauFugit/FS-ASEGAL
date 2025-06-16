import React from 'react';
import BannerStatic from '@/components/BannerStatic';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Fade from '@mui/material/Fade';

function page() {
  const team = [
  {
    name: 'Carolina Fernández',
    role: 'Ingeniera en Alimentos y Fundadora',
    img: '/team1.jpg',
    desc: 'Apasionada por la cocina saludable y la innovación gastronómica.',
  },
  {
    name: 'Carolina Berthelon',
    role: 'Ingeniera en Alimentos y Fundadora',
    img: '/team2.jpg',
    desc: 'Emprendedora y amante de los sabores auténticos.',
  },
];
  return(
  <div>
    <BannerStatic
        image="bannerBlog.jpg"
        text="QUIENES SOMOS"
      />
  <Fade in timeout={1200}>
      <Box sx={{ py: 6, px: { xs: 2, md: 8 }, bgcolor: '#f5fafd' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: '#00325a',
            mb: 3,
            textAlign: 'center',
            letterSpacing: 2,
          }}
        >
          ASEGAL B & F ASESORÍAS
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: '#333',
            maxWidth: 700,
            mx: 'auto',
            mb: 5,
            textAlign: 'center',
            fontSize: '1.15rem',
          }}
        >
          Somos carolina Fernández y Carolina Berthelon, ingenieras en alimentos de profesión y fundadoras de Asegal B&F, comprometidas con el crecimiento y éxito de pequeñas, medianas y grandes empresas en la industria alimentaria.
          Con nuestra experiencia, cercanía y confianza brindamos asesoría personalizada y efectiva, para fortalecer tu negocio y garantizar la elaboración de productos seguros y confiables para tus clientes, promoviendo el cumplimiento de normas regulatorias, estándares de calidad y seguridad alimentaria.
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {team.map((member, idx) => (
            <Grid item xs={12} sm={6} md={4} key={idx}>
              <Fade in timeout={1000 + idx * 500}>
                <Box
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 3,
                    boxShadow: 3,
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.03)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <Avatar
                    src={member.img}
                    alt={member.name}
                    sx={{
                      width: 100,
                      height: 100,
                      mb: 2,
                      boxShadow: 2,
                      border: '4px solid #e3f2fd',
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: '#1565c0' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: '#43b36a', mb: 1 }}>
                    {member.role}
                  </Typography>
                
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  </div>
  )
}

export default page;