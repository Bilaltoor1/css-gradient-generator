import { getAllGradients } from '@/lib/mdx';
import { getAllColorShades } from '@/lib/mdx';

export default async function sitemap() {
  const baseUrl = 'https://gradientgenerator-tau.vercel.app';

  // Get all gradients and color shades
  const gradients = await getAllGradients();
  const colorShades = await getAllColorShades();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/palette`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gradient/explore`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/text-gradient`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/color-converter`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/explore-colors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Blog pages (currently coming soon)
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  // Dynamic gradient pages
  const gradientPages = gradients.map((gradient) => ({
    url: `${baseUrl}/gradient/explore/${gradient.slug}`,
    lastModified: new Date(gradient.frontMatter.createdAt || gradient.frontMatter.date || new Date()),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  // Dynamic color shade pages
  const colorShadePages = colorShades.map((shade) => ({
    url: `${baseUrl}/explore-colors/${shade.slug}`,
    lastModified: new Date(shade.frontMatter.createdAt || shade.frontMatter.date || new Date()),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  // Combine all pages
  return [
    ...staticPages,
    ...gradientPages,
    ...colorShadePages,
  ];
}
