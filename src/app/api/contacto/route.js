import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

export async function GET() {
    try {
        const contacts = await prisma.contactForm.findMany();
        return NextResponse.json({ data: contacts }, { status: 200, headers: corsHeaders });
    } catch(error){
        return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();

        // Validar unicidad de email
        const existingContact = await prisma.contactForm.findUnique({
            where: { email: data.email }
        });
        if (existingContact) {
            return NextResponse.json(
                { error: "El email ya ha sido registrado en un contacto" },
                { status: 400, headers: corsHeaders }
            );
        }

        const newContact = await prisma.contactForm.create({
            data: {
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                mesagge: data.mesagge
            }
        });

        return NextResponse.json(newContact, { status: 201, headers: corsHeaders });
    } catch(error){
        return NextResponse.json(
            { error: error.message || "Un error ocurrió al crear el contacto." },
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