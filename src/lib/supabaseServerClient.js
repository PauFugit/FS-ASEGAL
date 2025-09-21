// lib/supabaseServerClient.js
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Función para crear cliente en servidor con permisos normales
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, // Para operaciones normales
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name, options) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}

// Función para crear cliente administrativo (solo usar en APIs)
export async function createSupabaseAdminClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY, // ← Service Role Key
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// Alias para compatibilidad
export async function createClient() {
  return createSupabaseServerClient()
}