import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return Response.json({ error: 'No autenticado' }, { status: 401 });
    }

    const user = await prisma.Users.findFirst({
      where: { email: session.user.email, role: 'ADMIN', active: true },
    });

    if (!user) {
      return Response.json({ error: 'Acceso denegado: se requiere rol ADMIN' }, { status: 403 });
    }

    const { password, resetToken, resetTokenExpires, ...safeUser } = user;
    return Response.json({ user: safeUser });

  } catch (error) {
    console.error('Error en /api/admin/check:', error);
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
