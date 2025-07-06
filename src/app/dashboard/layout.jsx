'use client';

import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import TopBarDashboard from '@/components/dashboard/TopBarDashboard';
import Providers from '@/providers/Providers';

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Providers>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <TopBarDashboard 
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
            <SidebarDashboard 
              isSidebarOpen={isSidebarOpen}
              isMobileSidebarOpen={isMobileSidebarOpen}
              setIsMobileSidebarOpen={setIsMobileSidebarOpen}
            />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${isSidebarOpen ? 240 : 0}px)` },
                transition: 'all 0.3s ease',
                backgroundColor: '#f5f7fa',
                minHeight: '100vh'
              }}
            >
              {children}
            </Box>
          </Box>
        </Providers>
      </body>
    </html>
  );
}