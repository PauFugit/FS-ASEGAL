export async function GET() {
  // ⚠️ Solo para desarrollo o pruebas — ¡NO lo dejes en producción sin protección!
  if (process.env.NODE_ENV !== 'development') {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const envVars = {
    POSTGRES_URL: process.env.POSTGRES_URL ? '✅ Set' : '❌ Not set',
    POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL ? '✅ Set' : '❌ Not set',
    POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING ? '✅ Set' : '❌ Not set',
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD ? '✅ Set' : '❌ Not set',
    SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET ? '✅ Set' : '❌ Not set',
    SUPABASE_URL: process.env.SUPABASE_URL ? '✅ Set' : '❌ Not set',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Not set',
  };

  return new Response(JSON.stringify(envVars, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}