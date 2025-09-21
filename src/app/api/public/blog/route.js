// app/api/public/blog/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Obtener todos los posts del blog (PÚBLICO)
export async function GET() {
  try {
    const posts = await prisma.blog.findMany({
      where: {
        status: 'publicado' // Filtrar solo posts publicados
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        author: true,
        summary: true,
        link: true,
        bodyText: true,
        references: true,
        imageUrl: true,
        pdfUrl: true,
        createdAt: true
      }
    });

    return NextResponse.json({ data: posts }, { status: 200 });
  } catch (error) {
    console.error('Error fetching public blog posts:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}