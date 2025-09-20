// scripts/init-buckets.js
// Ejecutar con: node scripts/init-buckets.js

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Faltan variables de entorno. Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function ensureBucketExists(bucketName) {
  console.log(`Verificando bucket ${bucketName}...`)
  
  const { data, error } = await supabase.storage.getBucket(bucketName)
  
  if (error && error.message.includes('not found')) {
    console.log(`El bucket ${bucketName} no existe. Creando...`)
    
    const { error: createError } = await supabase.storage.createBucket(bucketName, {
      public: bucketName === 'blog-images' // público solo para imágenes
    })
    
    if (createError) {
      console.error(`Error creando bucket ${bucketName}:`, createError.message)
    } else {
      console.log(`✅ Bucket ${bucketName} creado exitosamente`)
    }
  } else if (error) {
    console.error(`Error verificando bucket ${bucketName}:`, error.message)
  } else {
    console.log(`✅ Bucket ${bucketName} ya existe`)
  }
}

async function main() {
  console.log('Inicializando buckets de Supabase Storage...')
  
  // Verificar y crear ambos buckets si es necesario
  await ensureBucketExists('blog-images')
  await ensureBucketExists('blog-pdfs')
  
  console.log('✅ Proceso de inicialización completado')
}

main().catch(console.error)