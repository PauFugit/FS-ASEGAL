'use client'
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, CircularProgress } from '@mui/material';
import Link from 'next/link';
import CtaServicio from './CtaServicio';

const ServiceCard = ({ name, description, imageUrl, slug, reverse = false }) => {
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
                        src={imageUrl}
                        alt={name}
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
                        <Link href={`/servicios/${slug}`} style={{ textDecoration: 'none' }}>
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
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                            >
                                {name}
                            </Typography>
                        </Link>
                        <Typography
                            align="justify"
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

                        <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                                variant="contained"
                                component={Link}
                                href={`/servicios/${slug}`}
                                sx={{
                                    backgroundColor: 'transparent',
                                    color: '#18148C',
                                    border: '2px solid #18148C',
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
                                    boxShadow: 'none',
                                    '&:hover': {
                                        backgroundColor: '#18148C',
                                        color: '#fff',
                                    },
                                }}
                            >
                                VER MÁS
                            </Button>
                            <CtaServicio serviceName={name} sx={{ mt: 0 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

const ServiciosSection = () => {
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/public/servicios')
            .then((res) => res.json())
            .then((data) => setServicios(Array.isArray(data) ? data : []))
            .catch(() => setServicios([]))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress sx={{ color: '#18148C' }} />
            </Box>
        );
    }

    if (servicios.length === 0) {
        return null;
    }

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
                    key={servicio.id}
                    name={servicio.name}
                    description={servicio.description}
                    imageUrl={servicio.imageUrl}
                    slug={servicio.slug}
                    reverse={index % 2 === 1}
                />
            ))}
        </Box>
    );
};

export default ServiciosSection;
