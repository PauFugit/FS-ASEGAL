const BASE_URL = 'https://asegalbyfasesorias.cl';

export default function sitemap() {
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

  return staticPages;
}
