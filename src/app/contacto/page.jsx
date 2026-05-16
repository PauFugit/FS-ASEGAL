export const metadata = {
  title: 'Contacto',
  description: 'Contáctanos para resolver tus dudas sobre seguridad alimentaria. Atención presencial en I y IV Región y online en todo Chile.',
  openGraph: {
    title: 'Contacto | Asegal B&F',
    description: 'Contáctanos para resolver tus dudas sobre seguridad alimentaria. Atención presencial en I y IV Región y online en todo Chile.',
    url: 'https://asegalbyfasesorias.cl/contacto',
  },
  alternates: { canonical: 'https://asegalbyfasesorias.cl/contacto' },
};

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
        image="bannerextra2.jpg"
        text="CONTÁCTANOS"
      />
      <ContactoSection/>
      <BannerCotizacion/>
      </div>
  )
}

export default page