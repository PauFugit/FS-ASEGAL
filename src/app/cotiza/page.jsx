'use client'
import BannerStatic from '@/components/BannerStatic'
import CotizaSection from '@/components/CotizaSection'
import React from 'react'


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