import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const resources = await prisma.resources.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(resources);
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await request.json();

    if (!data.name || !data.type || !data.imageUrl) {
      return NextResponse.json({ error: 'Nombre, tipo e imagen son requeridos' }, { status: 400 });
    }

    const existingResource = await prisma.resources.findFirst({ where: { name: data.name } });
    if (existingResource) {
      return NextResponse.json({ error: 'Ya existe un recurso con este nombre' }, { status: 400 });
    }

    const newResource = await prisma.resources.create({
      data: {
        name: data.name,
        summary: data.summary || '',
        type: data.type,
        description: data.description || null,
        linkUrl: data.linkUrl || null,
        references: data.references || null,
        imageUrl: data.imageUrl,
        pdfUrl: data.pdfUrl || null,
        createdBy: data.createdBy || null,
      },
    });

    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
