// app/api/cotizacion/route.js

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import sgMail from '@sendgrid/mail';

// Configura SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Headers para CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// GET: Obtener todas las cotizaciones
export async function GET() {
  try {
    const cotizations = await prisma.cotizationForm.findMany();
    return NextResponse.json({  cotizations }, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST: Crear nueva cotización y enviar correo
export async function POST(request) {
  try {
    const data = await request.json();

    // Validar campos requeridos
    if (!data.name || !data.lastname || !data.email || !data.service) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: nombre, apellido, email o servicio.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validar unicidad de email
    const existingCotization = await prisma.cotizationForm.findUnique({
      where: { email: data.email },
    });

    if (existingCotization) {
      return NextResponse.json(
        { error: 'El email ya ha sido registrado en una cotización' },
        { status: 400, headers: corsHeaders }
      );
    }

    // ✅ Guardar en la base de datos
    const newCotization = await prisma.cotizationForm.create({
      data: {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        service: data.service,
        message: data.message,
      },
    });

    // ✅ Enviar correo con SendGrid
    const msg = {
      to: 'contacto@asegalbyfasesorias.cl',
      from: 'contacto@asegalbyfasesorias.cl',
      replyTo: data.email,
      subject: `Nueva solicitud de cotización: ${data.service}`,
      text: `
Hola equipo Asegal,

Tienes una nueva solicitud de cotización:

Nombre: ${data.name} ${data.lastname}
Email: ${data.email}
Teléfono: ${data.phone || 'No proporcionado'}
Servicio: ${data.service}
Mensaje: ${data.message}

Este mensaje fue enviado el ${new Date().toLocaleString('es-CL')}.

Saludos,
Sistema de cotización de asegalbyfasesorias.cl
      `.trim(),
      html: `
<p>Hola <strong>equipo Asegal</strong>,</p>
<p>Tienes una nueva <strong>solicitud de cotización</strong>:</p>
<ul>
  <li><strong>Nombre:</strong> ${data.name} ${data.lastname}</li>
  <li><strong>Email:</strong> ${data.email}</li>
  <li><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</li>
  <li><strong>Servicio:</strong> ${data.service}</li>
  <li><strong>Mensaje:</strong></li>
  <p>${data.message}</p>
</ul>
<p><em>Este mensaje fue enviado el ${new Date().toLocaleString('es-CL')}.</em></p>
<p>Saludos,<br/>
<small><strong>Sistema de cotización</strong><br/>Asegal by F Asesorías</small></p>
      `.trim(),
    };

    await sgMail.send(msg);

    // Respuesta exitosa
    return NextResponse.json(newCotization, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error('Error en POST /api/cotizacion:', error);
    return NextResponse.json(
      { error: error.message || 'Error al procesar la cotización' },
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