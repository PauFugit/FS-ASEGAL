import { createBrowserClient } from '@supabase/ssr'

// Función para crear cliente (si necesitas crear múltiples instancias)
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Cliente por defecto para uso en componentes
export const supabase = createSupabaseBrowserClient()