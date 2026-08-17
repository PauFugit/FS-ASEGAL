import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CtaServicio from '@/components/CtaServicio';
import BotonComprarServicio from '@/components/BotonComprarServicio';
import ContactoBanner from '@/components/ContactoBanner';

const BASE_URL = 'https://asegalbyfasesorias.cl';

export const revalidate = 3600;

async function getService(slug) {
  return prisma.services.findFirst({ where: { slug, status: 'publicado' } });
}

export async function generateStaticParams() {
  const services = await prisma.services.findMany({
    where: { status: 'publicado', slug: { not: null } },
    select: { slug: true },
  });
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return { title: 'Servicio no encontrado' };
  }

  const url = `${BASE_URL}/servicios/${service.slug}`;

  return {
    title: service.name,
    description: service.description,
    openGraph: {
      title: `${service.name} | Asegal B&F`,
      description: service.description,
      url,
      type: 'website',
      images: service.imageUrl ? [{ url: service.imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: service.name,
      description: service.description,
      images: service.imageUrl ? [service.imageUrl] : undefined,
    },
    alternates: { canonical: url },
  };
}

// Convierte el longDescription (líneas "Título: detalle") en pasos numerados
function parseSteps(longDescription) {
  if (!longDescription) return [];
  return longDescription
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const match = line.match(/^([^:]{3,60}):\s*(.+)$/);
      if (match) {
        return { title: match[1].trim(), detail: match[2].trim() };
      }
      return { title: null, detail: line };
    });
}

