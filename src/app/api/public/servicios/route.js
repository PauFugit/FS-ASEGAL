import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const services = await prisma.services.findMany({
      where: { status: 'publicado' },
      orderBy: { createdAt: 'asc' },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching public services:', error);
    return NextResponse.json(
      { error: 'Error del servidor' },
      { status: 500 }
    );
  }
}
