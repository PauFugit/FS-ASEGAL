import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const service = await prisma.services.findFirst({
      where: { slug, status: 'publicado' },
    });

    if (!service) {
      return NextResponse.json({ error: 'Servicio no encontrado' }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Error fetching public service:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
