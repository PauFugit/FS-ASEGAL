import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  try {
    console.log('🔧 Configurando buckets de almacenamiento...');

    // Crear bucket para imágenes si no existe
    const { data: imageBuckets, error: imageError } = await supabase.storage.listBuckets();
    if (imageError) {
      console.error('Error listando buckets:', imageError);
      return;
    }

    const blogImagesExists = imageBuckets.some(bucket => bucket.name === 'blog-images');
    if (!blogImagesExists) {
      const { error: createImageError } = await supabase.storage.createBucket('blog-images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
      });
      if (createImageError) {
        console.error('Error creando bucket de imágenes:', createImageError);
      } else {
        console.log('✅ Bucket blog-images creado');
      }
    } else {
      console.log('✅ Bucket blog-images ya existe');
    }

    // Crear bucket para PDFs si no existe
    const blogPdfsExists = imageBuckets.some(bucket => bucket.name === 'blog-pdfs');
    if (!blogPdfsExists) {
      const { error: createPdfError } = await supabase.storage.createBucket('blog-pdfs', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
      });
      if (createPdfError) {
        console.error('Error creando bucket de PDFs:', createPdfError);
      } else {
        console.log('✅ Bucket blog-pdfs creado');
      }
    } else {
      console.log('✅ Bucket blog-pdfs ya existe');
    }

    console.log('🎯 Configuración de almacenamiento completada');
  } catch (error) {
    console.error('Error en setup:', error);
  }
}

// Ejecutar si se llama directamente
if (typeof window !== 'undefined') {
  setupStorage();
}

export { setupStorage };