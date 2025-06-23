'use client'
import BannerStatic from '@/components/BannerStatic'
import ServiciosPageSection from '@/components/ServiciosPageSection'
import CotizaSection from '@/components/CotizaSection'
import React from 'react'
import ServiciosSection from '@/components/ServiciosPageSection'

function page() {
  return (
    <>
    <BannerStatic
        image="bannerservicios.jpg"
        text="COTIZA NUESTROS SERVICIOS"
      />
    <CotizaSection/>

    </>
  )
}

export default page