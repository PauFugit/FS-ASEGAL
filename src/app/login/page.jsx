import LoginClient from './LoginClient';

export const metadata = {
  title: 'Iniciar Sesión',
  description: 'Accede al panel de administración de Asegal B&F.',
  robots: { index: false, follow: false },
};

export default function Page() {
  return <LoginClient />;
}
