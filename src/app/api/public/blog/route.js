import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Obtener posts públicos (sin autenticación)
export async function GET() {
  try {
const posts = await prisma.blog.findMany({
  select: {
    id: true,
    title: true,
    author: true,
    summary: true,
    bodyText: true,
    references: true,
    imageUrl: true,
    pdfUrl: true, // ← Asegúrate de incluir este campo
    createdAt: true,
  },
  orderBy: { createdAt: 'desc' }
});

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching public blog posts:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}