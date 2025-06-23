import ContactForm from '@/components/ContactForm'
import BannerStatic from '@/components/BannerStatic'
import React from 'react'
import ContactoSection from '@/components/ContactoSection'
import BannerCotizacion from '@/components/BannerCotizacion'
import BannerHomeTres from '@/components/BannerHomeTres'
import CotizaSection from '@/components/CotizaSection'

function page() {
  return (
    <div> <BannerStatic
        image="bannerBlog.jpg"
        text="CONTÁCTANOS"
      />
      <ContactoSection/>
      <BannerCotizacion/>
      </div>
  )
}

export default page