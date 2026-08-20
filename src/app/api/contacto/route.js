import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { transporter } from '@/lib/mailer';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function isFreemail(email) {
  const freemailDomains = [
    'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com',
    'icloud.com', 'aol.com', 'protonmail.com', 'live.com'
  ];
  return freemailDomains.some(domain => email.toLowerCase().endsWith(`@${domain}`));
}

export async function GET() {
  try {
    const contacts = await prisma.contactForm.findMany();
    return NextResponse.json({ contacts }, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos: nombre, email o mensaje.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!/\S+@\S+\.\S+/.test(data.email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const newContact = await prisma.contactForm.create({
      data: {
        name: data.name,
        lastname: data.lastname || '',
        email: data.email,
        phone: data.phone || '',
        message: data.message,
      },
    });

    const emailPayload = {
      from: `"ASEGALBYF Asesorías" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_FROM,
      replyTo: !isFreemail(data.email) ? data.email : process.env.EMAIL_FROM,
      subject: `Nuevo mensaje de contacto: ${data.name} ${data.lastname || ''}`,
      text: [
        'Nuevo mensaje de contacto:',
        '',
        `Nombre: ${data.name} ${data.lastname || ''}`,
        `Email: ${data.email}`,
        `Teléfono: ${data.phone || 'No proporcionado'}`,
        '',
        'Mensaje:',
        data.message,
        '',
        '---',
        'ASEGALBYF Asesorías',
        'Teléfono: +56 9 9492 8092 / +56 9 4232 7704',
        'Email: contacto@asegalbyfasesorias.cl',
        'Sitio web: https://asegalbyfasesorias.cl',
        '',
        `Enviado desde el formulario de contacto del sitio web`,
        new Date().toLocaleString('es-CL'),
      ].join('\n'),
      html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0;">
  <div style="background: #18148C; color: white; padding: 20px; text-align: center;">
    <h2 style="margin: 0;">Nuevo Mensaje de Contacto</h2>
  </div>
  <div style="padding: 20px; background: #f9f9f9;">
    <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
      <p><strong>Nombre:</strong> ${data.name} ${data.lastname || ''}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Teléfono:</strong> ${data.phone || 'No proporcionado'}</p>
    </div>
    <div style="background: white; padding: 15px; border-radius: 5px;">
      <p><strong>Mensaje:</strong></p>
      <div style="background: #f5f5f5; padding: 10px; border-left: 3px solid #F2AC57;">
        ${data.message.replace(/\n/g, '<br>')}
      </div>
    </div>
  </div>
  <div style="background: #e6f6fd; padding: 20px; text-align: center; border-top: 3px solid #9FBA47;">
    <div style="background: white; padding: 15px; border-radius: 5px; margin-bottom: 15px;">
      <strong>ASEGALBYF Asesorías</strong><br>
      Atención presencial I y IV Región. Atención online.<br>
      Teléfono: +56 9 9492 8092 / +56 9 4232 7704<br>
      Email: contacto@asegalbyfasesorias.cl<br>
      Sitio web: https://asegalbyfasesorias.cl
    </div>
    <p style="margin: 0; color: #666; font-size: 12px;">
      Mensaje enviado desde el formulario de contacto del sitio web<br>
      ${new Date().toLocaleString('es-CL')}
    </p>
  </div>
</div>`.trim(),
    };

    try {
      await transporter.sendMail(emailPayload);
      console.log('✅ Correo de contacto enviado');
    } catch (sendError) {
      console.error('❌ Error al enviar correo de contacto:', sendError.message);
      throw sendError;
    }

    return NextResponse.json(
      { message: 'Contacto creado y correo enviado con éxito.', contact: newContact },
      { status: 201, headers: corsHeaders }
    );

  } catch (error) {
    console.error('❌ Error en /api/contacto POST:', error);
    const errorMessage = error.code === 'P2002'
      ? 'Este correo ya está registrado.'
      : 'Error al procesar el contacto.';
    return NextResponse.json({ error: errorMessage }, { status: 500, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200, headers: corsHeaders });
}
