import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mpPayment } from '@/lib/mercadopago';
import { sendOrderEmails } from '@/lib/orderMailer';

const STATUS_MAP = {
  approved: 'AUTORIZADA',
  rejected: 'RECHAZADA',
  cancelled: 'ANULADA',
  refunded: 'ANULADA',
  charged_back: 'ANULADA',
  in_process: 'INICIADA',
  pending: 'INICIADA',
};

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const body = await request.json().catch(() => ({}));

    const type = searchParams.get('type') || searchParams.get('topic') || body.type;
    const paymentId = searchParams.get('data.id') || body.data?.id || body.id;

    if (type !== 'payment' || !paymentId) {
      return NextResponse.json({ received: true });
    }

    const payment = await mpPayment.get({ id: paymentId });
    const buyOrder = payment.external_reference;

    const order = await prisma.order.findFirst({ where: { buyOrder } });
    if (!order) {
      return NextResponse.json({ received: true });
    }

    // El monto pagado debe coincidir con el de la orden; evita que un pago de otro
    // monto/transacción pueda marcar esta orden como aprobada.
    if (payment.status === 'approved' && Math.round(payment.transaction_amount) !== order.amount) {
      console.error(`Monto de pago MP (${payment.transaction_amount}) no coincide con orden ${buyOrder} (${order.amount})`);
      return NextResponse.json({ received: true });
    }

    const newStatus = STATUS_MAP[payment.status] || 'RECHAZADA';

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: newStatus,
        providerPaymentId: String(payment.id),
        statusDetail: payment.status_detail || null,
        paymentTypeCode: payment.payment_type_id || null,
        cardLastDigits: payment.card?.last_four_digits || null,
        transactionDate: payment.date_approved ? new Date(payment.date_approved) : null,
        providerData: payment,
      },
    });

    if (newStatus === 'AUTORIZADA' && !updatedOrder.emailSent) {
      try {
        await sendOrderEmails(updatedOrder);
        await prisma.order.update({ where: { id: updatedOrder.id }, data: { emailSent: true } });
      } catch (mailError) {
        console.error('Error enviando correo de confirmación de compra (MP):', mailError);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error procesando webhook de Mercado Pago:', error);
    return NextResponse.json({ received: true });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
