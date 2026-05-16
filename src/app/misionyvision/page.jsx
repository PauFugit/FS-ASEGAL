import MisionVisionClient from './MisionVisionClient';

export const metadata = {
  title: 'Misión y Visión',
  description: 'Conoce la misión y visión de Asegal B&F: ser referentes en asesorías de seguridad alimentaria en Chile, garantizando calidad y cumplimiento normativo.',
  openGraph: {
    title: 'Misión y Visión | Asegal B&F',
    description: 'Conoce la misión y visión de Asegal B&F: ser referentes en asesorías de seguridad alimentaria en Chile.',
    url: 'https://asegalbyfasesorias.cl/misionyvision',
  },
  alternates: { canonical: 'https://asegalbyfasesorias.cl/misionyvision' },
};

export default function Page() {
  return <MisionVisionClient />;
}
