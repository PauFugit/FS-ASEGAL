import React from 'react';
import { Box, Typography } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import RoomIcon from '@mui/icons-material/Room';

function BannerHomeTres() {
  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: '#9FBA47',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-evenly',
        py: { xs: 3, sm: 2 },
        px: 2,
        gap: { xs: 3, sm: 0 },
      }}
    >
      {/* Atención Online */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: '50%',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <LaptopMacIcon sx={{ color: '#222', fontSize: 32 }} />
        </Box>
        <Typography
          sx={{
            color: '#fff',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            lineHeight: 1.2,
          }}
        >
          ATENCIÓN ONLINE<br />
          EN TODO CHILE
        </Typography>
      </Box>
      {/* Atención Presencial */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            bgcolor: '#fff',
            borderRadius: '50%',
            width: 56,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RoomIcon sx={{ color: '#222', fontSize: 32 }} />
        </Box>
        <Typography
          sx={{
            color: '#fff',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            lineHeight: 1.2,
          }}
        >
          ATENCIÓN PRESENCIAL<br />
          I Y II REGIÓN
        </Typography>
      </Box>
    </Box>
  );
}

export default BannerHomeTres;