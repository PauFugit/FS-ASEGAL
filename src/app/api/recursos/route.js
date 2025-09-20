// app/api/recursos/route.js
import { createSupabaseServerClient } from '@/lib/supabaseServerClient'
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Obtener todos los recursos (para dashboard)
export async function GET() {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const resources = await prisma.resources.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // PARA TU FRONTEND: Devuelve { data: resources }
    return NextResponse.json({ data: resources }, { status: 200 });
  } catch (error) {
    console.error('Error fetching resources:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

// POST - Crear nuevo recurso
export async function POST(request) {
  try {
    const supabase = await createSupabaseServerClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validaciones
    if (!data.name || !data.type || !data.imageUrl) {
      return NextResponse.json(
        { error: 'Nombre, tipo e imagen son requeridos' }, 
        { status: 400 }
      );
    }

    // Verificar si el nombre ya existe
    const existingResource = await prisma.resources.findFirst({
      where: { name: data.name }
    });

    if (existingResource) {
      return NextResponse.json(
        { error: 'Ya existe un recurso con este nombre' },
        { status: 400 }
      );
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
        createdBy: data.createdBy || null
      }
    });

    // PARA TU FRONTEND: Devuelve el recurso directamente, no { data: newResource }
    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}