'use client'
import BannerStatic from '@/components/BannerStatic'
import { Box, Typography, Stack } from '@mui/material'
import BannerRecursos from '@/components/BannerRecursos';
import BannerCierreCuatro from '@/components/BannerCierreCuatro';
import dynamic from 'next/dynamic';


const PlantillasPageSection = dynamic(() => import('@/components/PlantillasPageSection'), { ssr: false });
const CursosCapacitacionesPageSection = dynamic(() => import('@/components/CursosCapacitacionesPageSection'), { ssr: false });


function page() {

  return (
    <div>
      <BannerStatic
        image="bannerrecursos2.jpg"
        text="RECURSOS COMPLEMENTARIOS"
      />
      <PlantillasPageSection />
      <CursosCapacitacionesPageSection />
      <BannerRecursos/>
      <BannerCierreCuatro />
    </div>
  )
}

export default page