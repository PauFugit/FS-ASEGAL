import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    const post = await prisma.blog.findFirst({
      where: { slug, status: 'publicado' },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post no encontrado' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
