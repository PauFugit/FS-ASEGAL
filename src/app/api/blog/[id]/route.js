// app/api/blog/[id]/route.js - VERSIÓN CORREGIDA
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabaseServerClient';

// PUT - Actualizar post
export async function PUT(request, { params }) {
  try {
    const supabase = await createClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json(
        { error: 'No autorizado' }, 
        { status: 401 }
      );
    }

    const data = await request.json();
    
    // Validaciones
    if (!data.title || !data.summary) {
      return NextResponse.json(
        { error: 'Título y resumen son requeridos' }, 
        { status: 400 }
      );
    }

    const updatedPost = await prisma.blog.update({
      where: { id: parseInt(params.id) },
      data: {
        title: data.title,
        author: data.author,
        summary: data.summary,
        link: data.link,
        bodyText: data.bodyText,
        references: data.references,
        imageUrl: data.imageUrl,
        pdfUrl: data.pdfUrl,
        status: data.status
      }
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Error del servidor' }, 
      { status: 500 }
    );
  }
}

// DELETE - Eliminar post
export async function DELETE(request, { params }) {
  try {
    const supabase = await createClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json(
        { error: 'No autorizado' }, 
        { status: 401 }
      );
    }

    await prisma.blog.delete({
      where: { id: parseInt(params.id) }
    });

    return NextResponse.json(
      { message: 'Post eliminado correctamente' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Error del servidor' }, 
      { status: 500 }
    );
  }
}