import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;
    const resource = await prisma.resources.findUnique({ where: { id: parseInt(id) } });

    if (!resource) {
      return NextResponse.json({ error: 'Recurso no encontrado' }, { status: 404 });
    }

    return NextResponse.json(resource);
  } catch (error) {
    console.error('Error fetching resource:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await request.json();
    const { id } = await params;
    const numId = parseInt(id);

    if (!data.name || !data.type) {
      return NextResponse.json({ error: 'Nombre y tipo son requeridos' }, { status: 400 });
    }

    const existingResource = await prisma.resources.findFirst({
      where: { name: data.name, id: { not: numId } },
    });
    if (existingResource) {
      return NextResponse.json({ error: 'Ya existe un recurso con este nombre' }, { status: 400 });
    }

    const updatedResource = await prisma.resources.update({
      where: { id: numId },
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

    return NextResponse.json(updatedResource, { status: 200 });
  } catch (error) {
    console.error('Error updating resource:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Recurso no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.resources.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: 'Recurso eliminado correctamente' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting resource:', error);
    if (error.code === 'P2025') {
      return NextResponse.json({ error: 'Recurso no encontrado' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
