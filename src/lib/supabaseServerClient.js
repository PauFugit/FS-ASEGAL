// lib/supabaseServerClient.js
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Función para crear cliente en servidor
export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
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

// Alias para compatibilidad
export async function createClient() {
  return createSupabaseServerClient()
}