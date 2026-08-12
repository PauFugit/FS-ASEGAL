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

export default async function ServicioDetailPage({ params }) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  const gallery = [service.imageUrl, ...(service.images || [])].filter(Boolean);

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
          height: { xs: 220, sm: 320, md: 420 },
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
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Link href="/servicios" style={{ textDecoration: 'none' }}>
          <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3, color: '#18148C', textTransform: 'none' }}>
            Volver a servicios
          </Button>
        </Link>

        <Typography
          variant="h3"
          component="h1"
          sx={{
            color: '#18148C',
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: '1.8rem', md: '2.4rem' },
          }}
        >
          {service.name}
        </Typography>

        {service.price && (
          <Typography
            variant="h6"
            sx={{ color: '#F2AC57', fontWeight: 700, mb: 3 }}
          >
            {service.price}
          </Typography>
        )}

        <Typography
          variant="body1"
          sx={{
            color: '#333',
            whiteSpace: 'pre-line',
            lineHeight: 1.8,
            mb: 4,
          }}
        >
          {service.longDescription || service.description}
        </Typography>

        {service.images && service.images.length > 0 && (
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
