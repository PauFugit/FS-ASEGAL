'use client';
import BannerStatic from '@/components/BannerStatic';
import PlantillasHomeSection from '@/components/PlantillasHomeSection';
import ContactoBanner from '@/components/ContactoBanner';
import BannerHomeTres from '@/components/BannerHomeTres';
import dynamic from 'next/dynamic';

const CursosCapacitacionesSection = dynamic(() => import('@/components/CursosCapacitacionesSection'), { ssr: false });
const ServiciosOld = dynamic(() => import('@/components/ServiciosOld'), { ssr: false });

export default function ServiciosClient() {
  return (
    <div>
      <BannerStatic
        image="bannerServicios2.jpg"
        text="NUESTROS SERVICIOS"
      />
      <ServiciosOld/>
      <ContactoBanner/>
      <PlantillasHomeSection/>
      <CursosCapacitacionesSection/>
      <BannerHomeTres/>
    </div>
  );
}