import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const cursos = await prisma.resources.findMany({
      where: { type: 'CAPACITACION' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        summary: true,
        imageUrl: true,
        linkUrl: true,
        createdAt: true
      }
    });
    return NextResponse.json(cursos);
  } catch (error) {
    console.error('Error fetching cursos:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}