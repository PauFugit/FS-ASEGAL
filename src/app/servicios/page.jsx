import ServiceClient from './ServiceClient';

export const metadata = {
  title: 'Servicios',
  description: 'Tramitación de Resolución Sanitaria, Sistemas de Gestión de Calidad, Auditorías y Etiquetado Nutricional para empresas gastronómicas en Chile.',
  openGraph: {
    title: 'Servicios | Asegal B&F',
    description: 'Tramitación de Resolución Sanitaria, Sistemas de Gestión de Calidad, Auditorías y Etiquetado Nutricional para empresas gastronómicas en Chile.',
    url: 'https://asegalbyfasesorias.cl/servicios',
  },
  alternates: { canonical: 'https://asegalbyfasesorias.cl/servicios' },
};

export default function Page() {
  return <ServiceClient />;
}