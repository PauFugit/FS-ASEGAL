// src/app/api/admin/check/route.js
import { prisma } from '@/lib/prisma'
import { createClient } from '@/lib/supabaseServerClient' // ✅ Correcto — es un Server Component


export async function GET() {
  try {
    // 1. Obtener token de cookies (ajusta según tu sistema de autenticación)
    const token = cookies().get('token')?.value

    if (!token) {
      return Response.json({ error: 'No autenticado' }, { status: 401 })
    }

    // 2. Buscar usuario por token (en tu caso, usas resetToken como ejemplo)
    // ⚠️ REEMPLAZA ESTO con tu sistema real de autenticación (JWT, Supabase Auth, etc.)
    const user = await prisma.Users.findFirst({
      where: {
        resetToken: token, // ⚠️ Esto es SOLO para prueba. Reemplázalo.
        active: true,
      },
    })

    if (!user) {
      return Response.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    // 3. Verificar rol
    if (user.role !== 'ADMIN') {
      return Response.json({ error: 'Acceso denegado: se requiere rol ADMIN' }, { status: 403 })
    }

    // 4. Devolver datos del usuario (sin contraseña)
    const { password, resetToken, resetTokenExpires, ...safeUser } = user

    return Response.json({
      user: safeUser
    })

  } catch (error) {
    console.error('Error en /api/admin/check:', error)
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}