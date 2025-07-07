import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Link
} from '@mui/material';

export default function Privacidad() {
  return (
    <Box sx={{ backgroundImage: "url('/')", backgroundSize: "cover", minHeight: '100vh', color: '#18148C' }}>
      {/* Header */}
      <Box sx={{ 
        bgcolor: '#18148C', 
        color: 'white', 
        textAlign: 'center', 
        py: 8,
        px: 2
      }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
          PRIVACIDAD
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 6, px: { xs: 2, sm: 3 } }}>
        <Paper elevation={3} sx={{ p: { xs: 3, md: 4 }, mb: 4 }}>
          <Typography variant="body1" color="#18148C" paragraph>
            Agradezco que estés en esta página, eso significa que tus datos te importan, y quieres conocer el destino de los mismos y quién los recoge.
            <br /><br />
            De conformidad con lo dispuesto en el Reglamento General (UE) Sobre Protección de Datos, mediante la aceptación de la presente Política de Privacidad prestas tu consentimiento informado, expreso, libre e inequívoco para que los datos personales que proporciones a través de la página web asegalbyfasesorias.cl/ (en adelante SITIO WEB) sean incluidos en un fichero de "USUARIOS WEB Y SUSCRIPTORES" así como "CLIENTES Y/O PROVEEDORES":
          </Typography>

          <List dense sx={{ pl: 2 }}>
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary="• Denominación social: CAROLINA ANDREA FERNÁNDEZ VALDIVIA - CAROLINA MADELEINE BERTHELON VEGA" 
                primaryTypographyProps={{ color: 'primary' }}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary="• Mi domicilio social se encuentra en Antofagasta, Chile" 
                primaryTypographyProps={{ color: 'primary' }}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary="• Email: contacto@asegalbyfasesorias.cl" 
                primaryTypographyProps={{ color: 'primary' }}
              />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText 
                primary="• Mi actividad social es: Asesorías integrales alimentarias." 
                primaryTypographyProps={{ color: 'primary' }}
              />
            </ListItem>
          </List>

          <Typography variant="body1" color="primary" paragraph sx={{ mt: 2 }}>
            La presente Política de Privacidad será válida únicamente para los datos de carácter personal obtenidos en el Sitio Web, no siendo aplicable para aquella información recabada por terceros en otras páginas web, incluso si éstas se encuentran enlazadas por el Sitio Web.
            <br /><br />
            Con ello manifiesto mi compromiso por mantener y garantizar las relaciones comerciales de forma seguridad mediante la protección de los datos personales y garantizando el derecho a la privacidad de cada uno de los usuarios de nuestro sitio web.
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Sección 1 */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            1. ¿QUÉ SON LOS DATOS PERSONALES?
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Una pequeña aproximación es importante, por ello, debes saber que sería cualquier información relativa a una persona que nos facilita cuando visita nuestro sitio web, en nuestro caso nombre e email, y si compra algún producto necesitando factura, solicitaremos Domicilio completo, nombre, apellidos, rut, email, DNI o CIF.
            <br /><br />
            Adicionalmente, cuando visitas nuestro sitio web, determinada información se almacena automáticamente por motivos técnicos como la dirección IP asignada por su proveedor de acceso a Internet.
          </Typography>

          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
            PRINCIPIOS PARA EL TRATAMIENTO DE DATOS
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Para tratar tus datos personales, aplicaré según el RGPD los siguientes principios:
          </Typography>

          <List sx={{ pl: 2 }}>
            <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
              <ListItemText 
                primary={
                  <Typography variant="body1" color="primary">
                    <Box component="span" sx={{ fontWeight: 'bold' }}>Principio de licitud, lealtad y transparencia:</Box> Siempre voy a requerir tu consentimiento para el tratamiento de tus datos personales para uno o varios fines específicos que te informaré previamente con absoluta transparencia.
                  </Typography>
                }
              />
            </ListItem>
            <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
              <ListItemText 
                primary={
                  <Typography variant="body1" color="primary">
                    <Box component="span" sx={{ fontWeight: 'bold' }}>Principio de minimización de datos:</Box> Solo voy a solicitar datos estrictamente necesarios en relación con los fines para los que los requiero.
                  </Typography>
                }
              />
            </ListItem>
            <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
              <ListItemText 
                primary={
                  <Typography variant="body1" color="primary">
                    <Box component="span" sx={{ fontWeight: 'bold' }}>Principio de limitación del plazo de conservación:</Box> como más adelante podrás comprobar, los datos serán mantenidos durante no más tiempo del necesario para los fines del tratamiento, en función a la finalidad, te informaré del plazo de conservación correspondiente, en el caso de suscripciones, periódicamente revisaré mis listas y eliminaré aquellos registros inactivos durante un tiempo considerable.
                  </Typography>
                }
              />
            </ListItem>
            <ListItem sx={{ px: 0, alignItems: 'flex-start' }}>
              <ListItemText 
                primary={
                  <Typography variant="body1" color="primary">
                    <Box component="span" sx={{ fontWeight: 'bold' }}>Principio de integridad y confidencialidad:</Box> Tus datos serán tratados de tal manera que se garantice una seguridad adecuada de los datos personales y se garantice confidencialidad. Debes saber que tomo todas las medidas encaminadas a evitar el acceso no autorizado o uso indebido de los datos de mis usuarios por parte de terceros.
                  </Typography>
                }
              />
            </ListItem>
          </List>

          <Divider sx={{ my: 4 }} />

          {/* Sección 2 */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            2. FINALIDAD, LEGITIMACION, CATEGORÍA DE LOS DATOS RECABADOS, CONSENTIMIENTO AL TRATAMIENTO, MENORES DE EDAD.
          </Typography>
          
          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3, fontWeight: 'bold' }}>
            2.1 FINALIDAD
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Tal y como se recoge en la normativa, se informa al USUARIO que, a través de los formularios de contacto, o suscripciones se recaban datos, los cuales se almacenan en un fichero, con la exclusiva finalidad de envío de comunicaciones electrónicas, tales como: boletines (newsletters), nuevas entradas (posts), ofertas comerciales, webinars gratuitos, así como otras comunicaciones que Asegal B&F Asesorías entiende interesantes para sus USUARIOS. Los campos marcados como de cumplimentación obligatoria, son imprescindibles para realizar la finalidad expresada.
            <br /><br />
            Asimismo podrá dar cumplimiento mediante los datos, a los requerimientos solicitados por los USUARIOS.
            <br /><br />
            En definitiva la FINALIDAD es la siguiente:
          </Typography>

          <List dense sx={{ pl: 2 }}>
            <ListItem sx={{ px: 0 }}>
              <ListItemText primary="• La venta de formación sobre Negocios Online." primaryTypographyProps={{ color: 'primary' }} />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText primary="• La venta de Ebooks, libros y productos." primaryTypographyProps={{ color: 'primary' }} />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText primary="• Gestionar la lista de suscriptores y usuarios adscritos a la web." primaryTypographyProps={{ color: 'primary' }} />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText primary="• Suministro de contenidos en el blog." primaryTypographyProps={{ color: 'primary' }} />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
              <ListItemText primary="• Dirigir su red de afiliados y comerciantes así como la gestión de pagos de los mismos." primaryTypographyProps={{ color: 'primary' }} />
            </ListItem>
          </List>

          <Typography variant="body1" color="primary" paragraph sx={{ mt: 2 }}>
            Únicamente el titular tendrá acceso a sus datos, y bajo ningún concepto, estos datos serán cedidos, compartidos, transferidos, ni vendidos a ningún tercero.
            <br /><br />
            La aceptación de la política de privacidad, mediante el procedimiento establecido de dole opt-in, se entenderá a todos los efectos como la prestación de CONSENTIMIENTO EXPRESO E INEQUIVOCO del USUARIO al tratamiento de los datos de carácter personal en los términos que se exponen en el presente documento, así como a la transferencia internacional de datos que se produce, exclusivamente debido a la ubicación física de las instalaciones de los proveedores de servicios y encargados del tratamiento de datos.
            <br /><br />
            En ningún caso se realizará un uso diferente que la finalidad para los que han sido recabados los datos ni muchos menos cederé a un tercero estos datos.
          </Typography>

          {/* Continúa con las demás secciones... */}
          {/* Sección 2.2 */}
          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
            2.2 MENORES DE EDAD
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            En el supuesto de ser mayor de dieciocho años, podrás registrarte en https://www.asegalbyfasesorias.cl sin necesidad del consentimiento previo de tus padres o tutores.
            <br /><br />
            ¿Qué ocurre en el caso de que seas menor de 18 años?
            <br /><br />
            En este supuesto, será condición obligatoria el consentimiento de tus padres o tutores para que podamos tratar sus datos personales.
            <br /><br />
            Advertencia: Si tienes menos de catorce años y no has obtenido el consentimiento de tus padres, no puedes registrarte en la web por lo que procederemos a denegar su solicitud en caso de tener constancia de ello.
          </Typography>

          {/* Sección 2.3 */}
          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
            2.3 LEGITIMACIÓN
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Gracias al consentimiento, podemos tratar tus datos siendo requisito obligatorio para poder suscribirte a la página web.
            <br /><br />
            Como bien sabes, puedes retirar tu consentimiento en el momento que lo desees.
          </Typography>

          {/* Sección 2.4 */}
          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
            2.4 CATEGORÍA DE LOS DATOS
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Los datos recabados en ningún momento son especialmente protegidos, sino que se encuentran categorizados como datos identificativos.
          </Typography>

          {/* Sección 2.5 */}
          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
            2.5 TIEMPO DE CONSERVACIÓN DE LOS DATOS
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Conservaré tus datos durante el tiempo legalmente establecido o hasta que solicites eliminarlos.
          </Typography>

          {/* Sección 2.6 */}
          <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 4, fontWeight: 'bold' }}>
            2.6 EXACTITUD Y VERACIDAD DE LOS DATOS
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Obviamente eres el único responsable de la veracidad y exactitud de los datos que me remitas eximiéndome de cualquier tipo de responsabilidad al respecto.
            <br /><br />
            Como usuario, debes garantizar la exactitud y autenticidad de los datos personales facilitados debiendo aportar la información completa y correcta en los distintos formularios de captación de datos.
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Sección 3 */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            3. CUMPLIMIENTO DE LA NORMATIVA DE APLICACIÓN
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Asegal B&F Asesorías, cumple con el Reglamento General (UE) sobre Protección de Datos, velando por garantizar un correcto uso y tratamiento de los datos personales del usuario.
            <br /><br />
            En cumplimiento de lo establecido en la normativa, le informamos que los datos suministrados, así como aquellos datos derivados de su navegación, podrán ser almacenados en los ficheros de Asegal B&F Asesorías y tratados para la finalidad de atender su solicitud y el mantenimiento de la relación que se establezca en los formularios que suscriba.
            <br /><br />
            Adicionalmente, el USUARIO consiente el tratamiento de sus datos con la finalidad de informarles, por cualquier medio, incluido el correo electrónico, de productos y servicios de Asegal B&F Asesorías.
            <br /><br />
            En caso de no autorizar el tratamiento de sus datos con la finalidad señalada anteriormente, el USUARIO podrá ejercer su derecho de oposición al tratamiento de sus datos en los términos y condiciones previstos más adelante en el apartado "Ejercicio de Derechos".
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Sección 4 */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            4. MEDIDAS DE SEGURIDAD
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Asegal B&F Asesorías le informa que tiene implantadas las medidas de seguridad de índole técnica y organizativas necesarias para garantizar la seguridad de sus datos de carácter personal y evitar su alteración, pérdida y tratamiento y/o acceso no autorizado, habida cuenta del estado de la tecnología, la naturaleza de los datos almacenados y los riesgos a que están expuestos, ya provengan de la acción humana o del medio físico o natural. Todo ello de conformidad con lo previsto en el RGPD.
            <br /><br />
            Asimismo, Asegal B&F Asesorías ha establecido medidas adicionales en orden a reforzar la confidencialidad e integridad de la información en su organización. Manteniendo continuamente la supervisión, control y evaluación de los procesos para asegurar el respeto a la privacidad de los datos.
            <br /><br />
            Igualmente, tal y como pueden comprobar, la web dispone de certificado SSL por lo que se garantiza la seguridad de sus datos.
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Sección 5 */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            5. EJERCICIO DE DERECHOS
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Aquellas personas físicas que hayan facilitado sus datos a través de https://www.asegalbyfasesorias.cl, podrán dirigirse al titular de la misma con el fin de poder ejercitar gratuitamente sus derechos de acceso a sus datos, rectificación o supresión, limitación y oposición respecto de los datos incorporados en sus ficheros.
            <br /><br />
            El método más rápido y sencillo sería accediendo en tu cuenta de usuario directamente y modificar tus datos o borrar tu cuenta de usuario. Cualquier información que necesitemos almacenar, en virtud de una obligación legal o contractual, será bloqueada y sólo utilizada para dichos fines en lugar de ser borrada.
            <br /><br />
            El interesado podrá ejercitar sus derechos mediante comunicación por escrito dirigida a asegalbyfasesorias.cl con la referencia "Protección de datos", especificando sus datos, acreditando su identidad y los motivos de su solicitud en la siguiente dirección:
            <br /><br />
            También podrá ejercitar los derechos, a través del correo electrónico: <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>CONTACTO@ASEGALBYFASESORIAS.CL</Box>
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Sección 6 */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            6. LINKS O ENLACES EXTERNOS
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Como un servicio a nuestros visitantes, nuestro sitio web puede incluir hipervínculos a otros sitios que no son operados o controlados por el Sitio Web. Por ello https://www.asegalbyfasesorias.cl/ no garantiza, ni se hace responsable de la licitud, fiabilidad, utilidad, veracidad y actualidad de los contenidos de tales sitios web o de sus prácticas de privacidad. Por favor, antes de proporcionar su información personal a estos sitios web ajenos a https://www.asegalbyfasesorias.cl/, tenga en cuenta que sus prácticas de privacidad pueden diferir de las nuestras.
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Sección 7 */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            7. MODIFICACIÓN DE LA POLÍTICA DE PRIVACIDAD
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            Asegal B&F Asesorías, se reserva el derecho a modificar su Política de Privacidad, de acuerdo a su propio criterio, motivado por un cambio legislativo, jurisprudencial o doctrinal de la Agencia Española de Protección de Datos.
            <br /><br />
            Cualquier modificación de la Política de Privacidad será publicada al menos diez días antes de su efectiva aplicación. El uso de Asegal B&F Asesorías después de dichos cambios, implicará la aceptación de los mismos.
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Sección 8 */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            8. RESPONSABLE DEL FICHERO, Y ENCARGADOS DEL TRATAMIENTO
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            El responsable del fichero de datos es Asegal B&F Asesorías.
            <br /><br />
            De los servicios de suscripción por correo electrónico y envío de newsletters a las compañías MAIL CHIMP (Identificada por la marca comercial "MAILCHIMP", empresa suscrita al Privacy Shield, pudiendo obtener más información en
            <br /><br />
            Asimismo también tiene contratados los servicios de email marketing con la compañía mail, identificada comercialmente como THINKIFIC.
            <br /><br />
            Como plataforma de webinars, se utilizan los servicios de Everwebinar.
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Sección 9 */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            9. ¿NO DESEAS RECIBIR INFORMACIÓN DE NOSOTROS O DESEAS REVOCAR TU CONSENTIMIENTO?
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            De conformidad con lo dispuesto en la Ley 34/20023, de 11 de junio de Servicios de la Sociedad de la Información y del Comercio Electrónico puedes oponerte al uso de su información para fines publicitarios, investigaciones de mercado o desarrollo de encuestas de satisfacción en cualquier momento, así como revocar tu consentimiento en cualquier momento (sin efecto retroactivo).
            <br /><br />
            Para ello, deberás enviar un correo electrónico a la dirección <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>CONTACTO@ASEGALBYFASESORIAS.CL</Box> Si has recibido publicidad por correo electrónico, también podrás oponerte desde dicho correo electrónico, pinchando en el enlace incluido en el mismo siguiendo las instrucciones que te sean facilitadas. Otra forma más sencilla sería acceder a tu cuenta de usuario y seleccionar las opciones correspondientes.
            <br /><br />
            Por favor, ten en cuenta que nuestros sistemas pueden requerir un lapso de tiempo que en ningún caso superará 48 horas para que tu oposición o revocación se hagan efectivas, entendiéndose que durante dicho periodo de tiempo puedes seguir recibiendo mensajes.
            <br /><br />
            En relación con la gestión de tus datos asociados a los perfiles sociales de Asegal B&F Asesorías, el ejercicio del derecho de acceso, dependerá de la funcionalidad de la red social y las posibilidades de acceso a la información de los perfiles de los usuarios. Con relación a los derechos de acceso y rectificación, le recomendamos que sólo podrá satisfacerse en relación a aquella información que se encuentre bajo el control de Asegal B&F Asesorías.
            <br /><br />
            Además podrá dejar de interactuar, seguir o recibir información de los perfiles sociales de Asegal B&F Asesorías, eliminar los contenidos que dejen de interesarte o restringir con quien comparte sus conexiones, mediante los mecanismos estipulados en las diferentes redes sociales.
            <br /><br />
            El usuario podrá acceder a las políticas de privacidad de cada Red Social, así como configurar su perfil para garantizar su privacidad Asegal B&F Asesorías anima a los usuarios a familiarizarse con las condiciones de uso de las distintas redes sociales antes de comenzar a usarlas.
            <br /><br />
            <Link href="https://www.facebook.com/help/323540651073243/" target="_blank" rel="noopener" color="primary">
              Facebook: https://www.facebook.com/help/323540651073243/
            </Link>
            <br />
            <Link href="https://twitter.com/privacy" target="_blank" rel="noopener" color="primary">
              Twitter: https://twitter.com/privacy
            </Link>
            <br />
            <Link href="https://help.instagram.com/155833707900388" target="_blank" rel="noopener" color="primary">
              Instagram: https://help.instagram.com/155833707900388
            </Link>
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Sección 10 */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            10. SISTEMAS DE CAPTURA DE DATOS PERSONALES Y SU FINALIDAD
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            1) Formularios de suscripción a contenidos: dentro de la web existen varios formularios para activar la suscripción gestionada por MAILCHIMP y THINKIFIC con la finalidad de enviar campañas de marketing por correo electrónico, gestión de suscripciones y envío de boletines o noticias.
            <br /><br />
            2) Formulario de comentarios: La web incluye un formulario cuya finalidad es comentar los artículos y dar su opinión respetando la libertad de expresión. El usuario podrá publicar comentarios en los post que se publiquen. Los datos personales introducidos en el formulario para insertar estos comentarios serán utilizados exclusivamente para moderarlos y publicarlos, recabando igualmente estos datos que se almacenarán en los servidores de WPengine.
            <br /><br />
            3) Formulario de contacto: Existe un formulario de contacto cuya finalidad es la respuesta de consultas, sugerencias o contacto profesional. En este caso se utilizará la dirección de correo electrónico para responder a las mismas y enviar la información que el usuario requiera a través de la web, estos datos se almacenarán en los servidores de WPengine, MAILCHIMP y THINKIFIC.
            <br /><br />
            4) Cookies: Cuando el usuario se registra o navega en esta web, se almacenan "cookies", El usuario puede consultar en cualquier momento la política de cookies para ampliar información sobre el uso de cookies y como desactivarlas.
            <br /><br />
            5) Venta de inforpoductos: A través de la página web, se pueden adquirir infoproductos, en este caso, se requieren datos del comprador (Nombre, apellido, dirección y e-mail) mediante la plataforma Thrivercart.
            <br /><br />
            6) Los usuarios podrán darse de baja en cualquier momento de los servicios prestados por https://www.asegalbyfasesorias.cl/ desde la misma Newsletter a través de un formulario de cancelación.
            <br /><br />
            7) Sistemas de rastreo utilizadas en este sitio: Google (Analytics), en https://www.asegalbyfasesorias.cl/ también se estudian las preferencias de sus usuarios, sus características demográficas, sus patrones de tráfico, y otra información en conjunto para comprender mejor quiénes constituyen su audiencia y qué es lo que esta necesita. El rastreo de las preferencias de nuestros usuarios también nos ayuda a mostrarle los avisos publicitarios más relevantes.
            <br /><br />
            Asimismo, me gustaría informarte que para la captación de suscriptores y clientes utilizo Facebook Ads teniendo instalado el correspondiente Pixel de Facebook, por lo que al generar un anuncio, se puede segmentar el público por el lugar, datos demográficos, intereses, etc por lo que los datos obtenidos por esta plataforma, estarían sujetos a esta política de privacidad desde el momento en que el usuario deja sus datos para unirse al boletín de mi comunidad.
            <br /><br />
            No voy a compartir, vender, alquilar tu información personal con otras partes. Puedo compartir cierta información con los proveedores de servicios de terceros autorizados necesarios para prestarte algunos servicios.
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Sección 11 */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            11. PLUGINS SOCIALES
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            En nuestra página web te ofrecemos enlaces y servicios relacionados con las diferentes redes sociales ( p.ej "Me gusta" de Facebook). Si eres miembro de una red social y haces clic sobre el correspondiente enlace, el proveedor de la red social podrá enlazar tus datos de perfil con la información e tu visita a dicha página web.
            <br /><br />
            Por tanto, es conveniente informarte sobre las funciones y políticas sobre el tratamiento de datos personales de la respectiva red social, si accedes a una de nuestras páginas web con alguno de tus perfiles en redes sociales o compartes información a través de ellos.
            <br /><br />
            Puedes acceder en todo momento a las políticas de privacidad de las diferentes redes sociales, así como configurar tu perfil para garantizar su privacidad. Os animamos a familiarizarse con las condiciones de uso de dichas redes sociales antes de comenzar a usarlas:
            <br /><br />
            <Link href="https://www.facebook.com/help/323540651073243/" target="_blank" rel="noopener" color="primary">
              Facebook: https://www.facebook.com/help/323540651073243/
            </Link>
            <br />
            <Link href="https://twitter.com/privacy" target="_blank" rel="noopener" color="primary">
              Twitter: https://twitter.com/privacy
            </Link>
            <br />
            <Link href="https://help.instagram.com/155833707900388" target="_blank" rel="noopener" color="primary">
              Instagram: https://help.instagram.com/155833707900388
            </Link>
          </Typography>

          <Divider sx={{ my: 4 }} />

          {/* Sección 12 */}
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            12. ACEPTACIÓN, CONSENTIMIENTO Y REVOCABILIDAD
          </Typography>
          <Typography variant="body1" color="primary" paragraph>
            El Usuario declara haber sido informado de las condiciones sobre protección de datos de carácter personal, aceptando y consintiendo el tratamiento de los mismos por parte de Asegal B&F Asesorías en la forma y para las finalidades indicadas en el aviso legal.
            <br /><br />
            Como bien sabes y le hemos comunicado a lo largo de las presentes políticas de privacidad, en cualquier momento podrá revocar sus datos, pero siempre sin carácter retroactivo.
          </Typography>

          {/* Contacto final */}
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Para cualquier consulta sobre nuestra política de privacidad:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#18148C' }}>
              CONTACTO@ASEGALBYFASESORIAS.CL
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}