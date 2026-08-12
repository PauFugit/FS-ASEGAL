import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { webpayTransaction } from '@/lib/webpay';

function buildBuyOrder() {
  return `ASG${Date.now()}`.slice(0, 26);
}

function buildSessionId() {
  return `S${Date.now()}${Math.floor(Math.random() * 10000)}`.slice(0, 61);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { serviceId, buyerName, buyerEmail, buyerPhone } = data;

    if (!serviceId || !buyerName || !buyerEmail) {
      return NextResponse.json(
        { error: 'Faltan datos requeridos: servicio, nombre o email.' },
        { status: 400 }
      );
    }

    const service = await prisma.services.findUnique({ where: { id: parseInt(serviceId, 10) } });
    if (!service || service.status !== 'publicado') {
      return NextResponse.json({ error: 'Servicio no encontrado' }, { status: 404 });
    }
    if (!service.priceAmount) {
      return NextResponse.json({ error: 'Este servicio no tiene precio de compra directa' }, { status: 400 });
    }

    const buyOrder = buildBuyOrder();
    const sessionId = buildSessionId();
    const baseUrl = process.env.NEXTAUTH_URL || new URL(request.url).origin;
    const returnUrl = `${baseUrl}/api/pago/webpay/confirmar`;

    const response = await webpayTransaction.create(
      buyOrder,
      sessionId,
      service.priceAmount,
      returnUrl
    );

    await prisma.order.create({
      data: {
        buyOrder,
        sessionId,
        provider: 'WEBPAY',
        serviceId: service.id,
        serviceName: service.name,
        amount: service.priceAmount,
        status: 'INICIADA',
        providerToken: response.token,
        buyerName,
        buyerEmail,
        buyerPhone: buyerPhone || null,
      },
    });

    return NextResponse.json({ url: response.url, token: response.token });
  } catch (error) {
    console.error('Error iniciando transacción Webpay:', error);
    return NextResponse.json({ error: 'Error al iniciar el pago' }, { status: 500 });
  }
}
