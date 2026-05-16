// src/app/nosotras/page.jsx
export const metadata = {
  title: '¿Quiénes Somos?',
  description: 'Conoce a Asegal B&F, equipo experto en asesorías de seguridad alimentaria y calidad para empresas gastronómicas en Chile.',
  openGraph: {
    title: '¿Quiénes Somos? | Asegal B&F',
    description: 'Conoce a Asegal B&F, equipo experto en asesorías de seguridad alimentaria y calidad para empresas gastronómicas en Chile.',
    url: 'https://asegalbyfasesorias.cl/nosotras',
  },
  alternates: { canonical: 'https://asegalbyfasesorias.cl/nosotras' },
};

import AboutUs from '@/components/AboutUs';
import BannerStatic from '@/components/BannerStatic';
import BannerCierreDos from '@/components/BannerCierreDos';

export default function NosotrasPage() {
  return (
    <main>
      <BannerStatic
              image="bannerplus6.jpg"
              text="QUIÉNES SOMOS"
            />
      <AboutUs />
      <BannerCierreDos/>
    </main>
  );
}