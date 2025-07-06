import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
    const id = parseInt(params.id)
    try {
        const resource = await prisma.resources.findUnique({
            where: { id }
        });
        if (!resource) {
            return NextResponse.json(
                { error: `Recurso con la ID ${id} no ha sido encontrado` },
                { status: 404 }
            );
        }
        return NextResponse.json(resource, { status: 200 });
    } catch(error) {
        return NextResponse.json({ error: 'Error al obtener el recurso' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const id = parseInt(params.id)
    try {
        await prisma.resources.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Recurso eliminado correctamente." }, { status: 200 });
    } catch(error) {
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al eliminar el recurso." },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    const id = parseInt(params.id)
    try {
        const data = await request.json();
        const updateData = { ...data };

        // Validar unicidad de nombre si se actualiza el nombre
        if (updateData.name) {
            const existingResource = await prisma.resources.findFirst({
                where: {
                    name: updateData.name,
                    id: { not: id }
                }
            });
            if (existingResource) {
                return NextResponse.json(
                    { error: "El nombre del recurso ya está en uso" },
                    { status: 400 }
                );
            }
        }

        const updatedResource = await prisma.resources.update({
            where: { id },
            data: updateData
        });
        return NextResponse.json({
            message: "Recurso actualizado correctamente.",
            data: updatedResource
        }, { status: 200 });
    } catch(error) {
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al actualizar el recurso." },
            { status: 500 }
        );
    }
}