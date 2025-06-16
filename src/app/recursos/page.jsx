import PlantillasHomeSection from '@/components/PlantillasHomeSection'
import CursosCapacitacionesSection from '@/components/CursosCapacitacionesSection'
import BannerHomeDos from '@/components/BannerHomeDos'
import React from 'react'
import BannerStatic from '@/components/BannerStatic'

function page() {
  return (
    <div>
    <BannerStatic
        image="bannerBlog.jpg"
        text="RECURSOS COMPLEMENTARIOS"
      />
    <CursosCapacitacionesSection/>
 
      </div>
  )
}

export default page