import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import DownloadIcon from '@mui/icons-material/Download';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BannerNewsletter from '@/components/BannerNewsletter';
import BannerCierreTres from '@/components/BannerCierreTres';

const BASE_URL = 'https://asegalbyfasesorias.cl';

export const revalidate = 3600;

async function getPost(slug) {
  return prisma.blog.findFirst({ where: { slug, status: 'publicado' } });
}

export async function generateStaticParams() {
  const posts = await prisma.blog.findMany({
    where: { status: 'publicado', slug: { not: null } },
    select: { slug: true },
  });
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: 'Artículo no encontrado' };
  }

  const url = `${BASE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: `${post.title} | Asegal B&F`,
      description: post.summary,
      url,
      type: 'article',
      images: post.imageUrl ? [{ url: post.imageUrl }] : undefined,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
    alternates: { canonical: url },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    image: post.imageUrl,
    author: { '@type': 'Organization', name: post.author || 'Asegal B&F' },
    publisher: { '@type': 'Organization', name: 'Asegal B&F' },
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
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
        }}
      >
        {}
        <img
          src={post.imageUrl}
          alt={post.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <Link href="/blog" style={{ textDecoration: 'none' }}>
          <Button startIcon={<ArrowBackIcon />} sx={{ mb: 3, color: '#18148C', textTransform: 'none' }}>
            Volver al blog
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
          {post.title}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4 }}>
          {post.author && `Por ${post.author} · `}
          {new Date(post.createdAt).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Typography>

        {post.pdfUrl && (
          <Box sx={{ mb: 4 }}>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              href={post.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: '#18148C',
                '&:hover': { backgroundColor: '#0f0c5e' },
              }}
            >
              Descargar PDF
            </Button>
          </Box>
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
          {post.bodyText || post.summary}
        </Typography>

        {post.pdfUrl && (
          <Box sx={{ width: '100%', height: '70vh', minHeight: 400, mb: 4 }}>
            <iframe
              src={post.pdfUrl}
              title={post.title}
              width="100%"
              height="100%"
              style={{ border: 'none', borderRadius: 8 }}
            />
          </Box>
        )}

        {post.references && (
          <Box sx={{ p: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
              Referencias:
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {post.references}
            </Typography>
          </Box>
        )}
      </Container>

      <BannerNewsletter />
      <BannerCierreTres />
    </Box>
  );
}
