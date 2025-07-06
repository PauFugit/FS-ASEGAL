import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(request, { params }) {
    const id = parseInt(params.id)
    try {
        const service = await prisma.services.findUnique({
            where: { id }
        });
        if (!service) {
            return NextResponse.json(
                { error: `Servicio con la ID ${id} no ha sido encontrado` },
                { status: 404 }
            );
        }
        return NextResponse.json(service, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching service' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    const id = parseInt(params.id)
    try {
        await prisma.services.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Servicio eliminado correctamente." }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al eliminar al servicio." },
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
            const existingService = await prisma.services.findFirst({
                where: {
                    name: updateData.name,
                    id: { not: id }
                }
            });
            if (existingService) {
                return NextResponse.json(
                    { error: "El nombre del servicio ya está en uso" },
                    { status: 400 }
                );
            }
        }

        const updatedService = await prisma.services.update({
            where: { id },
            data: updateData
        });
        return NextResponse.json({
            message: "Servicio actualizado correctamente.",
            data: updatedService
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al actualizar el servicio." },
            { status: 500 }
        );
    }
}