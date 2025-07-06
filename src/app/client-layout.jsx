'use client'

import Providers from "@/providers/Providers";
import Footer from "@/components/Footer";
import BannerSuperiorRRSS from "@/components/BannerSuperiorRRSS";
import FloatingButtons from "@/components/FloatingButtons";
import dynamic from 'next/dynamic';

// Carga dinámica del Navbar con SSR deshabilitado
const Navbar = dynamic(() => import('@/components/Navbar'), { 
  ssr: false,
  loading: () => (
    <div style={{ height: '80px', backgroundColor: 'white', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }} />
  )
});

export default function ClientLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <BannerSuperiorRRSS/>
          <Navbar/>
          {children}
          <Footer/>
          <FloatingButtons/>
        </Providers>
      </body>
    </html>
  );
}