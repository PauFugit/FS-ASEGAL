import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createPayment } from '@/lib/flow';

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
    if (!service.priceAmount || service.priceAmount <= 0) {
      return NextResponse.json({ error: 'Este servicio no tiene precio de compra directa' }, { status: 400 });
    }

    const buyOrder = buildBuyOrder();
    const sessionId = buildSessionId();
    const baseUrl = process.env.NEXTAUTH_URL || new URL(request.url).origin;

    const order = await prisma.order.create({
      data: {
        buyOrder,
        sessionId,
        provider: 'FLOW',
        serviceId: service.id,
        serviceName: service.name,
        amount: service.priceAmount,
        status: 'INICIADA',
        buyerName,
        buyerEmail,
        buyerPhone: buyerPhone || null,
      },
    });

    const payment = await createPayment({
      commerceOrder: buyOrder,
      subject: service.name,
      amount: service.priceAmount,
      email: buyerEmail,
      urlConfirmation: `${baseUrl}/api/pago/flow/confirmar`,
      urlReturn: `${baseUrl}/api/pago/flow/retorno`,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { providerToken: payment.token },
    });

    return NextResponse.json({ url: `${payment.url}?token=${payment.token}` });
  } catch (error) {
    console.error('Error iniciando pago Flow:', error);
    return NextResponse.json({ error: error.message || 'Error al iniciar el pago' }, { status: 500 });
  }
}
