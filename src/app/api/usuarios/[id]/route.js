// app/api/usuarios/[id]/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';

export async function GET(request, { params }) {
  try {
    const supabase = await createSupabaseServerClient();
    
    // Usar getUser() en lugar de getSession()
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Verificar que el usuario acceda solo a sus propios datos
    if (user.id !== params.id) {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    const userData = await prisma.Users.findUnique({
      where: { id: parseInt(params.id) }
    });

    if (!userData) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    // No retornar la contraseña
    const { password, ...userWithoutPassword } = userData;
    
    return NextResponse.json({ data: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const supabase = await createSupabaseServerClient();
    
    // Usar getUser() en lugar de getSession()
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Verificar que el usuario actualice solo sus propios datos
    if (user.id !== params.id) {
      return NextResponse.json({ error: 'Acceso denegado' }, { status: 403 });
    }

    const data = await request.json();
    const id = parseInt(params.id);

    const updatedUser = await prisma.Users.update({
      where: { id },
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

// DELETE - Eliminar usuario (también corregido)
export async function DELETE(request, { params }) {
  try {
    const supabase = await createSupabaseServerClient();
    
    // Usar getUser() en lugar de getSession()
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

    const id = parseInt(params.id);
    
    await prisma.Users.delete({
      where: { id }
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