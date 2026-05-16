import CotizaClient from './CotizaClient';

export const metadata = {
  title: 'Cotiza',
  description: 'Solicita una cotización personalizada para tus asesorías en seguridad alimentaria. Resolución Sanitaria, Etiquetado Nutricional, Auditorías y más.',
  openGraph: {
    title: 'Cotiza | Asegal B&F',
    description: 'Solicita una cotización personalizada para tus asesorías en seguridad alimentaria.',
    url: 'https://asegalbyfasesorias.cl/cotiza',
  },
  alternates: { canonical: 'https://asegalbyfasesorias.cl/cotiza' },
};

export default function Page() {
  return <CotizaClient />;
}
