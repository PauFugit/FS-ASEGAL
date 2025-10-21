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

// Función para detectar si es email de dominio público/freemail
function isFreemail(email) {
  if (!email) return false;
  
  const freemailDomains = [
    'gmail.com', 'gmail.cl', 'hotmail.com', 'outlook.com', 'yahoo.com',
    'live.com', 'msn.com', 'aol.com', 'icloud.com', 'protonmail.com',
    'yandex.com', 'mail.com', 'zoho.com', 'gmx.com'
  ];
  
  const domain = email.toLowerCase().split('@')[1];
  return freemailDomains.includes(domain);
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

    // CONFIGURACIÓN MEJORADA - SOLUCIÓN ANTI SPAM
    const msg = {
      to: 'contacto@asegalbyfasesorias.cl',
      from: {
        email: 'contacto@asegalbyfasesorias.cl',
        name: 'ASEGALBYF Asesorías - Cotizaciones'
      },
      // SOLUCIÓN CLAVE: Solo usar Reply-To si NO es freemail
      replyTo: isFreemail(data.email) 
        ? {
            email: 'contacto@asegalbyfasesorias.cl',
            name: 'ASEGALBYF Asesorías'
          }
        : {
            email: data.email,
            name: `${data.name} ${data.lastname || ''}`
          },
      subject: `Solicitud de Cotización: ${data.service}`,
      text: `
Nueva solicitud de cotización:

Nombre: ${data.name} ${data.lastname || ''}
Email: ${data.email} ${isFreemail(data.email) ? '(Email del cliente: responder a este correo)' : ''}
Teléfono: ${data.phone || 'No proporcionado'}
Servicio: ${data.service}

Mensaje:
${data.message || 'No se proporcionó mensaje adicional'}

---
Para responder al cliente, utilice: ${data.email}
Este mensaje fue generado automáticamente desde el sitio web de ASEGALBYF Asesorías.
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
    .service-badge { background: #F2AC57; color: white; padding: 8px 15px; border-radius: 20px; display: inline-block; font-weight: bold; }
    .message { background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #9FBA47; }
    .footer { background: #e6f6fd; padding: 15px; text-align: center; font-size: 12px; color: #666; }
    .info-item { margin-bottom: 10px; }
    .client-email { 
      background: #fff3cd; 
      padding: 10px; 
      border-radius: 5px; 
      border: 1px solid #ffeaa7;
      margin: 10px 0;
    }
    .freemail-warning {
      background: #f8d7da;
      color: #721c24;
      padding: 8px;
      border-radius: 4px;
      font-size: 12px;
      margin-top: 5px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h2>Nueva Solicitud de Cotización</h2>
  </div>
  <div class="content">
    <div class="info-item">
      <strong>Nombre:</strong> ${data.name} ${data.lastname || ''}
    </div>
    <div class="info-item">
      <strong>Email del cliente:</strong>
      <div class="client-email">
        <strong>${data.email}</strong>
        ${isFreemail(data.email) 
          ? '<div class="freemail-warning">⚠️ Para responder, use directamente este email (no usar "Responder")</div>' 
          : '<div>Puede responder directamente a este correo</div>'
        }
      </div>
    </div>
    <div class="info-item">
      <strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}
    </div>
    <div class="info-item">
      <strong>Servicio solicitado:</strong><br>
      <span class="service-badge">${data.service}</span>
    </div>
    <div class="info-item">
      <strong>Mensaje adicional:</strong>
      <div class="message">
        ${data.message ? data.message.replace(/\n/g, '<br>') : '<em>No se proporcionó mensaje adicional</em>'}
      </div>
    </div>
  </div>
  <div class="footer">
    <p>ASEGALBYF Asesorías - Sitio Web<br>
    ${new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })}</p>
  </div>
</body>
</html>
      `.trim(),
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
      categories: ['website-cotization', 'business-inquiry']
    };

    // Envío con manejo de errores
    try {
      await sgMail.send(msg);
      console.log('✅ Correo enviado - Tipo ReplyTo:', isFreemail(data.email) ? 'INTERNO (freemail detectado)' : 'CLIENTE_DIRECTO');
      
    } catch (sendError) {
      console.error('❌ Error de SendGrid:', sendError.message);
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

// OPTIONS: Manejo de CORS
export async function OPTIONS() {
  return NextResponse.json(null, {
    status: 200,
    headers: corsHeaders,
  });
}