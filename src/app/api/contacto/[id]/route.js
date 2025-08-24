// app/api/contacto/[id]/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function GET(request, { params }) {
  const id = Number(params.id);

  // Validar que el ID sea un número válido
  if (isNaN(id) || id <= 0) {
    return NextResponse.json(
      { error: 'ID inválido' },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const contact = await prisma.contactForm.findUnique({
      where: { id },
    });

    if (!contact) {
      return NextResponse.json(
        { error: `Contacto con la ID ${id} no ha sido encontrado` },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(contact, { status: 200, headers: corsHeaders });
  } catch (error) {
    console.error('Error al obtener contacto:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al obtener el contacto' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function PUT(request, { params }) {
  const id = Number(params.id);

  if (isNaN(id) || id <= 0) {
    return NextResponse.json(
      { error: 'ID inválido' },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    const data = await request.json();

    // Validar que haya datos para actualizar
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: 'No se proporcionaron datos para actualizar' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validar unicidad de email si se está actualizando
    if (data.email) {
      const existingContact = await prisma.contactForm.findFirst({
        where: {
          email: data.email,
          id: { not: id }, // Excluir el contacto actual
        },
      });

      if (existingContact) {
        return NextResponse.json(
          { error: 'El email ya está en uso por otro contacto' },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    const updatedContact = await prisma.contactForm.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      {
        message: 'Contacto actualizado correctamente.',
        data: updatedContact,
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error al actualizar contacto:', error);

    // Manejo específico de errores de Prisma
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'No se encontró el contacto para actualizar' },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Error al actualizar el contacto' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function DELETE(request, { params }) {
  const id = Number(params.id);

  if (isNaN(id) || id <= 0) {
    return NextResponse.json(
      { error: 'ID inválido' },
      { status: 400, headers: corsHeaders }
    );
  }

  try {
    // Verificar primero si existe
    const existingContact = await prisma.contactForm.findUnique({
      where: { id },
    });

    if (!existingContact) {
      return NextResponse.json(
        { error: `Contacto con ID ${id} no encontrado` },
        { status: 404, headers: corsHeaders }
      );
    }

    await prisma.contactForm.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: 'Contacto eliminado correctamente.' },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error al eliminar contacto:', error);

    // Error común: violación de clave foránea
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'No se puede eliminar el contacto porque está relacionado con otros registros.' },
        { status: 409, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Error al eliminar el contacto' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 200,
    headers: corsHeaders,
  });
}