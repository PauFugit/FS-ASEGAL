// app/api/contacto/route.js

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import sgMail from '@sendgrid/mail';

// Configura SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Headers para CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// GET: Obtener todos los contactos
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

// POST: Crear nuevo contacto y enviar correo
export async function POST(request) {
  try {
    const data = await request.json();

    // Validar campos requeridos
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: nombre, email o mensaje.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validar unicidad de email
    const existingContact = await prisma.contactForm.findUnique({
      where: { email: data.email },
    });

    if (existingContact) {
      return NextResponse.json(
        { error: 'El email ya ha sido registrado en un contacto' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Guardar en la base de datos
    const newContact = await prisma.contactForm.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        message: data.message,
      },
    });

    // Enviar correo con SendGrid
    const msg = {
      to: 'contacto@asegalbyfasesorias.cl',
      from: {
        email: 'contacto@asegalbyfasesorias.cl',
        name: 'Formulario de Contacto - Asegal by F Asesorías',
      },
      replyTo: data.email,
      subject: `Nuevo mensaje de contacto: ${data.name} ${data.lastname}`,
      text: `
Hola equipo Asegal,

Tienes un nuevo mensaje desde el formulario de contacto:

Nombre: ${data.name} ${data.lastname}
Email: ${data.email}
Teléfono: ${data.phone || 'No proporcionado'}
Mensaje: ${data.message}

Este mensaje fue enviado el ${new Date().toLocaleString('es-CL')}.

Saludos,
Sistema de contacto de asegalbyfasesorias.cl
      `.trim(),
      html: `
<p>Hola <strong>equipo Asegal</strong>,</p>
<p>Tienes un nuevo mensaje desde el <strong>formulario de contacto</strong>:</p>
<ul>
  <li><strong>Nombre:</strong> ${data.name} ${data.lastname}</li>
  <li><strong>Email:</strong> ${data.email}</li>
  <li><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</li>
  <li><strong>Mensaje:</strong></li>
  <p>${data.message}</p>
</ul>
<p><em>Este mensaje fue enviado el ${new Date().toLocaleString('es-CL')}.</em></p>
<p>Saludos,<br/>
<small><strong>Sistema de contacto</strong><br/>Asegal by F Asesorías</small></p>
      `.trim(),
    };

    await sgMail.send(msg);

    // Respuesta exitosa
    return NextResponse.json(
      { message: 'Mensaje guardado y enviado con éxito', data: newContact },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Error en /api/contacto POST:', error);

    let errorMessage = error.message || 'Error al procesar el contacto.';
    if (error.code === 'P2002') {
      errorMessage = 'Este correo ya está registrado.';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500, headers: corsHeaders }
    );
  }
}

// OPTIONS: Manejo de CORS
export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 200,
    headers: corsHeaders,
  });
}