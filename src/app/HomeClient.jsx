'use client';
import dynamic from "next/dynamic";
import AboutUsSection from "@/components/AboutUsSection";
import BannerHomeUno from "@/components/BannerHomeUno";
import BannerHomeDos from "@/components/BannerHomeDos";
import BannerHomeTres from "@/components/BannerHomeTres";
import BannerNewsletter from "@/components/BannerNewsletter";
import BlogHomeSection from "@/components/BlogHomeSection";
import NuestroEquipoSection from "@/components/NuestroEquipoSection";
import PlantillasHomeSection from "@/components/PlantillasHomeSection";
import BannerCierre from "@/components/BannerCierre";
import BannerHomePpal from "@/components/BannerHomePpal";

const CardServicesSection = dynamic(() => import('@/components/CardServicesSection'), { ssr: false });
const CursosCapacitacionesSection = dynamic(() => import('@/components/CursosCapacitacionesSection'), { ssr: false });
const ContactoSection = dynamic(() => import('@/components/ContactoSection'), { ssr: false });

export default function HomeClient() {
  return (
    <div>
      <BannerHomePpal/>
      <CardServicesSection/>
      <AboutUsSection/>
      <NuestroEquipoSection/>
      <BannerHomeUno/>
      <BlogHomeSection/>
      <BannerNewsletter/>
      <PlantillasHomeSection/>
      <CursosCapacitacionesSection/>
      <BannerHomeDos/>
      <ContactoSection/>
      <BannerHomeTres/>
      <BannerCierre/>
    </div>
  );
}