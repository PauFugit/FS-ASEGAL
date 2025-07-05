import PlantillasPageSection from '@/components/PlantillasPageSection'
import React from 'react'
import BannerStatic from '@/components/BannerStatic'
import { Box, Typography, Stack } from '@mui/material'
import BannerRecursos from '@/components/BannerRecursos';
import BannerCierreCuatro from '@/components/BannerCierreCuatro';
import CursosCapacitacionesPageSection from '@/components/CursosCapacitacionesPageSection'

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