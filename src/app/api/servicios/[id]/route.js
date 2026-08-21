import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache';

export async function GET(request, { params }) {
    const { id: rawId } = await params;
    const id = parseInt(rawId)
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
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const { id: rawId } = await params;
        const id = parseInt(rawId)
        const deletedService = await prisma.services.delete({
            where: { id }
        });
        revalidatePath('/servicios/');
        revalidatePath(`/servicios/${deletedService.slug}/`);
        return NextResponse.json({ message: "Servicio eliminado correctamente." }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al eliminar al servicio." },
            { status: 500 }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const { id: rawId } = await params;
        const id = parseInt(rawId)
        const data = await request.json();

        if (!data.name || !data.description) {
            return NextResponse.json({ error: 'Nombre y descripción son requeridos' }, { status: 400 });
        }

        const existingService = await prisma.services.findFirst({
            where: {
                name: data.name,
                id: { not: id }
            }
        });
        if (existingService) {
            return NextResponse.json(
                { error: "El nombre del servicio ya está en uso" },
                { status: 400 }
            );
        }

        const updatedService = await prisma.services.update({
            where: { id },
            data: {
                name: data.name,
                createdBy: data.createdBy,
                description: data.description,
                longDescription: data.longDescription || null,
                price: data.price || null,
                priceAmount: data.priceAmount ? parseInt(data.priceAmount, 10) : null,
                images: Array.isArray(data.images) ? data.images : [],
                imageUrl: data.imageUrl,
                status: data.status,
            }
        });
        revalidatePath('/servicios/');
        revalidatePath(`/servicios/${updatedService.slug}/`);
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
