import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { transporter } from '@/lib/mailer';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(request) {
  try {
    const data = await request.json();

    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      return NextResponse.json(
        { error: 'El formato del email no es válido.' },
        { status: 400, headers: corsHeaders }
      );
    }

    const subscriber = await prisma.newsletterSubscriber.create({
      data: { email: data.email },
    });

    try {
      await transporter.sendMail({
        from: `"ASEGALBYF Asesorías" <${process.env.EMAIL_FROM}>`,
        to: process.env.EMAIL_FROM,
        subject: 'Nueva suscripción al newsletter',
        text: [
          'Nueva suscripción al newsletter del blog:',
          '',
          `Email: ${data.email}`,
          '',
          '---',
          'Este correo es solo un registro. El envío del newsletter a este suscriptor debe hacerse manualmente.',
          new Date().toLocaleString('es-CL'),
        ].join('\n'),
        html: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0;">
  <div style="background: #18148C; color: white; padding: 20px; text-align: center;">
    <h2 style="margin: 0;">Nueva Suscripción al Newsletter</h2>
  </div>
  <div style="padding: 20px; background: #f9f9f9;">
    <div style="background: white; padding: 15px; border-radius: 5px;">
      <p><strong>Email:</strong> ${data.email}</p>
    </div>
  </div>
  <div style="background: #e6f6fd; padding: 20px; text-align: center; border-top: 3px solid #9FBA47;">
    <p style="margin: 0; color: #666; font-size: 12px;">
      Suscripción registrada desde el blog del sitio web<br>
      ${new Date().toLocaleString('es-CL')}
    </p>
  </div>
</div>`.trim(),
      });
    } catch (sendError) {
      console.error('❌ Error al enviar aviso de suscripción:', sendError.message);
    }

    return NextResponse.json(
      { message: 'Suscripción registrada con éxito.', subscriber },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    const errorMessage = error.code === 'P2002'
      ? 'Este correo ya está suscrito.'
      : 'Error al procesar la suscripción.';
    return NextResponse.json({ error: errorMessage }, { status: 500, headers: corsHeaders });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401, headers: corsHeaders });
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(subscribers, { status: 200, headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return NextResponse.json(null, { status: 200, headers: corsHeaders });
}
