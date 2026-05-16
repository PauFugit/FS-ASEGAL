import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session) return { error: 'No autenticado', status: 401 };

  const userCount = await prisma.Users.count();
  if (userCount === 0) return { user: { email: session.user.email } };

  const adminUser = await prisma.Users.findFirst({
    where: { email: session.user.email, role: 'ADMIN', active: true },
  });

  if (!adminUser) return { error: 'Acceso denegado: se requiere rol ADMIN', status: 403 };
  return { user: adminUser };
}

export async function GET() {
  try {
    const authCheck = await requireAdmin();
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const users = await prisma.Users.findMany({
      select: { id: true, name: true, lastname: true, email: true, username: true, role: true, active: true, phone: true, company: true, image: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });

    const formattedUsers = users.map(user => ({
      id: user.id,
      name: `${user.name} ${user.lastname}`.trim(),
      email: user.email,
      username: user.username,
      role: user.role,
      status: user.active ? 'active' : 'inactive',
      avatar: user.image || (user.name?.charAt(0) || 'U').toUpperCase(),
      phone: user.phone,
      company: user.company,
      createdAt: user.createdAt,
      image: user.image,
    }));

    return NextResponse.json({ data: formattedUsers }, { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    const userCount = await prisma.Users.count();
    if (userCount > 0) {
      const authCheck = await requireAdmin();
      if (authCheck.error) {
        return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
      }
    }

    const existingUser = await prisma.Users.findUnique({ where: { username: data.username } });
    if (existingUser) {
      return NextResponse.json({ error: 'El usuario ya existe' }, { status: 400 });
    }

    const existingEmail = await prisma.Users.findUnique({ where: { email: data.email } });
    if (existingEmail) {
      return NextResponse.json({ error: 'El email ya está registrado' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userData = userCount === 0
      ? { ...data, password: hashedPassword, role: 'ADMIN', active: true }
      : { ...data, password: hashedPassword, active: true };

    // Eliminar supabaseId si viene en los datos
    delete userData.supabaseId;

    const user = await prisma.Users.create({ data: userData });

    return NextResponse.json({
      id: user.id,
      name: `${user.name} ${user.lastname}`.trim(),
      email: user.email,
      username: user.username,
      role: user.role,
      status: user.active ? 'active' : 'inactive',
      avatar: user.image || (user.name?.charAt(0) || 'U').toUpperCase(),
      phone: user.phone,
      company: user.company,
      createdAt: user.createdAt,
      image: user.image,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const authCheck = await requireAdmin();
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const data = await request.json();
    const { id, ...updateData } = data;

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    } else {
      delete updateData.password;
    }

    const updatedUser = await prisma.Users.update({ where: { id }, data: updateData });

    return NextResponse.json({
      id: updatedUser.id,
      name: `${updatedUser.name} ${updatedUser.lastname}`.trim(),
      email: updatedUser.email,
      username: updatedUser.username,
      role: updatedUser.role,
      status: updatedUser.active ? 'active' : 'inactive',
      avatar: updatedUser.image || (updatedUser.name?.charAt(0) || 'U').toUpperCase(),
      phone: updatedUser.phone,
      company: updatedUser.company,
      createdAt: updatedUser.createdAt,
      image: updatedUser.image,
    }, { status: 200 });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
