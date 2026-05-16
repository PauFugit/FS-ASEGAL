import HomeClient from './HomeClient';

export const metadata = {
  title: 'Inicio',
  description: 'Asegal B&F — Asesorías especializadas en seguridad alimentaria para empresas gastronómicas. Resolución Sanitaria, Etiquetado Nutricional, Auditorías y más. Atención en I y IV Región y online en todo Chile.',
  alternates: { canonical: 'https://asegalbyfasesorias.cl' },
};

export default function Home() {
  return <HomeClient />;
}