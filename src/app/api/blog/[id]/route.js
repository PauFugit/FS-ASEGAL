import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
    const id = parseInt(params.id)
    try {
        const blog = await prisma.blog.findUnique({
            where: { id }
        });
        if (!blog) {
            return NextResponse.json(
                { error: `Blog con la ID ${id} no ha sido encontrado` },
                { status: 404 }
            );
        }
        return NextResponse.json({ data: blog }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message || 'Error al obtener el blog' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const id = parseInt(params.id)
    try {
        await prisma.blog.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Blog eliminado correctamente." }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al eliminar el blog." },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    const id = parseInt(params.id)
    try {
        const data = await request.json();
        const updateData = { ...data };

        // Validar campos obligatorios si se envían
        if ('title' in updateData && (!updateData.title || updateData.title.trim() === "")) {
            return NextResponse.json(
                { error: "El título no puede estar vacío." },
                { status: 400 }
            );
        }
        if ('content' in updateData && (!updateData.content || updateData.content.trim() === "")) {
            return NextResponse.json(
                { error: "El contenido no puede estar vacío." },
                { status: 400 }
            );
        }

        // Validar unicidad de título si se actualiza el título
        if (updateData.title) {
            const existingBlog = await prisma.blog.findFirst({
                where: {
                    title: updateData.title,
                    id: { not: id }
                }
            });
            if (existingBlog) {
                return NextResponse.json(
                    { error: "El título del blog ya está en uso" },
                    { status: 400 }
                );
            }
        }

        const updatedBlog = await prisma.blog.update({
            where: { id },
            data: updateData
        });
        return NextResponse.json({
            message: "Blog actualizado correctamente.",
            data: updatedBlog
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al actualizar el blog." },
            { status: 500 }
        );
    }
}