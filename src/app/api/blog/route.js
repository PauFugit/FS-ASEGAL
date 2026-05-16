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

    const posts = await prisma.blog.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
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

    if (!data.title || !data.summary || !data.imageUrl) {
      return NextResponse.json({ error: 'Título, resumen e imagen son requeridos' }, { status: 400 });
    }

    const existingPost = await prisma.blog.findFirst({ where: { title: data.title } });
    if (existingPost) {
      return NextResponse.json({ error: 'Ya existe un post con este título' }, { status: 400 });
    }

    const newPost = await prisma.blog.create({
      data: {
        title: data.title,
        author: data.author || 'Anónimo',
        summary: data.summary,
        link: data.link || null,
        bodyText: data.bodyText || null,
        references: data.references || null,
        imageUrl: data.imageUrl,
        pdfUrl: data.pdfUrl || null,
        status: data.status || 'publicado',
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
