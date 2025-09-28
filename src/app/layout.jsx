import ClientLayout from './client-layout';

export const metadata = {
  title: "Asegal B&F",
  description: "Asesorías para el aseguramiento de calidad para empresas gastronómicas, expertas en garantizar la seguridad alimentaria y el cumplimiento regulatorio",
};

export default function RootLayout({ children }) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}