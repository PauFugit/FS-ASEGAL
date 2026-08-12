import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mpPreference } from '@/lib/mercadopago';

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

    const order = await prisma.order.create({
      data: {
        buyOrder,
        sessionId,
        provider: 'MERCADOPAGO',
        serviceId: service.id,
        serviceName: service.name,
        amount: service.priceAmount,
        status: 'INICIADA',
        buyerName,
        buyerEmail,
        buyerPhone: buyerPhone || null,
      },
    });

    const isPublicUrl = baseUrl.startsWith('https://');

    const preference = await mpPreference.create({
      body: {
        items: [
          {
            id: String(service.id),
            title: service.name,
            quantity: 1,
            unit_price: service.priceAmount,
            currency_id: 'CLP',
          },
        ],
        payer: { name: buyerName, email: buyerEmail },
        external_reference: buyOrder,
        back_urls: {
          success: `${baseUrl}/pago/resultado?estado=aprobada&orden=${buyOrder}`,
          failure: `${baseUrl}/pago/resultado?estado=rechazada&orden=${buyOrder}`,
          pending: `${baseUrl}/pago/resultado?estado=pendiente&orden=${buyOrder}`,
        },
        // auto_return y notification_url requieren una URL pública (https); en local se omiten.
        ...(isPublicUrl ? { auto_return: 'approved', notification_url: `${baseUrl}/api/pago/mercadopago/webhook` } : {}),
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { providerToken: preference.id },
    });

    return NextResponse.json({ url: preference.init_point });
  } catch (error) {
    console.error('Error iniciando preferencia Mercado Pago:', error);
    return NextResponse.json({ error: 'Error al iniciar el pago' }, { status: 500 });
  }
}
