import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: 'No autenticado', status: 401 };
  return { user: session.user };
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const authCheck = await requireAuth();
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const userData = await prisma.Users.findFirst({
      where: {
        OR: [
          { id: isNaN(parseInt(id)) ? undefined : parseInt(id) },
          { email: id },
        ],
      },
      select: { id: true, name: true, lastname: true, email: true, username: true, phone: true, company: true, image: true, role: true, active: true, createdAt: true },
    });

    if (!userData) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    const isOwnData = authCheck.user.email === userData.email;
    const adminUser = await prisma.Users.findFirst({
      where: { email: authCheck.user.email, role: 'ADMIN', active: true },
    });

    if (!isOwnData && !adminUser) {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const authCheck = await requireAuth();
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    // Verificar que el usuario actualice sus propios datos o sea ADMIN
    const adminUser = await prisma.Users.findFirst({
      where: { email: authCheck.user.email, role: 'ADMIN', active: true },
    });
    const targetUser = await prisma.Users.findUnique({ where: { id: parseInt(id) } });
    const isOwnData = targetUser?.email === authCheck.user.email;

    if (!isOwnData && !adminUser) {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    const data = await request.json();

    const updatedUser = await prisma.Users.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        lastname: data.lastname,
        phone: data.phone,
        image: data.image,
        company: data.company,
        companyEmail: data.companyEmail,
        companyPhone: data.companyPhone,
        companyRUT: data.companyRUT,
        driveURL: data.driveURL,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const adminUser = await prisma.Users.findFirst({
      where: { email: session.user.email, role: 'ADMIN', active: true },
    });
    if (!adminUser) {
      return NextResponse.json({ error: 'Acceso denegado: se requiere rol ADMIN' }, { status: 403 });
    }

    const userToDelete = await prisma.Users.findFirst({ where: { email: id } });
    if (!userToDelete) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    await prisma.Users.delete({ where: { id: userToDelete.id } });

    return NextResponse.json({ message: 'Usuario eliminado correctamente' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
