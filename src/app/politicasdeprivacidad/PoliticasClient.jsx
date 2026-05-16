'use client'
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
  Link,
  Button
} from '@mui/material';

export default function Privacidad() {
  return (
    <Box sx={{ 
      background: 'linear-gradient(to bottom, #f9f9f9, #ffffff)',
      minHeight: '100vh',
      color: '#18148C',
      pt: 2
    }}>
      {/* Header */}
      <Box sx={{ 
        bgcolor: '#18148C', 
        color: 'white', 
        textAlign: 'center', 
        py: 6,
        px: 2,
        boxShadow: 3,
        backgroundImage: 'linear-gradient(135deg, #18148C 0%, #0d0a5a 100%)'
      }}>
        <Typography variant="h3" component="h1" sx={{ 
          fontWeight: 'bold',
          mb: 2,
          textTransform: 'uppercase',
          letterSpacing: 1.5
        }}>
          Política de Privacidad
        </Typography>
      </Box>

      {/* Main Content */}
      <Container maxWidth="md" sx={{ py: 6, px: { xs: 2, sm: 3 } }}>
        <Paper elevation={4} sx={{ 
          p: { xs: 3, md: 5 }, 
          mb: 4,
          borderRadius: 3,
          borderLeft: '4px solid #F2AC57'
        }}>
          
          
          <Typography variant="body1" paragraph sx={{ 
            color: '#18148C',
            lineHeight: 1.8,
            mb: 3
          }}>
            Agradezco que estés en esta página, eso significa que tus datos te importan, y quieres conocer el destino de los mismos y quién los recoge.
            <br /><br />
            De conformidad con lo dispuesto en el Reglamento General (UE) Sobre Protección de Datos, mediante la aceptación de la presente Política de Privacidad prestas tu consentimiento informado, expreso, libre e inequívoco para que los datos personales que proporciones a través de la página web asegalbyfasesorias.cl/ (en adelante SITIO WEB) sean incluidos en un fichero de "USUARIOS WEB Y SUSCRIPTORES" así como "CLIENTES Y/O PROVEEDORES":
          </Typography>

          <List dense sx={{ pl: 2, mb: 4 }}>
            <ListItem sx={{ 
              px: 0,
              alignItems: 'flex-start',
              '&:before': {
                content: '"•"',
                color: '#F2AC57',
                fontSize: '1.5rem',
                lineHeight: 1,
                mr: 1.5
              }
            }}>
              <ListItemText 
                primary="Denominación social: CAROLINA ANDREA FERNÁNDEZ VALDIVIA - CAROLINA MADELEINE BERTHELON VEGA" 
                primaryTypographyProps={{ 
                  color: '#18148C',
                  fontSize: '1rem'
                }}
              />
            </ListItem>
            <ListItem sx={{ 
              px: 0,
              alignItems: 'flex-start',
              '&:before': {
                content: '"•"',
                color: '#F2AC57',
                fontSize: '1.5rem',
                lineHeight: 1,
                mr: 1.5
              }
            }}>
              <ListItemText 
                primary="Mi domicilio social se encuentra en Antofagasta, Chile" 
                primaryTypographyProps={{ 
                  color: '#18148C',
                  fontSize: '1rem'
                }}
              />
            </ListItem>
            <ListItem sx={{ 
              px: 0,
              alignItems: 'flex-start',
              '&:before': {
                content: '"•"',
                color: '#F2AC57',
                fontSize: '1.5rem',
                lineHeight: 1,
                mr: 1.5
              }
            }}>
              <ListItemText 
                primary="Email: contacto@asegalbyfasesorias.cl" 
                primaryTypographyProps={{ 
                  color: '#18148C',
                  fontSize: '1rem'
                }}
              />
            </ListItem>
            <ListItem sx={{ 
              px: 0,
              alignItems: 'flex-start',
              '&:before': {
                content: '"•"',
                color: '#F2AC57',
                fontSize: '1.5rem',
                lineHeight: 1,
                mr: 1.5
              }
            }}>
              <ListItemText 
                primary="Mi actividad social es: Asesorías integrales alimentarias." 
                primaryTypographyProps={{ 
                  color: '#18148C',
                  fontSize: '1rem'
                }}
              />
            </ListItem>
          </List>

          <Typography variant="body1" paragraph sx={{ 
            color: '#18148C',
            lineHeight: 1.8,
            mb: 4
          }}>
            La presente Política de Privacidad será válida únicamente para los datos de carácter personal obtenidos en el Sitio Web, no siendo aplicable para aquella información recabada por terceros en otras páginas web, incluso si éstas se encuentran enlazadas por el Sitio Web.
            <br /><br />
            Con ello manifiesto mi compromiso por mantener y garantizar las relaciones comerciales de forma seguridad mediante la protección de los datos personales y garantizando el derecho a la privacidad de cada uno de los usuarios de nuestro sitio web.
          </Typography>

          <Divider sx={{ 
            my: 6,
            borderColor: '#F2AC57',
            borderWidth: 1
          }} />

          {/* Sección 1 */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" component="h2" sx={{
              color: '#18148C',
              fontWeight: 'bold',
              mb: 3,
              display: 'flex',
              alignItems: 'center'
            }}>
              <Box component="span" sx={{
                width: 8,
                height: 8,
                bgcolor: '#F2AC57',
                borderRadius: '50%',
                mr: 2
              }}></Box>
              1. ¿QUÉ SON LOS DATOS PERSONALES?
            </Typography>
            <Typography variant="body1" paragraph sx={{ 
              color: '#18148C',
              lineHeight: 1.8,
              mb: 3
            }}>
              Una pequeña aproximación es importante, por ello, debes saber que sería cualquier información relativa a una persona que nos facilita cuando visita nuestro sitio web, en nuestro caso nombre e email, y si compra algún producto necesitando factura, solicitaremos Domicilio completo, nombre, apellidos, rut, email, DNI o CIF.
              <br /><br />
              Adicionalmente, cuando visitas nuestro sitio web, determinada información se almacena automáticamente por motivos técnicos como la dirección IP asignada por su proveedor de acceso a Internet.
            </Typography>

            <Typography variant="h6" component="h3" sx={{ 
              mt: 4,
              color: '#18148C',
              fontWeight: 'bold',
              mb: 2
            }}>
              PRINCIPIOS PARA EL TRATAMIENTO DE DATOS
            </Typography>
            <Typography variant="body1" paragraph sx={{ 
              color: '#18148C',
              lineHeight: 1.8,
              mb: 3
            }}>
              Para tratar tus datos personales, aplicaré según el RGPD los siguientes principios:
            </Typography>

            <List sx={{ pl: 0, mb: 3 }}>
              <ListItem sx={{ 
                px: 0,
                alignItems: 'flex-start',
                mb: 2
              }}>
                <Box sx={{
                  minWidth: 24,
                  height: 24,
                  bgcolor: '#F2AC57',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  mt: '2px'
                }}>
                  <Box component="span" sx={{ 
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    1
                  </Box>
                </Box>
                <ListItemText 
                  primary={
                    <Typography variant="body1" sx={{ color: '#18148C' }}>
                      <Box component="span" sx={{ fontWeight: 'bold', color: '#F2AC57' }}>Principio de licitud, lealtad y transparencia:</Box> Siempre voy a requerir tu consentimiento para el tratamiento de tus datos personales para uno o varios fines específicos que te informaré previamente con absoluta transparencia.
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ 
                px: 0,
                alignItems: 'flex-start',
                mb: 2
              }}>
                <Box sx={{
                  minWidth: 24,
                  height: 24,
                  bgcolor: '#F2AC57',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  mt: '2px'
                }}>
                  <Box component="span" sx={{ 
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    2
                  </Box>
                </Box>
                <ListItemText 
                  primary={
                    <Typography variant="body1" sx={{ color: '#18148C' }}>
                      <Box component="span" sx={{ fontWeight: 'bold', color: '#F2AC57' }}>Principio de minimización de datos:</Box> Solo voy a solicitar datos estrictamente necesarios en relación con los fines para los que los requiero.
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ 
                px: 0,
                alignItems: 'flex-start',
                mb: 2
              }}>
                <Box sx={{
                  minWidth: 24,
                  height: 24,
                  bgcolor: '#F2AC57',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  mt: '2px'
                }}>
                  <Box component="span" sx={{ 
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    3
                  </Box>
                </Box>
                <ListItemText 
                  primary={
                    <Typography variant="body1" sx={{ color: '#18148C' }}>
                      <Box component="span" sx={{ fontWeight: 'bold', color: '#F2AC57' }}>Principio de limitación del plazo de conservación:</Box> como más adelante podrás comprobar, los datos serán mantenidos durante no más tiempo del necesario para los fines del tratamiento, en función a la finalidad, te informaré del plazo de conservación correspondiente, en el caso de suscripciones, periódicamente revisaré mis listas y eliminaré aquellos registros inactivos durante un tiempo considerable.
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem sx={{ 
                px: 0,
                alignItems: 'flex-start',
                mb: 2
              }}>
                <Box sx={{
                  minWidth: 24,
                  height: 24,
                  bgcolor: '#F2AC57',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2,
                  mt: '2px'
                }}>
                  <Box component="span" sx={{ 
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    4
                  </Box>
                </Box>
                <ListItemText 
                  primary={
                    <Typography variant="body1" sx={{ color: '#18148C' }}>
                      <Box component="span" sx={{ fontWeight: 'bold', color: '#F2AC57' }}>Principio de integridad y confidencialidad:</Box> Tus datos serán tratados de tal manera que se garantice una seguridad adecuada de los datos personales y se garantice confidencialidad. Debes saber que tomo todas las medidas encaminadas a evitar el acceso no autorizado o uso indebido de los datos de mis usuarios por parte de terceros.
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Box>

          <Divider sx={{ 
            my: 6,
            borderColor: '#F2AC57',
            borderWidth: 1
          }} />

          {/* Sección 2 */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" component="h2" sx={{
              color: '#18148C',
              fontWeight: 'bold',
              mb: 3,
              display: 'flex',
              alignItems: 'center'
            }}>
              <Box component="span" sx={{
                width: 8,
                height: 8,
                bgcolor: '#F2AC57',
                borderRadius: '50%',
                mr: 2
              }}></Box>
              2. FINALIDAD, LEGITIMACION, CATEGORÍA DE LOS DATOS RECABADOS, CONSENTIMIENTO AL TRATAMIENTO, MENORES DE EDAD.
            </Typography>
            
            <Typography variant="h6" component="h3" sx={{ 
              mt: 3,
              color: '#18148C',
              fontWeight: 'bold',
              mb: 2
            }}>
              2.1 FINALIDAD
            </Typography>
            <Typography variant="body1" paragraph sx={{ 
              color: '#18148C',
              lineHeight: 1.8,
              mb: 3
            }}>
              Tal y como se recoge en la normativa, se informa al USUARIO que, a través de los formularios de contacto, o suscripciones se recaban datos, los cuales se almacenan en un fichero, con la exclusiva finalidad de envío de comunicaciones electrónicas, tales como: boletines (newsletters), nuevas entradas (posts), ofertas comerciales, webinars gratuitos, así como otras comunicaciones que Asegal B&F Asesorías entiende interesantes para sus USUARIOS. Los campos marcados como de cumplimentación obligatoria, son imprescindibles para realizar la finalidad expresada.
              <br /><br />
              Asimismo podrá dar cumplimiento mediante los datos, a los requerimientos solicitados por los USUARIOS.
              <br /><br />
              En definitiva la FINALIDAD es la siguiente:
            </Typography>

            <List dense sx={{ pl: 0, mb: 4 }}>
              {[
                "La venta de formación sobre Negocios Online.",
                "La venta de Ebooks, libros y productos.",
                "Gestionar la lista de suscriptores y usuarios adscritos a la web.",
                "Suministro de contenidos en el blog.",
                "Dirigir su red de afiliados y comerciantes así como la gestión de pagos de los mismos."
              ].map((item, index) => (
                <ListItem key={index} sx={{ 
                  px: 0,
                  alignItems: 'flex-start',
                  '&:before': {
                    content: '"•"',
                    color: '#F2AC57',
                    fontSize: '1.5rem',
                    lineHeight: 1,
                    mr: 1.5
                  }
                }}>
                  <ListItemText 
                    primary={item} 
                    primaryTypographyProps={{ 
                      color: '#18148C',
                      fontSize: '1rem'
                    }}
                  />
                </ListItem>
              ))}
            </List>

            <Typography variant="body1" paragraph sx={{ 
              color: '#18148C',
              lineHeight: 1.8,
              mb: 4
            }}>
              Únicamente el titular tendrá acceso a sus datos, y bajo ningún concepto, estos datos serán cedidos, compartidos, transferidos, ni vendidos a ningún tercero.
              <br /><br />
              La aceptación de la política de privacidad, mediante el procedimiento establecido de dole opt-in, se entenderá a todos los efectos como la prestación de CONSENTIMIENTO EXPRESO E INEQUIVOCO del USUARIO al tratamiento de los datos de carácter personal en los términos que se exponen en el presente documento, así como a la transferencia internacional de datos que se produce, exclusivamente debido a la ubicación física de las instalaciones de los proveedores de servicios y encargados del tratamiento de datos.
              <br /><br />
              En ningún caso se realizará un uso diferente que la finalidad para los que han sido recabados los datos ni muchos menos cederé a un tercero estos datos.
            </Typography>

            {/* Sección 2.2 */}
            <Typography variant="h6" component="h3" sx={{ 
              mt: 4,
              color: '#18148C',
              fontWeight: 'bold',
              mb: 2
            }}>
              2.2 MENORES DE EDAD
            </Typography>
            <Typography variant="body1" paragraph sx={{ 
              color: '#18148C',
              lineHeight: 1.8,
              mb: 3
            }}>
              En el supuesto de ser mayor de dieciocho años, podrás registrarte en https://www.asegalbyfasesorias.cl sin necesidad del consentimiento previo de tus padres o tutores.
              <br /><br />
              ¿Qué ocurre en el caso de que seas menor de 18 años?
              <br /><br />
              En este supuesto, será condición obligatoria el consentimiento de tus padres o tutores para que podamos tratar sus datos personales.
              <br /><br />
              Advertencia: Si tienes menos de catorce años y no has obtenido el consentimiento de tus padres, no puedes registrarte en la web por lo que procederemos a denegar su solicitud en caso de tener constancia de ello.
            </Typography>

            {/* Sección 2.3 */}
            <Typography variant="h6" component="h3" sx={{ 
              mt: 4,
              color: '#18148C',
              fontWeight: 'bold',
              mb: 2
            }}>
              2.3 LEGITIMACIÓN
            </Typography>
            <Typography variant="body1" paragraph sx={{ 
              color: '#18148C',
              lineHeight: 1.8,
              mb: 3
            }}>
              Gracias al consentimiento, podemos tratar tus datos siendo requisito obligatorio para poder suscribirte a la página web.
              <br /><br />
              Como bien sabes, puedes retirar tu consentimiento en el momento que lo desees.
            </Typography>

            {/* Sección 2.4 */}
            <Typography variant="h6" component="h3" sx={{ 
              mt: 4,
              color: '#18148C',
              fontWeight: 'bold',
              mb: 2
            }}>
              2.4 CATEGORÍA DE LOS DATOS
            </Typography>
            <Typography variant="body1" paragraph sx={{ 
              color: '#18148C',
              lineHeight: 1.8,
              mb: 3
            }}>
              Los datos recabados en ningún momento son especialmente protegidos, sino que se encuentran categorizados como datos identificativos.
            </Typography>

            {/* Sección 2.5 */}
            <Typography variant="h6" component="h3" sx={{ 
              mt: 4,
              color: '#18148C',
              fontWeight: 'bold',
              mb: 2
            }}>
              2.5 TIEMPO DE CONSERVACIÓN DE LOS DATOS
            </Typography>
            <Typography variant="body1" paragraph sx={{ 
              color: '#18148C',
              lineHeight: 1.8,
              mb: 3
            }}>
              Conservaré tus datos durante el tiempo legalmente establecido o hasta que solicites eliminarlos.
            </Typography>

            {/* Sección 2.6 */}
            <Typography variant="h6" component="h3" sx={{ 
              mt: 4,
              color: '#18148C',
              fontWeight: 'bold',
              mb: 2
            }}>
              2.6 EXACTITUD Y VERACIDAD DE LOS DATOS
            </Typography>
            <Typography variant="body1" paragraph sx={{ 
              color: '#18148C',
              lineHeight: 1.8,
              mb: 3
            }}>
              Obviamente eres el único responsable de la veracidad y exactitud de los datos que me remitas eximiéndome de cualquier tipo de responsabilidad al respecto.
              <br /><br />
              Como usuario, debes garantizar la exactitud y autenticidad de los datos personales facilitados debiendo aportar la información completa y correcta en los distintos formularios de captación de datos.
            </Typography>
          </Box>

          <Divider sx={{ 
            my: 6,
            borderColor: '#F2AC57',
            borderWidth: 1
          }} />

          {/* Sección 3 */}
          <Box sx={{ mb: 6 }}>
            <Typography variant="h5" component="h2" sx={{
              color: '#18148C',
              fontWeight: 'bold',
              mb: 3,
              display: 'flex',
              alignItems: 'center'
            }}>
              <Box component="span" sx={{
                width: 8,
                height: 8,
                bgcolor: '#F2AC57',
                borderRadius: '50%',
                mr: 2
              }}></Box>
              3. CUMPLIMIENTO DE LA NORMATIVA DE APLICACIÓN
            </Typography>
            <Typography variant="body1" paragraph sx={{ 
              color: '#18148C',
              lineHeight: 1.8,
              mb: 3
            }}>
              Asegal B&F Asesorías, cumple con el Reglamento General (UE) sobre Protección de Datos, velando por garantizar un correcto uso y tratamiento de los datos personales del usuario.
              <br /><br />
              En cumplimiento de lo establecido en la normativa, le informamos que los datos suministrados, así como aquellos datos derivados de su navegación, podrán ser almacenados en los ficheros de Asegal B&F Asesorías y tratados para la finalidad de atender su solicitud y el mantenimiento de la relación que se establezca en los formularios que suscriba.
              <br /><br />
              Adicionalmente, el USUARIO consiente el tratamiento de sus datos con la finalidad de informarles, por cualquier medio, incluido el correo electrónico, de productos y servicios de Asegal B&F Asesorías.
              <br /><br />
              En caso de no autorizar el tratamiento de sus datos con la finalidad señalada anteriormente, el USUARIO podrá ejercer su derecho de oposición al tratamiento de sus datos en los términos y condiciones previstos más adelante en el apartado "Ejercicio de Derechos".
            </Typography>
          </Box>

          {/* Continuar con las demás secciones siguiendo el mismo patrón... */}

          {/* Contacto final */}
          <Box sx={{ 
            mt: 8,
            textAlign: 'center',
            p: 4,
            bgcolor: '#f5f7fa',
            borderRadius: 2,
            borderLeft: '4px solid #F2AC57'
          }}>
            <Typography variant="h6" gutterBottom sx={{
              color: '#18148C',
              fontWeight: 'bold',
              mb: 3
            }}>
              ¿Tienes preguntas sobre nuestra política de privacidad?
            </Typography>
            <Typography variant="body1" sx={{ 
              color: '#18148C',
              mb: 3,
              fontSize: '1.1rem'
            }}>
              Estamos aquí para ayudarte y proteger tus datos personales.
            </Typography>
            <Button
              variant="contained"
              href="mailto:contacto@asegalbyfasesorias.cl"
              sx={{
                bgcolor: '#F2AC57',
                color: 'white',
                fontWeight: 'bold',
                px: 4,
                py: 1.5,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: '#e09b4a'
                }
              }}
            >
              CONTÁCTANOS
            </Button>
            <Typography variant="body2" sx={{ 
              mt: 3,
              color: '#18148C',
              fontWeight: 'bold'
            }}>
              contacto@asegalbyfasesorias.cl
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}