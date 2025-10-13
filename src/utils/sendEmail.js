import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendContactEmail({ name, lastname, email, phone, message }) {
  const msg = {
    to: 'contacto@asegalbyfasesorias.cl',
    from: process.env.EMAIL_FROM,
    replyTo: email,
    subject: `Nuevo mensaje de contacto: ${name} ${lastname}`,
    text: `
Nombre: ${name} ${lastname}
Email: ${email}
Teléfono: ${phone || 'No proporcionado'}
Mensaje: ${message}
    `.trim(),
    html: `
<p><strong>Nombre:</strong> ${name} ${lastname}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
<p><strong>Mensaje:</strong><br/>${message}</p>
<hr/>
<p style="font-size:12px;color:#888;">
Asegal by F Asesorías<br/>
contacto@asegalbyfasesorias.cl
</p>
    `.trim(),
    headers: {
      'List-Unsubscribe': '<mailto:contacto@asegalbyfasesorias.cl>'
    }
  };

  await sgMail.send(msg);
}