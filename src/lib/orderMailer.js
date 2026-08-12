import { transporter } from '@/lib/mailer';

function formatCLP(amount) {
  return amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
}

export async function sendOrderEmails(order) {
  const summaryHtml = `
    <p><strong>Servicio:</strong> ${order.serviceName}</p>
    <p><strong>Orden:</strong> ${order.buyOrder}</p>
    <p><strong>Monto:</strong> ${formatCLP(order.amount)}</p>
    <p><strong>Código de autorización:</strong> ${order.authorizationCode || '-'}</p>
    <p><strong>Fecha:</strong> ${new Date(order.transactionDate || order.updatedAt).toLocaleString('es-CL', { timeZone: 'America/Santiago' })}</p>
  `;

  await transporter.sendMail({
    from: `"ASEGALBYF Asesorías - Ventas" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_FROM,
    subject: `Nueva compra confirmada: ${order.serviceName}`,
    html: `
      <h2>Nueva compra confirmada</h2>
      <p><strong>Cliente:</strong> ${order.buyerName} (${order.buyerEmail}${order.buyerPhone ? `, ${order.buyerPhone}` : ''})</p>
      ${summaryHtml}
    `,
  });

  await transporter.sendMail({
    from: `"ASEGALBYF Asesorías" <${process.env.EMAIL_FROM}>`,
    to: order.buyerEmail,
    subject: `Confirmación de compra - ${order.serviceName}`,
    html: `
      <h2>¡Gracias por tu compra!</h2>
      <p>Hemos confirmado el pago de tu servicio. Nos pondremos en contacto contigo a la brevedad para coordinar los siguientes pasos.</p>
      ${summaryHtml}
      <p>Si tienes dudas, puedes responder directamente a este correo.</p>
    `,
  });
}
