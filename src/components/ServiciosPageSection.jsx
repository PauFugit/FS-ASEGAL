'use client'
import React, { useState } from 'react';
import { Box, Typography, Button, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ServiceCard = ({ title, description, image, steps, reverse = false }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      sx={{
        mb: { xs: 6, md: 8 },
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid
        container
        direction={reverse ? 'row-reverse' : 'row'}
        alignItems="stretch"
        spacing={0}
        sx={{
          minHeight: { md: 340, lg: 380 },
          width: '100%',
          maxWidth: { xs: 380, sm: 600, md: 900, lg: 1050, xl: 1200 },
          mx: 'auto',
          bgcolor: 'transparent',
        }}
      >
        {/* Imagen */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            minHeight: { xs: 200, md: '100%' },
            p: { xs: 1.5, md: 2.5 },
          }}
        >
          <Box
            component="img"
            src={image}
            alt={title}
            sx={{
              width: 400,
              height: { xs: 180, md: 220, lg: 400 },
              maxWidth: 400,
              objectFit: 'cover',
              borderRadius: '22px',
              background: '#fff',
              display: 'block',
            }}
          />
        </Grid>

        {/* Contenido */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            display: 'flex',
            alignItems: 'center',
            minHeight: { xs: 'auto', md: '100%' },
            p: { xs: 1.5, md: 2.5 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: '100%', md: 600, lg: 700 },
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: '#18148C',
                fontWeight: 700,
                mb: 3,
                fontSize: { xs: '1.2rem', md: '1.5rem', xl: '2.2rem' },
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                overflow: 'hidden',
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#0B5B8C',
                mb: 3,
                lineHeight: 1.6,
                fontSize: { xs: '0.98rem', md: '1.05rem', xl: '1.3rem' },
                whiteSpace: 'pre-line',
              }}
            >
              {description}
            </Typography>

            <Typography
              variant="h4"
              sx={{
                color: '#18148C',
                fontWeight: 600,
                fontSize: { xs: '0.98rem', md: '1.05rem', xl: '1.3rem' },
                mb: 2,
              }}
            >
              ¿Cómo trabajamos? ¡Sigue nuestra pauta!
            </Typography>

            <Accordion
              expanded={expanded}
              onChange={() => setExpanded(!expanded)}
              sx={{
                boxShadow: 'none',
                '&:before': { display: 'none' },
                background: 'transparent',
                mb: 2,
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: '#F2AC57' }} />}
                sx={{
                  p: 0,
                  minHeight: 'auto',
                  '& .MuiAccordionSummary-content': {
                    m: 0,
                    '&.Mui-expanded': { m: 0 },
                  },
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: '#F26A1B',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {expanded ? 'Mostrar menos' : 'Mostrar detalles'}
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ p: 0 }}>
                <Box
                  component="ol"
                  sx={{
                    pl: 2.5,
                    '& li': {
                      mb: 1.2,
                      pl: 1,
                      '&::marker': {
                        color: '#18148C',
                        fontWeight: 700,
                      },
                    },
                  }}
                >
                  {steps.map((step, index) => (
                    <li key={index}>
                      <Typography variant="body2" sx={{ color: '#18148C',
                fontSize: { xs: '0.6rem', md: '0.8rem', xl: '1rem' }
                       }}>
                        {step}
                      </Typography>
                    </li>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#F2AC57',
                  color: 'white',
                  borderRadius: '24px',
                  px: 4,
                  py: 1.2,
                  fontSize: { xs: '0.6rem', md: '0.8rem', xl: '1rem' },
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0px 2px 8px 0px #F2AC5722',
                  '&:hover': {
                    backgroundColor: '#ffffff',
                    color: '#F2AC57',
                    border: '2px solid #F2AC57',
                  },
                }}
              >
                COTIZAR SERVICIO
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const ServiciosSection = () => {
  const servicios = [
    {
      title: "RESOLUCIÓN SANITARIA (RS)",
      description: "Te brindamos asesoría y acompañamiento en cada etapa del proceso para obtener la resolución sanitaria de tu negocio y abrirte a nuevos mercados.",
      image: "/resolucionsanitaria.jpg",
      steps: [
        "1. Reunión inicial online: Diagnostico de las necesidades de tu empresa",
        "2. Visita a la instalación: Evaluación de infraestructura y layout",
        "3. Preparación de documentos: Recopilación y confección de protocolos de manejo seguro de los alimentos BPM.",
        "4. Entrega de documentos: Tramitación en plataforma SEREMI y seguimiento.",
        "5. Obtención de la resolución sanitaria."
      ]
    },
    {
      title: "BUENAS PRÁCTICAS DE MANIPULACIÓN (BPM)",
      description: "Uno de las exigencias para obtener la RS de tu negocio gastronómico, es contar con un Manual de BPM para garantizar la inocuidad de tus productos.",
      image: "/auditorias.jpg",
      steps: [
        "1. Reunión inicial online: Diagnostico de las necesidades de tu empresa.",
        "2. Preparación de documentos: Recopilación de información, confección de protocolos y registros de manejo seguro de los alimentos, que incluye:",
        "◦ Aspecto del personal",
        "◦ Seguridad del agua",
        "◦ Manejo de productos químicos",
        "◦ Limpieza y sanitización",
        "◦ Manejo integrado de plagas",
        "◦ Mantención de equipos",
        "◦ Control de temperaturas",
        "◦ Otros.",
        "3. Entrega de documentos: Manual de BPM adaptado de tu negocio" 
      ],
      reverse: true
    },
    {
      title: "Auditorias de BPM",
      description: "Somos tu aliado estratégico de confianza, mediante un auditor interno que revisa, examina y evalúa el cumplimiento de las BPM de tus procesos productivos según las normativas sanitarias vigentes.",
      image: "/gestioncalidad.jpg",
      steps: [
        "1. Visita de instalaciones: Se aplica un check list sanitario de BPM para ver el estado de cumplimiento regulatorio de los procesos.",
        "2. Plan de acción: Se hace entrega del informe técnico con las mejoras, detallando cada actividad a realizarse.",
        "3. Seguimiento: Te brindamos apoyo ante dudas o consultas para la implementación de las mejoras durante 1 mes. Además, puedes establecer una frecuencia de auditorías internas para mantener controladas tus BPM en la producción y evitar sanciones sanitarias y/o clausura de local."
      ],
      reverse: false
    },
    {
      title: "ETIQUETADO NUTRICIONAL",
      description: "En Asegal B&F ponemos nuestro conocimiento y experiencia a tu disposición para ayudarte a generar un rotulado nutricional confiable de tus productos. Utilizando el método oficial de tablas de composición, hacemos los cálculos nutricionales y desarrollamos la etiqueta de tu producto.",
      image: "/burbujatres.jpg",
      steps: [
        "1. Reunión inicial online: Recopilación de información",
        "2. Desarrollo etiqueta nutricional: cálculos nutricionales según receta, identificación de sellos, alergenos y mensajes saludables según corresponda.",
        "3. Entrega de etiqueta: En formato digital lista para impresión y certificado profesional acreditando fuentes de cálculo."
      ],
      reverse: true
    },
    {
      title: "CAPACITACIONES",
      description: "El primer paso para crear alimentos seguros es la formación íntegra y de calidad de tus manipuladores de alimentos, es por esto que contamos con los siguientes programas de capacitación:",
      image: "/etiquetado.jpg",
      steps: [
        "1) Programa BPM: Se capacita a tu personal sobre las BPM de tus procesos productivos que abarca los siguientes items:",
        "◦ Aspecto del personal",
        "◦ Seguridad del agua",
        "◦ Manejo de productos químicos",
        "◦ Limpieza y sanitización",
        "◦ Manejo integrado de plagas",
        "◦ Mantención de equipos",
        "◦ Control de temperaturas",
        "◦ Otros: Contaminación cruzada, Manejo de residuos",
        "2) Programa Trazabilidad: Se capacita a todo el personal sobre la importancia de la trazabilidad en la producción y los registros asociados, que abarcan desde la recepción de MP, hasta la elaboración del producto final.",
        "3) Obtención Resolución Sanitaria.",
      ],
      reverse: false
    }
  ];

  return (
    <Box sx={{
      py: 8,
      px: { xs: 1, md: 2 },
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      bgcolor: '#fff'
    }}>
      {servicios.map((servicio, index) => (
        <ServiceCard
          key={index}
          title={servicio.title}
          description={servicio.description}
          image={servicio.image}
          steps={servicio.steps}
          reverse={servicio.reverse}
        />
      ))}
    </Box>
  );
};

export default ServiciosSection;