import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
        const resources = await prisma.resources.findMany();
        return NextResponse.json({ data: resources }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();

        // Validar unicidad de nombre
        const existingResource = await prisma.resources.findUnique({
            where: { name: data.name }
        });
        if (existingResource) {
            return NextResponse.json(
                { error: "El recurso ya existe" },
                { status: 400 }
            );
        }

        const newResource = await prisma.resources.create({
            data
        });

        return NextResponse.json(newResource, { status: 201 });
    } catch (error){
        return NextResponse.json(
            { error: error.message || "Un error ocurrió al crear el recurso. Por favor, inténtalo nuevamente." },
            { status: 500 }
        );
    }
}