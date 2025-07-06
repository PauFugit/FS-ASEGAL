import AboutUsSection from "@/components/AboutUsSection";
import BannerHomeUno from "@/components/BannerHomeUno";
import BannerHomeDos from "@/components/BannerHomeDos";
import BannerHomeTres from "@/components/BannerHomeTres";
import BannerNewsletter from "@/components/BannerNewsletter";
import BlogHomeSection from "@/components/BlogHomeSection";
import CardServicesSection from "@/components/CardServicesSection";
import ContactoSection from "@/components/ContactoSection";
import CursosCapacitacionesSection from "@/components/CursosCapacitacionesSection";
import NuestroEquipoSection from "@/components/NuestroEquipoSection";
import PlantillasHomeSection from "@/components/PlantillasHomeSection";
import BannerCierre from "@/components/BannerCierre";
import BannerHomePpal from "@/components/BannerHomePpal";


export default function Home() {
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
