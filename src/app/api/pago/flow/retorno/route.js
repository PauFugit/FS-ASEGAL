import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStatus, FLOW_STATUS_MAP } from '@/lib/flow';
import { sendOrderEmails } from '@/lib/orderMailer';

function baseUrl(request) {
  return process.env.NEXTAUTH_URL || new URL(request.url).origin;
}

const RESULT_ESTADO = {
  AUTORIZADA: 'aprobada',
  RECHAZADA: 'rechazada',
  ANULADA: 'anulada',
  INICIADA: 'pendiente',
};

async function handleReturn(request, token) {
  if (!token) {
    return NextResponse.redirect(`${baseUrl(request)}/pago/resultado?estado=error`, { status: 303 });
  }

  try {
    const status = await getStatus(token);
    const order = await prisma.order.findFirst({ where: { buyOrder: status.commerceOrder } });

    if (!order) {
      return NextResponse.redirect(`${baseUrl(request)}/pago/resultado?estado=error`, { status: 303 });
    }

    const amountMismatch = status.status === 2 && Math.round(status.amount) !== order.amount;
    const newStatus = amountMismatch ? 'RECHAZADA' : (FLOW_STATUS_MAP[status.status] || 'RECHAZADA');
    if (amountMismatch) {
      console.error(`Monto de pago Flow (${status.amount}) no coincide con orden ${order.buyOrder} (${order.amount})`);
    }

    let updatedOrder = order;
    if (order.status !== newStatus) {
      updatedOrder = await prisma.order.update({
        where: { id: order.id },
        data: {
          status: newStatus,
          providerPaymentId: status.flowOrder ? String(status.flowOrder) : null,
          transactionDate: status.paymentData?.date ? new Date(status.paymentData.date) : null,
          providerData: status,
        },
      });
    }

    if (newStatus === 'AUTORIZADA' && !updatedOrder.emailSent) {
      try {
        await sendOrderEmails(updatedOrder);
        await prisma.order.update({ where: { id: updatedOrder.id }, data: { emailSent: true } });
      } catch (mailError) {
        console.error('Error enviando correo de confirmación de compra (Flow):', mailError);
      }
    }

    const estado = RESULT_ESTADO[newStatus] || 'error';
    return NextResponse.redirect(
      `${baseUrl(request)}/pago/resultado?estado=${estado}&orden=${order.buyOrder}`,
      { status: 303 }
    );
  } catch (error) {
    console.error('Error confirmando retorno de Flow:', error);
    return NextResponse.redirect(`${baseUrl(request)}/pago/resultado?estado=error`, { status: 303 });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  return handleReturn(request, formData.get('token'));
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return handleReturn(request, searchParams.get('token'));
}
