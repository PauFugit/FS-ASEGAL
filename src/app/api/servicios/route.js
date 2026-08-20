import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { slugify } from '@/lib/slugify';
import { revalidatePath } from 'next/cache';

async function generateUniqueSlug(name) {
    const base = slugify(name);
    let slug = base;
    let counter = 2;
    while (await prisma.services.findUnique({ where: { slug } })) {
        slug = `${base}-${counter}`;
        counter++;
    }
    return slug;
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const services = await prisma.services.findMany({ orderBy: { createdAt: 'desc' } });
        return NextResponse.json({ data: services }, { status: 200 });
    } catch(error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const data = await request.json();

        if (!data.name || !data.description || !data.imageUrl) {
            return NextResponse.json(
                { error: 'Nombre, descripción e imagen son requeridos' },
                { status: 400 }
            );
        }

        const existingService = await prisma.services.findUnique({
            where: { name: data.name }
        });
        if (existingService) {
            return NextResponse.json(
                { error: "El servicio ya existe" },
                { status: 400 }
            );
        }

        const slug = await generateUniqueSlug(data.name);

        const newService = await prisma.services.create({
            data: {
                name: data.name,
                slug,
                createdBy: data.createdBy || null,
                description: data.description,
                longDescription: data.longDescription || null,
                price: data.price || null,
                priceAmount: data.priceAmount ? parseInt(data.priceAmount, 10) : null,
                images: Array.isArray(data.images) ? data.images : [],
                imageUrl: data.imageUrl,
                status: data.status || 'publicado',
            }
        });

        revalidatePath('/servicios');
        revalidatePath(`/servicios/${newService.slug}`);

        return NextResponse.json(newService, { status: 201 });
    } catch(error) {
        return NextResponse.json(
            { error: error.message || "Un error ocurrió al crear el servicio. Por favor, inténtalo nuevamente." },
            { status: 500 }
        );
    }
}
