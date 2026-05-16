const BASE_URL = 'https://asegalbyfasesorias.cl';

export default async function sitemap() {
  const staticPages = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/nosotras`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/servicios`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/recursos`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/contacto`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/cotiza`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/misionyvision`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  try {
    const res = await fetch(`${BASE_URL}/api/public/blog`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const posts = await res.json();
      const blogPages = posts.map((post) => ({
        url: `${BASE_URL}/blog`,
        lastModified: new Date(post.updatedAt || post.createdAt),
        changeFrequency: 'weekly',
        priority: 0.6,
      }));
      return [...staticPages, ...blogPages];
    }
  } catch {
    // Si falla la API, devuelve solo las páginas estáticas
  }

  return staticPages;
}
