import PoliticasClient from './PoliticasClient';

export const metadata = {
  title: 'Políticas de Privacidad',
  description: 'Lee las políticas de privacidad y tratamiento de datos personales de Asegal B&F.',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://asegalbyfasesorias.cl/politicasdeprivacidad' },
};

export default function Page() {
  return <PoliticasClient />;
}
