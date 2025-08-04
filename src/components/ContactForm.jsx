'use client';
import { TextField, Button, Box, Typography, Alert, useTheme, CircularProgress } from '@mui/material';
import React, { useState } from 'react';

const ContactForm = ({ showImage = true }) => {
    const theme = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        telefono: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSuccess(false);
            return;
        }

        setSubmitting(true);
        setErrors({});

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                })
            });

            const data = await res.json();
            if (res.ok) {
                setSuccess(true);
                setFormData({ name: '', lastname: '', email: '', phone: '', message: '' });
                setTimeout(() => setSuccess(false), 3000);
            } else {
                setErrors({ form: data.error || 'Error al enviar el mensaje' });
            }
        } catch (err) {
            console.error(err);
            setErrors({ form: 'Error de red al intentar enviar' });
        } finally {
            setSubmitting(false);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
        if (!formData.email.trim()) {
            newErrors.email = 'El correo electrónico es requerido';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El correo electrónico no es válido';
        }
        if (!formData.telefono.trim()) {
            newErrors.telefono = 'El teléfono es incorrecto';
        } else if (!/^\d{10}$/.test(formData.telefono)) {
            newErrors.telefono = 'El teléfono debe tener 10 dígitos';
        }
        if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido';
        return newErrors;
    };

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: { xs: 0, md: 4 }
            }}
        >
            {/* Formulario */}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: '100%',
                    maxWidth: { xs: '98%', sm: 420, md: 480, lg: 540 },
                    mx: 'auto',
                    p: { xs: 2, sm: 3, md: 0 },
                    bgcolor: { xs: '#fff', md: 'transparent' },
                    borderRadius: { xs: 2, md: 0 },
                    boxShadow: { xs: 1, md: 'none' }
                }}
            >
                <Typography variant="h4" component="h3"
                    sx={{ mb: 3, textAlign: 'center', color: theme.palette.primary.dark }}>
                    Envíanos un mensaje
                </Typography>

                {success && <Alert severity="success" sx={{ mb: 2 }}>¡Mensaje enviado con éxito!</Alert>}
                {Object.keys(errors).length > 0 && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Por favor corrige los errores indicados.
                    </Alert>
                )}

                <TextField
                    label="Nombre"
                    fullWidth
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={{ mb: 2 }}
                    disabled={submitting}
                />
                <TextField
                    label="Apellido"
                    fullWidth
                    value={formData.lastname}
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    error={!!errors.lastname}
                    helperText={errors.lastname}
                    sx={{ mb: 2 }}
                    disabled={submitting}
                />

                <TextField
                    label="Correo Electrónico"
                    fullWidth
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={{ mb: 2 }}
                    disabled={submitting}
                />
                <TextField
                    label="Teléfono"
                    fullWidth
                    type="tel"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    error={!!errors.telefono}
                    helperText={errors.telefono}
                    sx={{ mb: 2 }}
                    disabled={submitting}
                />
                

                <TextField
                    label="Mensaje"
                    fullWidth
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    error={!!errors.message}
                    helperText={errors.message}
                    sx={{ mb: 3 }}
                    disabled={submitting}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={submitting}
                    startIcon={submitting && <CircularProgress size={20} />}
                >
                    {submitting ? 'Enviando...' : 'Enviar Mensaje'}
                </Button>
            </Box>

            {/* Imagen y/o información de contacto, solo visible en desktop */}
            {showImage && (
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' }, // Solo visible en lg (1200px+) y md (>=900px)
                        '@media (max-width:1199.95px)': { display: 'none' }, // Oculta en md y menores
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        minWidth: 320,
                        maxWidth: 440,
                        width: '100%',
                        mt: { md: 0 }
                    }}
                >
                    <Box
                        sx={{
                            width: 320,
                            height: 320,
                            border: '3px solid #43b36a',
                            borderRadius: 2,
                            overflow: 'hidden',
                            bgcolor: '#fff',
                            boxShadow: 2,
                            mb: 2
                        }}
                    >
                        <img
                            src="/contacto.jpeg"
                            alt="Ubicación"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                    </Box>
                    <Typography sx={{ color: '#003366', fontWeight: 500, mt: 1 }}>
                        contacto@asegalbyfasesorias.cl<br />
                        +56 9 9492 8092
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default ContactForm;