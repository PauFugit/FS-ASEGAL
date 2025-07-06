import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const blogs = await prisma.blog.findMany();
        return NextResponse.json({ data: blogs }, { status: 200 });
    } catch (error){
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();

        // Validar unicidad de título
        const existingBlog = await prisma.blog.findUnique({
            where: { title: data.title }
        });
        if (existingBlog) {
            return NextResponse.json(
                { error: "El título del blog ya existe" },
                { status: 400 }
            );
        }

        const newBlog = await prisma.blog.create({
            data
        });

        return NextResponse.json(newBlog, { status: 201 });
    } catch(error) {
        return NextResponse.json(
            { error: error.message || "Un error ocurrió al crear el blog. Por favor, inténtalo nuevamente." },
            { status: 500 }
        );
    }
}