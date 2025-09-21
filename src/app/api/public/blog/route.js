// app/api/public/blog/route.js - CORREGIDO
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Importar desde el archivo correcto

export async function GET() {
  try {
    const posts = await prisma.blog.findMany({
      where: {
        status: 'publicado'
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(posts); // Devuelve el array directamente
  } catch (error) {
    console.error('Error fetching public blog posts:', error);
    return NextResponse.json(
      { error: 'Error del servidor' }, 
      { status: 500 }
    );
  }
}