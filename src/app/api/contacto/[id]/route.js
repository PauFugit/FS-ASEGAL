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

// Función para detectar emails gratuitos
function isFreemail(email) {
  const freemailDomains = [
    'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com',
    'icloud.com', 'aol.com', 'protonmail.com', 'live.com'
  ];
  return freemailDomains.some(domain => email.toLowerCase().endsWith(`@${domain}`));
}

// GET: Obtener todas las cotizaciones
export async function GET() {
  try {
    const cotizations = await prisma.cotizationForm.findMany();
    return NextResponse.json({ cotizations }, { status: 200, headers: corsHeaders });
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

    // Validación mejorada
    if (!data.name || !data.email || !data.service) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: nombre, email o servicio.' },
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

    // Guardar en la base de datos
    const newCotization = await prisma.cotizationForm.create({
      data: {
        name: data.name,
        lastname: data.lastname || '',
        email: data.email,
        phone: data.phone || '',
        service: data.service,
        message: data.message || '',
      },
    });

    // CONFIGURACIÓN MEJORADA DEL CORREO - ANTI SPAM
    const msg = {
      to: 'contacto@asegalbyfasesorias.cl',
      from: {
        email: 'contacto@asegalbyfasesorias.cl',
        name: 'ASEGALBYF Asesorías'
      },
      // SOLO agrega replyTo si NO es email gratuito
      ...(!isFreemail(data.email) && {
        replyTo: {
          email: data.email,
          name: `${data.name} ${data.lastname || ''}`
        }
      }),
      subject: `Nueva solicitud de cotización: ${data.service}`,
      text: `
Nueva solicitud de cotización:

Nombre: ${data.name} ${data.lastname || ''}
Email: ${data.email}
Teléfono: ${data.phone || 'No proporcionado'}
Servicio: ${data.service}

Mensaje:
${data.message || 'No se proporcionó mensaje adicional'}

---
ASEGALBYF Asesorías
Av. Providencia 1234, Santiago, Chile
Teléfono: +56 9 9492 8092
Email: contacto@asegalbyfasesorias.cl
Sitio web: https://asegalbyfasesorias.cl

Enviado desde el formulario de cotización del sitio web
${new Date().toLocaleString('es-CL')}
      `.trim(),
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0;">
  <div style="background: #18148C; color: white; padding: 20px; text-align: center;">
    <h2 style="margin: 0;">Nueva Solicitud de Cotización</h2>
  </div>
  
  <div style="padding: 20px; background: #f9f9f9;">
    <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
      <p><strong>Nombre:</strong> ${data.name} ${data.lastname || ''}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</p>
      <p><strong>Servicio solicitado:</strong></p>
      <div style="background: #F2AC57; color: white; padding: 8px 15px; border-radius: 20px; display: inline-block; font-weight: bold;">
        ${data.service}
      </div>
    </div>
    
    <div style="background: white; padding: 15px; border-radius: 5px;">
      <p><strong>Mensaje adicional:</strong></p>
      <div style="background: #f5f5f5; padding: 10px; border-left: 3px solid #9FBA47;">
        ${data.message ? data.message.replace(/\n/g, '<br>') : '<em>No se proporcionó mensaje adicional</em>'}
      </div>
    </div>
  </div>
  
  <div style="background: #e6f6fd; padding: 20px; text-align: center; border-top: 3px solid #9FBA47;">
    <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
      <strong>ASEGALBYF Asesorías</strong><br>
      Atención presencial II y IV Región. Atención online.<br>
      Teléfono: +56 9 9492 8092<br>
      Email: contacto@asegalbyfasesorias.cl<br>
      Sitio web: https://asegalbyfasesorias.cl
    </div>
    <p style="margin: 0; color: #666; font-size: 12px;">
      Solicitud enviada desde el formulario de cotización del sitio web<br>
      ${new Date().toLocaleString('es-CL')}
    </p>
  </div>
</div>
      `.trim(),
      // CONFIGURACIONES ANTI-SPAM
      customArgs: {
        'transactional': 'true',
        'category': 'quotation-request',
        'source': 'website-quotation-form'
      },
      headers: {
        'X-Entity-Ref': 'quotation-request',
        'Precedence': 'bulk'
      },
      mailSettings: {
        sandboxMode: { enable: false }
      },
      trackingSettings: {
        clickTracking: { enable: false },
        openTracking: { enable: false }
      },
      categories: ['quotation-form', 'customer-service', 'website-lead']
    };

    // Envío con manejo de errores mejorado
    try {
      await sgMail.send(msg);
      console.log('✅ Correo de cotización enviado exitosamente');
    } catch (sendError) {
      console.error('❌ Error de SendGrid en cotización:', {
        message: sendError.message,
        response: sendError.response?.body,
        code: sendError.code
      });
      throw sendError;
    }

    return NextResponse.json(
      { 
        message: 'Cotización creada y correo enviado con éxito.', 
        cotization: newCotization 
      },
      { status: 201, headers: corsHeaders }
    );
    
  } catch (error) {
    console.error('❌ Error en /api/cotizacion POST:', error);
    
    if (error.response) {
      console.error('SendGrid Error Details:', error.response.body);
    }

    let errorMessage = 'Error al procesar la cotización.';
    if (error.code === 'P2002') {
      errorMessage = 'Este correo ya está registrado en una cotización.';
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