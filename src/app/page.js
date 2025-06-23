import AboutUsSection from "@/components/AboutUsSection";
import BannerHomeUno from "@/components/BannerHomeUno";
import BannerHomeDos from "@/components/BannerHomeDos";
import BannerHomeTres from "@/components/BannerHomeTres";
import BannerNewsletter from "@/components/BannerNewsletter";
import BlogHomeSection from "@/components/BlogHomeSection";
import CardServicesSection from "@/components/CardServicesSection";
import ContactoSection from "@/components/ContactoSection";
import CursosCapacitacionesSection from "@/components/CursosCapacitacionesSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import NuestroEquipoSection from "@/components/NuestroEquipoSection";
import PlantillasHomeSection from "@/components/PlantillasHomeSection";
import Image from "next/image";
import BannerHome from "@/components/BannerHome";
import BannerCierre from "@/components/BannerCierre";


export default function Home() {
  return (
    <div>
    <BannerHome/>
    
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
