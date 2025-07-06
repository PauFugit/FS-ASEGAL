import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function GET(request, { params }) {
    const id = parseInt(params.id)
    try {
        const user = await prisma.users.findUnique({
            where: { id }
        });
        if (!user) {
            return NextResponse.json(
                { error: `Usuario con la ID ${id} no ha sido encontrado` },
                { status: 404 }
            );
        }
        const { password, ...userWithoutPassword } = user;
        return NextResponse.json(userWithoutPassword, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
    }
}


export async function DELETE(request, { params }) {
    const id = parseInt(params.id)
    try {
        await prisma.users.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Usuario eliminado correctamente." }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al eliminar al usuario." },
            { status: 500 }
        );
    }
}
export async function PUT(request, { params }) {
    const id = parseInt(params.id)
    try {
        const data = await request.json();
        const updateData = { ...data };

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        } else {
            delete updateData.password;
        }

        // Validar email único si se actualiza el email
        if (updateData.email) {
            const existingEmail = await prisma.users.findFirst({
                where: {
                    email: updateData.email,
                    id: { not: id }
                }
            });
            if (existingEmail) {
                return NextResponse.json(
                    { error: "El email ya está registrado por otro usuario" },
                    { status: 400 }
                );
            }
        }

        const updatedUser = await prisma.users.update({
            where: { id },
            data: updateData
        });

        const { password, ...userWithoutPassword } = updatedUser;

        return NextResponse.json({
            message: "Usuario actualizado correctamente.",
            data: userWithoutPassword
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: error.message || "Ha ocurrido un error al actualizar al usuario." },
            { status: 500 }
        );
    }
}
