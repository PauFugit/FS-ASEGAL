// app/api/contacto/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import sgMail from '@sendgrid/mail';

// Configura SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET() {
  try {
    const contacts = await prisma.contactForm.findMany();
    return NextResponse.json({ contacts }, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    // Validar campos requeridos
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos: nombre, email o mensaje." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validar unicidad de email
    const existingContact = await prisma.contactForm.findUnique({
      where: { email: data.email },
    });

    if (existingContact) {
      return NextResponse.json(
        { error: "El email ya ha sido registrado en un contacto" },
        { status: 400, headers: corsHeaders }
      );
    }

    // ✅ Guardar en la base de datos (¡aquí estaba el error!)
    const newContact = await prisma.contactForm.create({
      data: {  // ← ✅ CORREGIDO: debe ser `data: { ... }`
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        message: data.message, 
      },
    });

    // ✅ Enviar correo con SendGrid
    const msg = {
      to: 'contacto@asegalbyfasesorias.cl',
      from: 'contacto@asegalbyfasesorias.cl', // Debe estar verificado en SendGrid
      replyTo: data.email, // Para que puedas responder desde tu cliente de correo
      subject: `Nuevo mensaje de contacto: ${data.name} ${data.lastname}`,
      text: `
        Tienes un nuevo mensaje desde el formulario de contacto:

        Nombre: ${data.name} ${data.lastname}
        Email: ${data.email}
        Teléfono: ${data.phone || 'No proporcionado'}
        Mensaje: ${data.message}
      `,
      html: `
        <p>Tienes un nuevo mensaje desde el formulario de contacto:</p>
        <ul>
          <li><strong>Nombre:</strong> ${data.name} ${data.lastname}</li>
          <li><strong>Email:</strong> ${data.email}</li>
          <li><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</li>
          <li><strong>Mensaje:</strong></li>
          <p>${data.message}</p>
        </ul>
      `,
    };

    // Enviar correo
    await sgMail.send(msg);

    // Respuesta exitosa
    return NextResponse.json(
      { message: 'Mensaje guardado y enviado con éxito', data: newContact },
      { status: 201, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Error en /api/contacto POST:', error);

    // Manejo más seguro del error
    let errorMessage = error.message || "Error al procesar el contacto.";

    // Si es un error de Prisma o SendGrid, puedes personalizar
    if (error.code === 'P2002') {
      errorMessage = 'Este correo ya está registrado.';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}

// ✅ Manejo de OPTIONS (CORS)
export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 200,
    headers: corsHeaders,
  });
}