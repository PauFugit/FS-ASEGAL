import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/utils/sendEmail'

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function GET() {
    try {
        const cotizations = await prisma.cotizationForm.findMany();
        return new NextResponse(JSON.stringify({ data: cotizations }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();

        // Validar unicidad de email
        const existingCotization = await prisma.cotizationForm.findUnique({
            where: { email: data.email }
        });
        if (existingCotization) {
            return new NextResponse(JSON.stringify({ error: "El email ya ha sido registrado en una cotización" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                    ...corsHeaders
                }
            });
        }

        // Crear cotización en la base de datos
        const cotizationForm = await prisma.cotizationForm.create({
            data: {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                service: data.service,
                message: data.message
            }
        });

        // Enviar correo con SendGrid (o tu función sendEmail)
        const emailText = `
Nombre: ${data.name} ${data.lastname}
Correo: ${data.email}
Teléfono: ${data.phone || '-'}
Servicio a cotizar: ${data.service}
Mensaje: ${data.message}
        `;

        const emailSent = await sendEmail(
            'contacto@asesoriasvaldivia.cl',
            'contacto@asesoriasvaldivia.cl',
            "Nueva solicitud de cotización",
            emailText
        );

        if (!emailSent) {
            throw new Error('No se pudo enviar el correo');
        }

        return new NextResponse(JSON.stringify(cotizationForm), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                ...corsHeaders
            }
        });
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: corsHeaders
    })
}