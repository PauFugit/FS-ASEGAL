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
                direction={{ xs: 'column', md: reverse ? 'row-reverse' : 'row' }}
                alignItems="stretch"
                spacing={0}
                sx={{
                    minHeight: { md: 340, lg: 380 },
                    width: '100%',
                    maxWidth: { 
                        xs: 380, 
                        sm: 600, 
                        md: 900, 
                        lg: 1050, 
                        xl: 1200 
                    },
                    mx: 'auto',
                    bgcolor: 'transparent',
                    '@media (min-width: 900px) and (max-width: 1535px)': {
                        maxWidth: '95%',
                        alignItems: 'center'
                    }
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
                        p: { 
                            xs: 1.5, 
                            md: 2.5,
                            '@media (min-width: 900px) and (max-width: 1535px)': {
                                p: 2
                            }
                        },
                        '@media (min-width: 900px) and (max-width: 1535px)': {
                            width: '40%',
                            flex: '0 0 40%'
                        }
                    }}
                >
                    <Box
                        component="img"
                        src={image}
                        alt={title}
                        sx={{
                            width: '100%',
                            height: { 
                                xs: 180, 
                                md: '100%',
                                '@media (min-width: 900px) and (max-width: 1535px)': {
                                    height: 280
                                }
                            },
                            maxWidth: {
                                md: 400,
                                '@media (min-width: 900px) and (max-width: 1535px)': {
                                    maxWidth: 350
                                }
                            },
                            maxHeight: { 
                                md: 320, 
                                lg: 360 
                            },
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
                        p: { 
                            xs: 1.5, 
                            md: 2.5,
                            '@media (min-width: 900px) and (max-width: 1535px)': {
                                p: 2,
                                pl: reverse ? 0 : 3,
                                pr: reverse ? 3 : 0
                            }
                        },
                        '@media (min-width: 900px) and (max-width: 1535px)': {
                            width: '60%',
                            flex: '0 0 60%'
                        }
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: { 
                                xs: '100%', 
                                md: 600, 
                                lg: 700,
                                '@media (min-width: 900px) and (max-width: 1535px)': {
                                    maxWidth: '100%'
                                }
                            },
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
                                fontSize: { 
                                    xs: '1.2rem', 
                                    md: '1.5rem', 
                                    xl: '2.2rem',
                                    '@media (min-width: 900px) and (max-width: 1535px)': {
                                        fontSize: '1.4rem'
                                    }
                                },
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
                                fontSize: { 
                                    xs: '0.98rem', 
                                    md: '1.05rem', 
                                    xl: '1.3rem',
                                    '@media (min-width: 900px) and (max-width: 1535px)': {
                                        fontSize: '1rem'
                                    }
                                },
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
                                fontSize: { 
                                    xs: '0.98rem', 
                                    md: '1.05rem', 
                                    xl: '1.3rem',
                                    '@media (min-width: 900px) and (max-width: 1535px)': {
                                        fontSize: '1rem'
                                    }
                                },
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
                                            <Typography variant="body2" sx={{
                                                color: '#18148C',
                                                fontSize: { 
                                                    xs: '0.8rem', 
                                                    md: '0.1rem', 
                                                    xl: '1rem',
                                                    '@media (min-width: 900px) and (max-width: 1535px)': {
                                                        fontSize: '0.75rem'
                                                    }
                                                }
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
                                    fontSize: { 
                                        xs: '0.6rem', 
                                        md: '0.8rem', 
                                        xl: '1rem',
                                        '@media (min-width: 900px) and (max-width: 1535px)': {
                                            fontSize: '0.75rem'
                                        }
                                    },
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
            image: "/cardservicios1.jpg",
            steps: [
              <>
                    <span style={{ fontWeight: 'bold' }}>
                        Reunión inicial online:
                    </span>
                    {" Diagnóstico de las necesidades de tu empresa"}
                </>,
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        Visita a la instalación:
                    </span>
                    {" Evaluación de infraestructura y layout"}
                </>,
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        Preparación de documentos:
                    </span>
                    {" Recopilación y confección de protocolos de manejo seguro de los alimentos BPM."}
                </>,
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        Entrega de documentos:
                    </span>
                    {" Tramitación en plataforma SEREMI y seguimiento."}
                </>,
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        Obtención de la resolución sanitaria.
                    </span>
                </>
            
            ]
        },
        {
            title: "BUENAS PRÁCTICAS DE MANIPULACIÓN (BPM)",
            description: "Uno de las exigencias para obtener la RS de tu negocio gastronómico, es contar con un Manual de BPM para garantizar la inocuidad de tus productos.",
            image: "/cardservicios3.jpg",
            steps: [
            <>
                    <span style={{ fontWeight: 'bold' }}>
                        Reunión inicial online:
                    </span>
                    {" Diagnóstico de las necesidades de tu empresa."}
                </>,
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        Preparación de documentos:
                    </span>
                    {" Recopilación de información, confección de protocolos y registros de manejo seguro de los alimentos, que incluye:"}
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Aspecto del personal
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Seguridad del agua
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Manejo de productos químicos
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Limpieza y sanitización
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Manejo integrado de plagas
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Mantención de equipos
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Control de temperaturas
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Otros.
                    </span>
                </>,
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        Entrega de documentos:
                    </span>
                    {" Manual de BPM adaptado de tu negocio"}
                </>
            ],
            reverse: true
        },
        {
            title: "Auditorias de BPM",
            description: "Somos tu aliado estratégico de confianza, mediante un auditor interno que revisa, examina y evalúa el cumplimiento de las BPM de tus procesos productivos según las normativas sanitarias vigentes.",
            image: "/cardservicios4.jpg",
            steps: [
            <>
                    <span style={{ fontWeight: 'bold' }}>
                        Visita de instalaciones:
                    </span>
                    {" Se aplica un check list sanitario de BPM para ver el estado de cumplimiento regulatorio de los procesos."}
                </>,
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        Plan de acción:
                    </span>
                    {" Se hace entrega del informe técnico con las mejoras, detallando cada actividad a realizarse."}
                </>,
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        Seguimiento:
                    </span>
                    {" Te brindamos apoyo ante dudas o consultas para la implementación de las mejoras durante 1 mes. Además, puedes establecer una frecuencia de auditorías internas para mantener controladas tus BPM en la producción y evitar sanciones sanitarias y/o clausura de local."}
                </>
            ],
            reverse: false
        },
        {
            title: "ETIQUETADO NUTRICIONAL",
            description: "En Asegal B&F ponemos nuestro conocimiento y experiencia a tu disposición para ayudarte a generar un rotulado nutricional confiable de tus productos. Utilizando el método oficial de tablas de composición, hacemos los cálculos nutricionales y desarrollamos la etiqueta de tu producto.",
            image: "/servicios3.jpg",
            steps: [
            <>
                    <span style={{ fontWeight: 'bold' }}>
                        Reunión inicial online:
                    </span>
                    {" Recopilación de información"}
                </>,
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        Desarrollo etiqueta nutricional:
                    </span>
                    {" cálculos nutricionales según receta, identificación de sellos, alergenos y mensajes saludables según corresponda."}
                </>,
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        Entrega de etiqueta:
                    </span>
                    {" En formato digital lista para impresión y certificado profesional acreditando fuentes de cálculo."}
                </>
            ],
            reverse: true
        },
        {
            title: "CAPACITACIONES",
            description: "El primer paso para crear alimentos seguros es la formación íntegra y de calidad de tus manipuladores de alimentos, es por esto que contamos con los siguientes programas de capacitación:",
            image: "/bannerServicios1.jpg",
            steps: [
            <>
                    <span style={{ fontWeight: 'bold' }}>
                        Programa BPM:
                    </span>
                    {" Se capacita a tu personal sobre las BPM de tus procesos productivos que abarca los siguientes items:"}
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Aspecto del personal
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Seguridad del agua
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Manejo de productos químicos
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Limpieza y sanitización
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Manejo integrado de plagas
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Mantención de equipos
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Control de temperaturas
                    </span>
                <br />
                    <span style={{ fontWeight: 'bold' }}>
                        ◦ Otros: Contaminación cruzada, Manejo de residuos
                    </span>
                </>,
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        Programa Trazabilidad:
                    </span>
                    {" Se capacita a todo el personal sobre la importancia de la trazabilidad en la producción y los registros asociados, que abarcan desde la recepción de MP, hasta la elaboración del producto final."}
                </>,
                <>
                    <span style={{ fontWeight: 'bold' }}>
                        Obtención Resolución Sanitaria.
                    </span>
                </>
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