'use client'

import React from 'react';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const menuLinks = [
    { href: '/nosotras', label: '¿Quiénes Somos?' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/blog', label: 'Blog' },
    { href: '/recursos', label: 'Recursos' },
];

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [hoveredIndex, setHoveredIndex] = React.useState(null); // Para hover en Drawer
    const pathname = usePathname();
    const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

    return (
        <AppBar
            position="static"
            elevation={0}
            sx={{
                backgroundColor: 'white',
                color: 'black',
                py: 0,
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: 'space-between',
                    minHeight: { xs: 56, md: 72 },
                    height: { xs: 100, md: 100 },
                    flexDirection: 'row',
                    alignItems: 'center',
                    px: { xs: 1, md: 3 },
                    position: 'relative'
                }}
            >
                {/* Logo SIEMPRE a la izquierda */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        width: 300,
                        flexShrink: 0,
                        overflow: 'hidden'
                    }}
                >
                    <Link href="/" passHref>
                        <Box
                            sx={{
                                cursor: 'pointer',
                                width: 150,
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                src="/logo.jpg"
                                alt="Logo Asegal B&F"
                                width={150}
                                height={56}
                                priority
                                style={{
                                    objectFit: 'contain',
                                    height: '100%',
                                    width: '100%',
                                    maxHeight: '100px'
                                }}
                            />
                        </Box>
                    </Link>
                </Box>

                {/* Menú Desktop */}
                {!isMobile && (
                    <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', gap: 3 }}>
                        {menuLinks.map((link, idx) => {
                            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                            return (
                                <Link href={link.href} passHref key={link.href} legacyBehavior>
                                    <Button
                                        color="inherit"
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            border: isActive ? '2px solid #FFD600' : '2px solid transparent',
                                            borderRadius: '24px',
                                            backgroundColor: isActive ? 'white' : 'transparent',
                                            color: '#003366',
                                            px: 2.5,
                                            boxShadow: 'none',
                                            transition: 'border 0.2s, background 0.2s, color 0.2s',
                                            '&:hover': {
                                                border: '2px solid #FFD600',
                                                backgroundColor: 'white',
                                                color: '#003366',
                                                boxShadow: 'none',
                                                opacity: 1
                                            }
                                        }}
                                    >
                                        {link.label}
                                    </Button>
                                </Link>
                            );
                        })}
                    </Box>
                )}

                {/* Botón Desktop */}
                {!isMobile && (
                    <Box sx={{ ml: 2 }}>
                        <Link href="/contacto" passHref legacyBehavior>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: '#43B97F',
                                    color: 'white',
                                    borderRadius: '24px',
                                    textTransform: 'none',
                                    fontWeight: 500,
                                    px: 3,
                                    boxShadow: '0px 2px 4px 0px #0000001A',
                                    '&:hover': {
                                        backgroundColor: '#36a06b',
                                        boxShadow: '0px 2px 4px 0px #0000001A'
                                    }
                                }}
                            >
                                Contáctanos
                            </Button>
                        </Link>
                    </Box>
                )}

                {/* Menú Mobile */}
                {isMobile && (
                    <Box sx={{ position: 'absolute', right: 16, top: 12 }}>
                        <IconButton
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleDrawerToggle}
                            size="large"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            anchor="right"
                            open={drawerOpen}
                            onClose={handleDrawerToggle}
                            PaperProps={{
                                sx: { width: 240 }
                            }}
                        >
                            <List>
                                {menuLinks.map((link, idx) => {
                                    const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                                    const isHovered = hoveredIndex === idx;
                                    return (
                                        <ListItem key={link.href} disablePadding>
                                            <Link href={link.href} passHref legacyBehavior>
                                                <ListItemButton
                                                    onClick={handleDrawerToggle}
                                                    onMouseEnter={() => setHoveredIndex(idx)}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                    sx={{
                                                        border: (isActive || isHovered) ? '2px solid #FFD600' : '2px solid transparent',
                                                        borderRadius: '24px',
                                                        backgroundColor: (isActive || isHovered) ? 'white' : 'transparent',
                                                        mx: 1,
                                                        my: 0.5,
                                                        transition: 'border 0.2s, background 0.2s, color 0.2s',
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={link.label}
                                                        primaryTypographyProps={{
                                                            fontWeight: 500,
                                                            color: '#003366'
                                                        }}
                                                    />
                                                </ListItemButton>
                                            </Link>
                                        </ListItem>
                                    );
                                })}
                                <ListItem sx={{ justifyContent: 'center', mt: 1 }}>
                                    <Link href="/contacto" passHref legacyBehavior>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                backgroundColor: '#43B97F',
                                                color: 'white',
                                                borderRadius: '24px',
                                                textTransform: 'none',
                                                fontWeight: 500,
                                                px: 3,
                                                boxShadow: '0px 2px 4px 0px #0000001A',
                                                '&:hover': {
                                                    backgroundColor: '#36a06b',
                                                    boxShadow: '0px 2px 4px 0px #0000001A'
                                                }
                                            }}
                                            onClick={handleDrawerToggle}
                                        >
                                            Contáctanos
                                        </Button>
                                    </Link>
                                </ListItem>
                            </List>
                        </Drawer>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;