import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'


export async function GET() {
    try {
        const services = await prisma.services.findMany();
        return NextResponse.json({ data: services }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();

        // Validar servicio único
        const existingService = await prisma.services.findUnique({
            where: { name: data.name }
        });
        if (existingService) {
            return NextResponse.json(
                { error: "El servicio ya existe" },
                { status: 400 }
            );
        }

        // Crear servicio
        const newService = await prisma.services.create({
            data
        });

        return NextResponse.json(newService, { status: 201 });
    } catch(error) {
        return NextResponse.json(
            { error: error.message || "Un error ocurrió al crear el servicio. Por favor, inténtalo nuevamente." },
            { status: 500 }
        );
    }
}
