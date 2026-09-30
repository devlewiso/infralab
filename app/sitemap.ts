export const dynamic = 'force-static'; // requerido por output: 'export'

export default function sitemap() {
  const baseUrl = 'https://infra.neuralcodelab.com';
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];
}
