import ClientLayout from './client-layout';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Asegal B&F',
  description: 'Asesorías especializadas en seguridad alimentaria y calidad para empresas gastronómicas.',
  url: 'https://asegalbyfasesorias.cl',
  email: 'contacto@asegalbyfasesorias.cl',
  telephone: '+56994928092',
  areaServed: 'Chile',
  serviceType: ['Resolución Sanitaria', 'Etiquetado Nutricional', 'Auditorías', 'Sistemas de Gestión de Calidad'],
  sameAs: ['https://www.instagram.com/asegalbf'],
};

const BASE_URL = 'https://asegalbyfasesorias.cl';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Asegal B&F | Asesorías en Seguridad Alimentaria',
    template: '%s | Asegal B&F',
  },
  description: 'Asesorías especializadas en seguridad alimentaria y calidad para empresas gastronómicas. Tramitación de Resolución Sanitaria, Etiquetado Nutricional, Auditorías y más. Atención en I y IV Región y online en todo Chile.',
  keywords: ['seguridad alimentaria', 'asesorías gastronómicas', 'resolución sanitaria', 'etiquetado nutricional', 'auditorías alimentarias', 'calidad alimentaria', 'Chile', 'ASEGAL'],
  authors: [{ name: 'Asegal B&F' }],
  creator: 'Asegal B&F',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: BASE_URL,
    siteName: 'Asegal B&F',
    title: 'Asegal B&F | Asesorías en Seguridad Alimentaria',
    description: 'Asesorías especializadas en seguridad alimentaria y calidad para empresas gastronómicas. Atención presencial I y IV Región y online en todo Chile.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Asegal B&F Asesorías' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Asegal B&F | Asesorías en Seguridad Alimentaria',
    description: 'Asesorías especializadas en seguridad alimentaria y calidad para empresas gastronómicas.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}