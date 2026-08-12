'use client'
import BannerStatic from '@/components/BannerStatic'
import CotizaSection from '@/components/CotizaSection'
import React, { Suspense } from 'react'


function page() {
  return (
    <>
    <BannerStatic
        image="bannerservicios.jpg"
        text="COTIZA NUESTROS SERVICIOS"
      />
    <Suspense fallback={null}>
      <CotizaSection/>
    </Suspense>

    </>
  )
}

export default page