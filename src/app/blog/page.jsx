import BlogClient from './BlogClient';

export const metadata = {
  title: 'Blog',
  description: 'Novedades, consejos y artículos sobre seguridad alimentaria, calidad gastronómica y normativa sanitaria en Chile.',
  openGraph: {
    title: 'Blog | Asegal B&F',
    description: 'Novedades, consejos y artículos sobre seguridad alimentaria, calidad gastronómica y normativa sanitaria en Chile.',
    url: 'https://asegalbyfasesorias.cl/blog',
  },
  alternates: { canonical: 'https://asegalbyfasesorias.cl/blog' },
};

export default function Page() {
  return <BlogClient />;
}
