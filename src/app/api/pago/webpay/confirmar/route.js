import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { webpayTransaction } from '@/lib/webpay';
import { sendOrderEmails } from '@/lib/orderMailer';

function baseUrl(request) {
  return process.env.NEXTAUTH_URL || new URL(request.url).origin;
}

async function handleConfirmation(request, params) {
  const tokenWs = params.get('token_ws');
  const tbkToken = params.get('TBK_TOKEN');
  const tbkOrdenCompra = params.get('TBK_ORDEN_COMPRA');

  // Caso: usuario canceló en la página de Webpay antes de pagar.
  if (tbkToken && !tokenWs) {
    const order = await prisma.order.findFirst({ where: { buyOrder: tbkOrdenCompra } });
    if (order) {
      await prisma.order.update({ where: { id: order.id }, data: { status: 'ANULADA' } });
    }
    return NextResponse.redirect(
      `${baseUrl(request)}/pago/resultado?estado=anulada&orden=${tbkOrdenCompra || ''}`,
      { status: 303 }
    );
  }

  // Caso: timeout (se agotó el tiempo en la página de Webpay), no llega token_ws ni TBK_TOKEN.
  if (!tokenWs) {
    return NextResponse.redirect(
      `${baseUrl(request)}/pago/resultado?estado=expirada`,
      { status: 303 }
    );
  }

  const order = await prisma.order.findFirst({ where: { providerToken: tokenWs } });
  if (!order) {
    return NextResponse.redirect(
      `${baseUrl(request)}/pago/resultado?estado=error`,
      { status: 303 }
    );
  }

  try {
    const result = await webpayTransaction.commit(tokenWs);
    const approved = result.response_code === 0 && result.status === 'AUTHORIZED';

    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: approved ? 'AUTORIZADA' : 'RECHAZADA',
        authorizationCode: result.authorization_code || null,
        responseCode: result.response_code ?? null,
        paymentTypeCode: result.payment_type_code || null,
        cardLastDigits: result.card_detail?.card_number || null,
        transactionDate: result.transaction_date ? new Date(result.transaction_date) : null,
      },
    });

    if (approved && !updatedOrder.emailSent) {
      try {
        await sendOrderEmails(updatedOrder);
        await prisma.order.update({ where: { id: updatedOrder.id }, data: { emailSent: true } });
      } catch (mailError) {
        console.error('Error enviando correo de confirmación de compra:', mailError);
      }
    }

    return NextResponse.redirect(
      `${baseUrl(request)}/pago/resultado?estado=${approved ? 'aprobada' : 'rechazada'}&orden=${order.buyOrder}`,
      { status: 303 }
    );
  } catch (error) {
    console.error('Error confirmando transacción Webpay:', error);
    await prisma.order.update({ where: { id: order.id }, data: { status: 'RECHAZADA' } });
    return NextResponse.redirect(
      `${baseUrl(request)}/pago/resultado?estado=error&orden=${order.buyOrder}`,
      { status: 303 }
    );
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const params = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    params.set(key, value);
  }
  return handleConfirmation(request, params);
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  return handleConfirmation(request, searchParams);
}
