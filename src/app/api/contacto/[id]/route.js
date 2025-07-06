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
        const contact = await prisma.contactForm.findUnique({
            where: { id }
        });
        if (!contact) {
            return NextResponse.json(
                { error: `Contacto con la ID ${id} no ha sido encontrado` },
                { status: 404, headers: corsHeaders }
            );
        }
        return NextResponse.json(contact, { status: 200, headers: corsHeaders });
    } catch(error) {
        return NextResponse.json({ error: 'Error al obtener el contacto' }, { status: 500, headers: corsHeaders });
    }
}

export async function PUT(request, { params }) {
    const id = parseInt(params.id)
    try {
        const data = await request.json();
        const updateData = { ...data };

        // Validar unicidad de email si se actualiza el email
        if (updateData.email) {
            const existingContact = await prisma.contactForm.findFirst({
                where: {
                    email: updateData.email,
                    id: { not: id }
                }
            });
            if (existingContact) {
                return NextResponse.json(
                    { error: "El email ya está en uso por otro contacto" },
                    { status: 400, headers: corsHeaders }
                );
            }
        }

        const updatedContact = await prisma.contactForm.update({
            where: { id },
            data: updateData
        });
        return NextResponse.json({
            message: "Contacto actualizado correctamente.",
            data: updatedContact
        }, { status: 200, headers: corsHeaders });
    } catch(error) {
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al actualizar el contacto." },
            { status: 500, headers: corsHeaders }
        );
    }
}

export async function DELETE(request, { params }) {
    const id = parseInt(params.id)
    try {
        await prisma.contactForm.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Contacto eliminado correctamente." }, { status: 200, headers: corsHeaders });
    } catch (error){
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al eliminar el contacto." },
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