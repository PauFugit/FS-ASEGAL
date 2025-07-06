import ClientLayout from './client-layout';

export const metadata = {
  title: "Asegal B&F",
  description: "Asesorías para el aseguramiento de calidad...",
};

export default function RootLayout({ children }) {
  return (
    <ClientLayout>
      {children}
    </ClientLayout>
  );
}