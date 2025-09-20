// app/api/upload/route.js
import { createClient } from '@/lib/supabaseServerClient'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    // Crear cliente de Supabase
    const supabase = await createClient()

    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Obtener datos del formulario
    const formData = await request.formData()
    const file = formData.get('file')
    const bucketName = formData.get('bucket') || 'blog-images'

    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó ningún archivo' }, { status: 400 })
    }

    // Validar buckets permitidos 
    const allowedBuckets = ['blog-images', 'blog-pdfs', 'user-avatars'];
    if (!allowedBuckets.includes(bucketName)) {
      return NextResponse.json({ error: 'Bucket no permitido' }, { status: 400 });
    }

    // Validar tipo de archivo
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    const allowedPdfTypes = ['application/pdf']
    const allowedTypes = bucketName === 'blog-pdfs' ? allowedPdfTypes : allowedImageTypes

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: `Tipo de archivo no permitido para el bucket ${bucketName}` }, 
        { status: 400 }
      )
    }

    // Validar tamaño del archivo (5MB para imágenes, 10MB para PDFs)
    const maxSize = bucketName === 'blog-pdfs' ? 10 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `El archivo excede el tamaño máximo permitido para ${bucketName}` }, 
        { status: 400 }
      )
    }

    // Generar nombre único para el archivo
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    // Convertir File a ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    // Subir el archivo a Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, uint8Array, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Error subiendo archivo:', uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)

    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      fileName: file.name,
      filePath: filePath
    })

  } catch (error) {
    console.error('Error uploading file:', error)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}