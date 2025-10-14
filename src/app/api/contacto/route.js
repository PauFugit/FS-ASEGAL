// app/api/contacto/route.js

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

    // Validación mejorada
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: nombre, email o mensaje.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validar formato de email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Guardar en la base de datos (sin validar unicidad para contactos)
    const newContact = await prisma.contactForm.create({
      data: {
        name: data.name,
        lastname: data.lastname || '',
        email: data.email,
        phone: data.phone || '',
        message: data.message,
      },
    });

    // CONFIGURACIÓN MEJORADA DEL CORREO
const msg = {
  to: 'contacto@asegalbyfasesorias.cl',
  from: {
    email: 'contacto@asegalbyfasesorias.cl', // MISMO dominio verificado
    name: 'ASEGALBYF Asesorías' // Nombre amigable
  },
  replyTo: {
    email: data.email,
    name: `${data.name} ${data.lastname}`
  },
  subject: `Nuevo mensaje de contacto: ${data.name} ${data.lastname}`,
  text: `
Nuevo mensaje de contacto:

Nombre: ${data.name} ${data.lastname}
Email: ${data.email}
Teléfono: ${data.phone || 'No proporcionado'}

Mensaje:
${data.message}

---
Enviado desde el sitio web ASEGALBYF Asesorías
  `.trim(),
  html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; }
    .header { background: #18148C; color: white; padding: 20px; text-align: center; }
    .content { background: #f9f9f9; padding: 20px; }
    .message { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #F2AC57; }
    .footer { background: #e6f6fd; padding: 15px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="header">
    <h2>📋 Nuevo Mensaje de Contacto</h2>
  </div>
  <div class="content">
    <p><strong>Nombre:</strong> ${data.name} ${data.lastname}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</p>
    <p><strong>Mensaje:</strong></p>
    <div class="message">
      ${data.message.replace(/\n/g, '<br>')}
    </div>
  </div>
  <div class="footer">
    <p>Este mensaje fue enviado desde el formulario de contacto de <strong>ASEGALBYF Asesorías</strong><br>
    ${new Date().toLocaleString('es-CL')}</p>
  </div>
</body>
</html>
  `.trim(),
  // Configuraciones para mejor entregabilidad
  mailSettings: {
    sandboxMode: {
      enable: false
    }
  },
  trackingSettings: {
    clickTracking: {
      enable: false
    },
    openTracking: {
      enable: false
    }
  },
  categories: ['contact-form', 'verified-domain']
};

// Envío con manejo de errores mejorado
try {
  await sgMail.send(msg);
  console.log('✅ Correo enviado exitosamente a través de SendGrid');
} catch (sendError) {
  console.error('❌ Error de SendGrid:', {
    message: sendError.message,
    response: sendError.response?.body,
    code: sendError.code
  });
  throw sendError;
}

    return NextResponse.json(
      { message: 'Contacto creado y correo enviado con éxito.', contact: newContact },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('❌ Error en /api/contacto POST:', error);
    
    // Log detallado del error de SendGrid
    if (error.response) {
      console.error('SendGrid Error Details:', error.response.body);
    }

    let errorMessage = 'Error al procesar el contacto.';
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