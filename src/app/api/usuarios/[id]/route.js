// app/api/usuarios/[id]/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';

// Función para verificar autenticación (más flexible)
async function requireAuth() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { error: 'No autenticado', status: 401 };
    }

    return { user };
  } catch (error) {
    console.error('Error en requireAuth:', error);
    return { error: 'Error de autenticación', status: 500 };
  }
}

export async function GET(request, { params }) {
  try {
    // AWAIT params - Corregido para Next.js 15
    const { id } = await params;
    
    // Verificar autenticación
    const authCheck = await requireAuth();
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    // Buscar usuario por email (ya que el ID de Supabase es diferente al de tu DB)
    const userData = await prisma.Users.findFirst({
      where: { 
        OR: [
          { id: isNaN(parseInt(id)) ? undefined : parseInt(id) },
          { email: id }
        ]
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        username: true,
        phone: true,
        company: true,
        image: true,
        role: true,
        active: true,
        createdAt: true
      }
    });

    if (!userData) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // Permitir acceso si el usuario solicita sus propios datos O es ADMIN
    const isOwnData = authCheck.user.email === userData.email;
    
    // Verificar si el usuario autenticado es ADMIN
    const adminUser = await prisma.Users.findFirst({
      where: {
        email: authCheck.user.email,
        role: 'ADMIN',
        active: true,
      },
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
    // AWAIT params - Corregido para Next.js 15
    const { id } = await params;
    
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Verificar que el usuario actualice solo sus propios datos
    if (user.id !== id) {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    const data = await request.json();

    const updatedUser = await prisma.Users.update({
      where: { id: id }, // Usar el UUID directamente
      data: {
        name: data.name,
        lastname: data.lastname,
        phone: data.phone,
        image: data.image,
        company: data.company,
        companyEmail: data.companyEmail,
        companyPhone: data.companyPhone,
        companyRUT: data.companyRUT,
        driveURL: data.driveURL
      }
    });

    // No retornar la contraseña
    const { password, ...userWithoutPassword } = updatedUser;
    
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    // AWAIT params - Corregido para Next.js 15
    const { id } = await params;
    
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Verificar permisos de administrador
    const adminUser = await prisma.Users.findFirst({
      where: {
        email: user.email,
        role: 'ADMIN',
        active: true,
      },
    });

    if (!adminUser) {
      return NextResponse.json(
        { error: 'Acceso denegado: se requiere rol ADMIN' },
        { status: 403 }
      );
    }

    // Buscar el usuario en tu base de datos por email en lugar de ID
    const userToDelete = await prisma.Users.findFirst({
      where: {
        email: id // Ahora usamos el email como identificador
      }
    });

    if (!userToDelete) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    await prisma.Users.delete({
      where: { id: userToDelete.id } // Usar el ID numérico de tu base de datos
    });

    return NextResponse.json(
      { message: 'Usuario eliminado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}