import RecursosClient from './RecursosClient';

export const metadata = {
  title: 'Recursos',
  description: 'Descarga plantillas gratuitas de control de calidad alimentaria y accede a cursos y capacitaciones en seguridad alimentaria.',
  openGraph: {
    title: 'Recursos | Asegal B&F',
    description: 'Descarga plantillas gratuitas de control de calidad alimentaria y accede a cursos y capacitaciones en seguridad alimentaria.',
    url: 'https://asegalbyfasesorias.cl/recursos',
  },
  alternates: { canonical: 'https://asegalbyfasesorias.cl/recursos' },
};

export default function Page() {
  return <RecursosClient />;
}