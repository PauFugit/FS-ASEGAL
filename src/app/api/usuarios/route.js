import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { createSupabaseAdminClient } from '@/lib/supabaseServerClient'; // ← Cambiado

// Función para verificar si el usuario es ADMIN (modificada para permitir crear primer usuario)
async function requireAdmin() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return { error: 'No autenticado', status: 401 };
    }

    // Verificar si existe algún usuario en la base de datos
    const userCount = await prisma.Users.count();
    
    // Si no hay usuarios, permitir acceso (para crear el primer usuario)
    if (userCount === 0) {
      return { user: { email: user.email } };
    }

    // Si ya hay usuarios, verificar que sea ADMIN
    const adminUser = await prisma.Users.findFirst({
      where: {
        email: user.email,
        role: 'ADMIN',
        active: true,
      },
    });

    if (!adminUser) {
      return { error: 'Acceso denegado: se requiere rol ADMIN', status: 403 };
    }

    return { user: adminUser };
  } catch (error) {
    console.error('Error en requireAdmin:', error);
    return { error: 'Error de autenticación', status: 500 };
  }
}

export async function GET() {
  try {
    // Verificar permisos
    const authCheck = await requireAdmin();
    if (authCheck.error) {
      return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
    }

    const users = await prisma.Users.findMany({
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        username: true,
        role: true,
        active: true,
        phone: true,
        company: true,
        image: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    });

    // Formatear para el frontend del dashboard
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
  } catch(error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    // Verificar si ya existe algún usuario
    const userCount = await prisma.Users.count();
    
    // Si es el primer usuario, asignar automáticamente rol ADMIN
    // Si no es el primer usuario, verificar permisos de ADMIN
    if (userCount > 0) {
      const authCheck = await requireAdmin();
      if (authCheck.error) {
        return NextResponse.json({ error: authCheck.error }, { status: authCheck.status });
      }
    }

    // Validar username único
    const existingUser = await prisma.Users.findUnique({
      where: { username: data.username }
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 400 }
      );
    }

    // Validar email único
    const existingEmail = await prisma.Users.findUnique({
      where: { email: data.email }
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      );
    }

    // 1. PRIMERO crear el usuario en Supabase Auth
    const supabase = await createSupabaseServerClient();
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true, // Confirmar el email automáticamente
      user_metadata: {
        name: data.name,
        lastname: data.lastname
      }
    });

    if (authError) {
      console.error('Error creando usuario en Supabase Auth:', authError);
      return NextResponse.json(
        { error: 'Error al crear usuario: ' + authError.message },
        { status: 400 }
      );
    }

    // 2. Hash de la contraseña para guardar en tu base de datos
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // 3. LUEGO crear el usuario en tu base de datos Prisma
    const userData = userCount === 0 
      ? { 
          ...data, 
          password: hashedPassword, 
          role: 'ADMIN', 
          active: true,
          supabaseId: authData.user.id // Guardar el ID de Supabase
        }
      : { 
          ...data, 
          password: hashedPassword, 
          active: true,
          supabaseId: authData.user.id // Guardar el ID de Supabase
        };

    const user = await prisma.Users.create({
      data: userData
    });

    // Formatear respuesta para el dashboard
    const formattedUser = {
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
    };

    return NextResponse.json(formattedUser, { status: 201 });
  } catch(error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    // Verificar permisos
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

    const updatedUser = await prisma.Users.update({
      where: { id: id }, // Usar el UUID directamente
      data: updateData
    });

    // Formatear respuesta
    const formattedUser = {
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
    };

    return NextResponse.json(formattedUser, { status: 200 });
  } catch (error) {
    console.error('Error actualizando usuario:', error);
    
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