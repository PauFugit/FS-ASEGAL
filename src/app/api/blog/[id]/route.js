import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const data = await request.json();
    if (!data.title || !data.summary) {
      return NextResponse.json({ error: 'Título y resumen son requeridos' }, { status: 400 });
    }

    const { id } = await params;
    const updatedPost = await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        author: data.author,
        summary: data.summary,
        link: data.link,
        bodyText: data.bodyText,
        references: data.references,
        imageUrl: data.imageUrl,
        pdfUrl: data.pdfUrl,
        status: data.status,
      },
    });

    revalidatePath('/blog/');
    revalidatePath(`/blog/${updatedPost.slug}/`);

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
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
    const deletedPost = await prisma.blog.delete({ where: { id: parseInt(id) } });

    revalidatePath('/blog/');
    revalidatePath(`/blog/${deletedPost.slug}/`);

    return NextResponse.json({ message: 'Post eliminado correctamente' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
