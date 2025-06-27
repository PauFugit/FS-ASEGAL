// src/app/nosotras/page.jsx
import AboutUs from '../../components/AboutUs';
import BannerStatic from '../../components/BannerStatic';
import BannerCierreDos from '@/components/BannerCierreDos';

export default function NosotrasPage() {
  return (
    <main>
      <BannerStatic
              image="bannerNosotras.jpg"
              text="QUIÉNES SOMOS"
            />
      <AboutUs />
      <BannerCierreDos/>
    </main>
  );
}