import PagoResultadoClient from './PagoResultadoClient';

export const metadata = {
  title: 'Resultado de tu pago',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PagoResultadoClient />;
}
