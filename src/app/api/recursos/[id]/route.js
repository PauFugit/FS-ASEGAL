// app/api/recursos/[id]/route.js
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createSupabaseServerClient } from '@/lib/supabaseServerClient';

// GET - Obtener recurso específico
export async function GET(request, { params }) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const id = parseInt(params.id);
    const resource = await prisma.resources.findUnique({
      where: { id }
    });
    
    if (!resource) {
      return NextResponse.json(
        { error: 'Recurso no encontrado' },
        { status: 404 }
      );
    }
    
    // PARA TU FRONTEND: Devuelve { data: resource }
    return NextResponse.json({ data: resource }, { status: 200 });
  } catch (error) {
    console.error('Error fetching resource:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

// PUT - Actualizar recurso
export async function PUT(request, { params }) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json(
        { error: 'No autorizado' }, 
        { status: 401 }
      );
    }

    const data = await request.json();
    const id = parseInt(params.id);
    
    // Validaciones
    if (!data.name || !data.type) {
      return NextResponse.json(
        { error: 'Nombre y tipo son requeridos' }, 
        { status: 400 }
      );
    }

    // Verificar si el nombre ya existe (excluyendo el recurso actual)
    const existingResource = await prisma.resources.findFirst({
      where: { 
        name: data.name,
        id: { not: id }
      }
    });

    if (existingResource) {
      return NextResponse.json(
        { error: 'Ya existe un recurso con este nombre' },
        { status: 400 }
      );
    }

    const updatedResource = await prisma.resources.update({
      where: { id },
      data: {
        name: data.name,
        summary: data.summary || '',
        type: data.type,
        description: data.description || null,
        linkUrl: data.linkUrl || null,
        references: data.references || null,
        imageUrl: data.imageUrl,
        pdfUrl: data.pdfUrl || null,
        createdBy: data.createdBy || null
      }
    });

    // PARA TU FRONTEND: Devuelve el recurso directamente, no { data: updatedResource }
    return NextResponse.json(updatedResource, { status: 200 });
  } catch (error) {
    console.error('Error updating resource:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Recurso no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error del servidor' }, 
      { status: 500 }
    );
  }
}

// DELETE - Eliminar recurso
export async function DELETE(request, { params }) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json(
        { error: 'No autorizado' }, 
        { status: 401 }
      );
    }

    const id = parseInt(params.id);
    
    await prisma.resources.delete({
      where: { id }
    });

    return NextResponse.json(
      { message: 'Recurso eliminado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting resource:', error);
    
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Recurso no encontrado' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Error del servidor' }, 
      { status: 500 }
    );
  }
}