import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getStatus, FLOW_STATUS_MAP } from '@/lib/flow';
import { sendOrderEmails } from '@/lib/orderMailer';

// Webhook server-to-server que Flow llama a urlConfirmation. Debe responder "OK".
export async function POST(request) {
  try {
    const formData = await request.formData();
    const token = formData.get('token');

    if (!token) {
      return new NextResponse('OK', { status: 200 });
    }

    const status = await getStatus(token);
    const order = await prisma.order.findFirst({ where: { buyOrder: status.commerceOrder } });

    if (!order) {
      return new NextResponse('OK', { status: 200 });
    }

    // El monto pagado debe coincidir con el de la orden.
    if (status.status === 2 && Math.round(status.amount) !== order.amount) {
      console.error(`Monto de pago Flow (${status.amount}) no coincide con orden ${order.buyOrder} (${order.amount})`);
      return new NextResponse('OK', { status: 200 });
    }

    const newStatus = FLOW_STATUS_MAP[status.status] || 'RECHAZADA';

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: newStatus,
        providerPaymentId: status.flowOrder ? String(status.flowOrder) : null,
        statusDetail: status.paymentData?.media || null,
        paymentTypeCode: status.paymentData?.media || null,
        transactionDate: status.paymentData?.date ? new Date(status.paymentData.date) : null,
        providerData: status,
      },
    });

    if (newStatus === 'AUTORIZADA' && !updatedOrder.emailSent) {
      try {
        await sendOrderEmails(updatedOrder);
        await prisma.order.update({ where: { id: updatedOrder.id }, data: { emailSent: true } });
      } catch (mailError) {
        console.error('Error enviando correo de confirmación de compra (Flow):', mailError);
      }
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error) {
    console.error('Error procesando webhook de Flow:', error);
    return new NextResponse('OK', { status: 200 });
  }
}
