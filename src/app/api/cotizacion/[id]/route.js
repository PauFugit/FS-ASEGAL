import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function GET(request, { params }) {
    const id = parseInt(params.id)
    try {
        const cotization = await prisma.cotizationForm.findUnique({
            where: { id }
        });
        if (!cotization) {
            return NextResponse.json(
                { error: `Cotización con la ID ${id} no ha sido encontrada` },
                { status: 404, headers: corsHeaders }
            );
        }
        return NextResponse.json(cotization, { status: 200, headers: corsHeaders });
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener la cotización' }, { status: 500, headers: corsHeaders });
    }
}

export async function PUT(request, { params }) {
    const id = parseInt(params.id)
    try {
        const data = await request.json();
        const updateData = { ...data };

        // Validar unicidad de email si se actualiza el email
        if (updateData.email) {
            const existingCotization = await prisma.cotizationForm.findFirst({
                where: {
                    email: updateData.email,
                    id: { not: id }
                }
            });
            if (existingCotization) {
                return NextResponse.json(
                    { error: "El email ya está en uso por otra cotización" },
                    { status: 400, headers: corsHeaders }
                );
            }
        }

        const updatedCotization = await prisma.cotizationForm.update({
            where: { id },
            data: updateData
        });
        return NextResponse.json({
            message: "Cotización actualizada correctamente.",
            data: updatedCotization
        }, { status: 200, headers: corsHeaders });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al actualizar la cotización." },
            { status: 500, headers: corsHeaders }
        );
    }
}

export async function DELETE(request, { params }) {
    const id = parseInt(params.id)
    try {
        await prisma.cotizationForm.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Cotización eliminada correctamente." }, { status: 200, headers: corsHeaders });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al eliminar la cotización." },
            { status: 500, headers: corsHeaders }
        );
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders
    })
}