export default async function ServicioDetailPage({ params }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  const gallery = [service.imageUrl, ...(service.images || [])].filter(Boolean);
  const steps = parseSteps(service.longDescription);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    image: service.imageUrl,
    provider: { '@type': 'Organization', name: 'Asegal B&F' },
    areaServed: 'CL',
    url: `${BASE_URL}/servicios/${service.slug}`,
    ...(service.priceAmount
      ? {
          offers: {
            '@type': 'Offer',
            priceCurrency: 'CLP',
            price: service.priceAmount,
            availability: 'https://schema.org/InStock',
          },
        }
      : {}),
  };

  return (
    <Box component="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: 240, sm: 340, md: 460 },
          overflow: 'hidden',
          bgcolor: '#f2f2f2',
        }}
      >
        {}
        <img
          src={service.imageUrl}
          alt={service.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(24,20,140,0.05) 0%, rgba(24,20,140,0.55) 100%)',
          }}
        />
        <Container maxWidth="md" sx={{ position: 'absolute', left: '50%', bottom: 0, transform: 'translateX(-50%)', pb: { xs: 3, md: 5 } }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: '#fff',
              fontWeight: 700,
              fontSize: { xs: '1.6rem', sm: '2.1rem', md: '2.6rem' },
              textShadow: '0 2px 12px rgba(0,0,0,0.35)',
            }}
          >
            {service.name}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Link href="/servicios" style={{ textDecoration: 'none' }}>
          <Button
            startIcon={<ArrowBackIcon sx={{ fontSize: '1.6rem !important' }} />}
            sx={{
              mb: 3,
              color: '#18148C',
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1rem',
              borderRadius: '30px',
              px: 2.5,
              py: 1,
              border: '2px solid #18148C',
              bgcolor: 'rgba(24,20,140,0.05)',
              transition: 'all 0.25s ease',
              '&:hover': {
                bgcolor: '#18148C',
                color: '#fff',
                transform: 'translateX(-4px)',
                boxShadow: '0px 4px 14px rgba(24,20,140,0.35)',
              },
            }}
          >
            Volver a servicios
          </Button>
        </Link>

        {service.price && (
          <Typography
            variant="h6"
            sx={{
              color: '#F2AC57',
              fontWeight: 700,
              mb: 3,
              display: 'inline-block',
              px: 2,
              py: 0.5,
              borderRadius: '20px',
              bgcolor: 'rgba(242,172,87,0.12)',
            }}
          >
            {service.price}
          </Typography>
        )}

        <Box
          sx={{
            position: 'relative',
            mb: { xs: 4, md: 5 },
            p: { xs: 2.5, md: 3 },
            borderLeft: '5px solid #F2AC57',
            border: '1px solid rgba(242,172,87,0.35)',
            borderLeftWidth: '5px',
            borderRadius: '14px',
            bgcolor: 'rgba(242,172,87,0.06)',
            backdropFilter: 'blur(2px)',
            overflow: 'hidden',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              bgcolor: 'rgba(242,172,87,0.12)',
            },
            '@keyframes sparkleFloat': {
              '0%, 100%': { opacity: 0.35, transform: 'scale(0.85) rotate(0deg)' },
              '50%': { opacity: 1, transform: 'scale(1.15) rotate(15deg)' },
            },
            '@keyframes shineSweep': {
              '0%': { transform: 'translateX(-120%) skewX(-20deg)' },
              '60%, 100%': { transform: 'translateX(220%) skewX(-20deg)' },
            },
          }}
        >
          {}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              width: '40%',
              background: 'linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent)',
              animation: 'shineSweep 5s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />
          {[
            { top: '10%', left: '92%', size: 14, delay: '0s' },
            { top: '75%', left: '4%', size: 10, delay: '1.2s' },
            { top: '20%', left: '6%', size: 8, delay: '2.1s' },
          ].map((s, i) => (
            <Box
              key={i}
              aria-hidden
              sx={{
                position: 'absolute',
                top: s.top,
                left: s.left,
                width: s.size,
                height: s.size,
                color: '#F2AC57',
                animation: `sparkleFloat 2.6s ease-in-out ${s.delay} infinite`,
                pointerEvents: 'none',
                zIndex: 1,
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="100%" height="100%">
                <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" />
              </svg>
            </Box>
          ))}
          <Typography
            variant="body1"
            sx={{
              position: 'relative',
              zIndex: 1,
              color: '#333',
              lineHeight: 1.9,
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontStyle: 'italic',
            }}
          >
            {service.description}
          </Typography>
        </Box>

        {steps.length > 0 && (
          <Box sx={{ mb: { xs: 4, md: 5 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{ width: 6, height: 32, bgcolor: '#F2AC57', borderRadius: 1 }} />
              <Typography
                variant="h5"
                sx={{ color: '#18148C', fontWeight: 700, fontSize: { xs: '1.15rem', md: '1.4rem' } }}
              >
                ¿Cómo trabajamos?
              </Typography>
            </Box>

            <Box sx={{ position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  left: 19,
                  top: 12,
                  bottom: 12,
                  width: '2px',
                  bgcolor: 'rgba(24,20,140,0.15)',
                  display: { xs: 'none', sm: 'block' },
                }}
              />
              {steps.map((step, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2.5,
                    mb: idx === steps.length - 1 ? 0 : 3,
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      flexShrink: 0,
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      bgcolor: '#18148C',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1rem',
                      zIndex: 1,
                    }}
                  >
                    {idx + 1}
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      bgcolor: '#F7F7FB',
                      borderRadius: '14px',
                      p: { xs: 2, md: 2.5 },
                      border: '1px solid rgba(24,20,140,0.08)',
                    }}
                  >
                    {step.title && (
                      <Typography sx={{ color: '#18148C', fontWeight: 700, mb: 0.5, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
                        {step.title}
                      </Typography>
                    )}
                    <Typography sx={{ color: '#444', lineHeight: 1.7, fontSize: { xs: '0.9rem', md: '0.98rem' } }}>
                      {step.detail}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {gallery.length > 1 && (
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {gallery.slice(1).map((img, idx) => (
              <Grid item xs={6} sm={4} key={idx}>
                {}
                <img
                  src={img}
                  alt={`${service.name} ${idx + 2}`}
                  style={{
                    width: '100%',
                    height: 160,
                    objectFit: 'cover',
                    borderRadius: 12,
                    display: 'block',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, flexWrap: 'wrap' }}>
          <CtaServicio serviceName={service.name} />
          {service.priceAmount && (
            <Box sx={{ mt: 4 }}>
              <BotonComprarServicio
                serviceId={service.id}
                serviceName={service.name}
                serviceDescription={service.description}
                priceAmount={service.priceAmount}
              />
            </Box>
          )}
        </Box>
      </Container>

      <ContactoBanner />
    </Box>
  );
}
