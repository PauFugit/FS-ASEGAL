// src/lib/auth.js
import { prisma } from './prisma'

// Simulación: obtiene usuario por token o sesión
// En producción, aquí usarías JWT, cookies, o Supabase Auth
export async function getCurrentUser(token) {
  if (!token) return null

  // Ejemplo: buscar usuario por resetToken temporal (solo para prueba)
  // En tu app real, deberías usar sesiones, JWT, o Supabase Auth
  const user = await prisma.Users.findFirst({
    where: {
      resetToken: token, // ⚠️ Esto es SOLO para ejemplo. Reemplázalo con tu sistema real.
      active: true,
    },
  })

  return user
}

// Middleware para proteger rutas de ADMIN
export async function requireAdmin(token) {
  const user = await getCurrentUser(token)

  if (!user) {
    throw new Error('No autenticado')
  }

  if (user.role !== 'ADMIN') {
    throw new Error('Acceso denegado: se requiere rol ADMIN')
  }

  return user
}