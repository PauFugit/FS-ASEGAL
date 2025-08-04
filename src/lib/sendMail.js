import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendContactEmail({ name, email, message }) {
  const content = {
    to: 'contacto@asegalbyfasesorias.cl',
    from: 'no-reply@asegalbyfasesorias.cl', // debe estar verificado en SendGrid
    subject: `Nuevo mensaje de contacto: ${name}`,
    text: message,
    html: `<p><strong>Nombre:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Mensaje:</strong><br/>${message}</p>`
  };

  try {
    await sgMail.send(content);
    return { success: true };
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return { success: false, error };
  }
}
