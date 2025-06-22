// src/app/nosotras/page.jsx
import ContactForm from '@/components/ContactForm';
import AboutUs from '../../components/AboutUs';
import BannerStatic from '../../components/BannerStatic';

export default function NosotrasPage() {
  return (
    <main>
      <BannerStatic
              image="bannerNosotras.jpg"
              text="QUIÉNES SOMOS"
            />
      <AboutUs />
    </main>
  );
}