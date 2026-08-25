import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { webpayTransaction } from '@/lib/webpay';
import { sendOrderEmails } from '@/lib/orderMailer';

function baseUrl(request) {
  return process.env.NEXTAUTH_URL || new URL(request.url).origin;
}

// Mapea el status ya guardado en la orden al parámetro `estado` que entiende /pago/resultado.
function estadoFromStatus(status) {
  if (status === 'AUTORIZADA') return 'aprobada';
  if (status === 'RECHAZADA') return 'rechazada';
  if (status === 'ANULADA') return 'anulada';
  if (status === 'EXPIRADA') return 'expirada';
  return 'error';
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

  // El token_ws es de un solo uso: si esta orden ya fue confirmada (por el POST real
  // de Transbank), cualquier otra visita a esta URL no debe volver a llamar a commit(),
  // que fallaría con "token inválido" y podría machacar un resultado ya correcto.
  if (order.status === 'AUTORIZADA' || order.status === 'RECHAZADA') {
    return NextResponse.redirect(
      `${baseUrl(request)}/pago/resultado?estado=${estadoFromStatus(order.status)}&orden=${order.buyOrder}`,
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
    // No sabemos si Transbank aprobó o no el pago (el error puede ser de red, timeout,
    // o un commit duplicado). Usamos un status distinto a RECHAZADA para no dar por
    // rechazada una compra que tal vez sí se cobró, y así poder revisarla manualmente.
    await prisma.order.update({ where: { id: order.id }, data: { status: 'ERROR_CONFIRMACION' } });
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

// GET solo consulta el estado ya guardado en la orden — nunca llama a webpayTransaction.commit(),
// para no intentar reutilizar un token_ws que ya fue consumido por el POST real de Transbank.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tokenWs = searchParams.get('token_ws');
  const tbkToken = searchParams.get('TBK_TOKEN');
  const tbkOrdenCompra = searchParams.get('TBK_ORDEN_COMPRA');

  if (tbkToken && !tokenWs) {
    return NextResponse.redirect(
      `${baseUrl(request)}/pago/resultado?estado=anulada&orden=${tbkOrdenCompra || ''}`,
      { status: 303 }
    );
  }

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

  return NextResponse.redirect(
    `${baseUrl(request)}/pago/resultado?estado=${estadoFromStatus(order.status)}&orden=${order.buyOrder}`,
    { status: 303 }
  );
}
