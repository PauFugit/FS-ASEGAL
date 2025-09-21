// app/api/public/recursos/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const resources = await prisma.resources.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        summary: true,
        type: true,
        description: true,
        linkUrl: true,
        references: true,
        imageUrl: true,
        pdfUrl: true,
        createdAt: true
      }
    });

    const response = NextResponse.json({ data: resources }, { status: 200 });
    
    // Headers CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Error fetching public resources:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

// Manejar preflight requests
export async function OPTIONS() {
  const response = NextResponse.json({});
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}