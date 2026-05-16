import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const bucketName = formData.get('bucket') || 'blog-images';

    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó ningún archivo' }, { status: 400 });
    }

    const allowedBuckets = ['blog-images', 'blog-pdfs', 'user-avatars'];
    if (!allowedBuckets.includes(bucketName)) {
      return NextResponse.json({ error: 'Bucket no permitido' }, { status: 400 });
    }

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const allowedPdfTypes = ['application/pdf'];
    const allowedTypes = bucketName === 'blog-pdfs' ? allowedPdfTypes : allowedImageTypes;

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: `Tipo de archivo no permitido para ${bucketName}` }, { status: 400 });
    }

    const maxSize = bucketName === 'blog-pdfs' ? 10 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: `El archivo excede el tamaño máximo` }, { status: 400 });
    }

    // Convertir a buffer para Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Folder en Cloudinary según bucket
    const folderMap = {
      'blog-images': 'asegal/blog-images',
      'blog-pdfs': 'asegal/blog-pdfs',
      'user-avatars': 'asegal/user-avatars',
    };

    const resourceType = bucketName === 'blog-pdfs' ? 'raw' : 'image';

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: folderMap[bucketName],
          resource_type: resourceType,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      url: uploadResult.secure_url,
      fileName: file.name,
      filePath: uploadResult.public_id,
    });

  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
