import BannerHomeDos from '@/components/BannerHomeDos'
import BannerStatic from '@/components/BannerStatic'
import CursosCapacitacionesSection from '@/components/CursosCapacitacionesSection'
import PlantillasHomeSection from '@/components/PlantillasHomeSection'
import ServiciosSection from '@/components/ServiciosPageSection'
import ContactoBanner from '@/components/ContactoBanner'
import React from 'react'
import BannerHomeUno from '@/components/BannerHomeUno'
import BannerHomeTres from '@/components/BannerHomeTres'

function page() {
  return (
    <div>
       <BannerStatic
        image="bannerServicios2.jpg"
        text="NUESTROS SERVICIOS"
      />
      <ServiciosSection/>
      <ContactoBanner/>
      <PlantillasHomeSection/>
      <CursosCapacitacionesSection/>

      <BannerHomeTres/>

    </div>
  )
}

export default page