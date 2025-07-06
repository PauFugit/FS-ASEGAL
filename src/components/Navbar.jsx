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
    { href: '/', label: 'Inicio' },
    { href: '/nosotras', label: '¿Quiénes Somos?' },
    { href: '/servicios', label: 'Servicios' },
    { href: '/blog', label: 'Blog' },
    { href: '/recursos', label: 'Recursos' },
];

const Navbar = () => {
    const [mounted, setMounted] = React.useState(false);
    const theme = useTheme();
    const pathname = usePathname();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [hoveredIndex, setHoveredIndex] = React.useState(null);
    
    // Usamos useMediaQuery con noSsr para evitar discrepancias
    const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

    if (!mounted) {
        return (
            <AppBar position="static" elevation={0} sx={{
                backgroundColor: 'white',
                color: 'black',
                py: 0,
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
            }}>
                <Toolbar sx={{ minHeight: '80px' }} />
            </AppBar>
        );
    }

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
                    minHeight: { xs: 56, md: 72, xl: 80 },
                    height: { xs: 100, md: 100, xl: 120 },
                    flexDirection: 'row',
                    alignItems: 'center',
                    px: { xs: 1, md: 3 },
                    position: 'relative'
                }}
            >
                {/* Logo */}
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
                    <Link href="/" passHref legacyBehavior>
                        <Box
                            component="a"
                            sx={{
                                cursor: 'pointer',
                                width: 300,
                                height: '100%',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Image
                                src="/logo.png"
                                alt="Logo Asegal B&F"
                                width={300}
                                height={150}
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
                        {menuLinks.map((link) => {
                            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                            return (
                                <Link href={link.href} passHref legacyBehavior key={link.href}>
                                    <Button
                                        component="a"
                                        color="inherit"
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 500,
                                            border: isActive ? '2px solid #F2AC57' : '2px solid transparent',
                                            borderRadius: '24px',
                                            backgroundColor: isActive ? 'white' : 'transparent',
                                            color: '#003366',
                                            px: 2.5,
                                            boxShadow: 'none',
                                            fontSize: { xs: 14, md:12, xl: 18 },
                                            transition: 'border 0.2s, background 0.2s, color 0.2s',
                                            '&:hover': {
                                                border: '2px solid #F2AC57',
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
                                component="a"
                                variant="contained"
                                sx={{
                                    backgroundColor: '#F2AC57',
                                    color: 'white',
                                    borderRadius: '24px',
                                    textTransform: 'none',
                                    fontSize: { xs: 14, md:12, xl: 18 },
                                    fontWeight: 500,
                                    px: 3,
                                    boxShadow: '0px 2px 4px 0px #0000001A',
                                    '&:hover': {
                                        backgroundColor: '#ffffff',
                                        color: '#F2AC57',
                                        border: '2px solid #F2AC57',
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
                                                    component="a"
                                                    onClick={handleDrawerToggle}
                                                    onMouseEnter={() => setHoveredIndex(idx)}
                                                    onMouseLeave={() => setHoveredIndex(null)}
                                                    sx={{
                                                        border: (isActive || isHovered) ? '2px solid #F2AC57' : '2px solid transparent',
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
                                            component="a"
                                            variant="contained"
                                            fullWidth
                                            sx={{
                                                backgroundColor: '#F2AC57',
                                                color: 'white',
                                                borderRadius: '24px',
                                                textTransform: 'none',
                                                fontWeight: 500,
                                                fontSize: { xs: 14, md:12, xl: 18 },
                                                px: 3,
                                                boxShadow: '0px 2px 4px 0px #0000001A',
                                                '&:hover': {
                                                    backgroundColor: '#ffffff',
                                                    color: '#F2AC57',
                                                    border: '2px solid #F2AC57',
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