import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendContactEmail({ name, email, message }) {
  const content = {
    to: 'contacto@asegalbyfasesorias.cl',
    from: {
      email: 'no-reply@asegalbyfasesorias.cl', 
      name: 'ASEGAL B&F Asesorías' // Nombre mostrado del remitente
    },
    replyTo: email, // Permite responder directamente al remitente
    subject: `Nuevo mensaje de contacto: ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #333;">Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <hr style="margin: 20px 0;">
        <p style="color: #666; font-size: 12px;">
          Este mensaje fue enviado desde el formulario de contacto de ASEGALBYF Asesorías.
        </p>
      </div>
    `,
    // Agrega categorías para mejor tracking en SendGrid
    categories: ['contact-form'],
    // Configuración de mail settings
    mailSettings: {
      sandboxMode: {
        enable: false // Asegúrate que esté en false en producción
      }
    }
  };

  try {
    await sgMail.send(content);
    console.log('Correo enviado exitosamente');
    return { success: true };
  } catch (error) {
    console.error('Error al enviar correo:', error.response?.body || error);
    return { success: false, error };
  }

}