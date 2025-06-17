import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';

const team = [
  {
    name: 'Carolina Fernández',
    img: '/team1.jpg',
  },
  {
    name: 'Carolina Berthelon',
    img: '/team2.jpg',
  },
];

function NuestroEquipoSection() {
  return (
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
          NUESTRO EQUIPO
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
          Somos Carolina Fernández y Carolina Berthelon, ingenieras en alimentos y fundadoras de Asegal B&F.
          Acompañamos a empresas del sector alimentario en su crecimiento, ofreciendo asesoría personalizada y experta en calidad, inocuidad y cumplimiento normativo. Nuestro compromiso es ayudarte a desarrollar productos seguros, confiables y alineados con los más altos estándares del mercado.
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
                  <Typography variant="body2" sx={{ color: '#555', textAlign: 'center' }}>
                    {member.desc}
                  </Typography>
                </Box>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Fade>
  );
}

export default NuestroEquipoSection;