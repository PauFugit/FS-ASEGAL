import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const plantillas = await prisma.resources.findMany({
      where: { type: 'PLANTILLA' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        summary: true,
        imageUrl: true,
        pdfUrl: true,
        createdAt: true
      }
    });
    return NextResponse.json(plantillas);
  } catch (error) {
    console.error('Error fetching plantillas:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}