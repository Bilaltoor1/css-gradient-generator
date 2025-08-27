export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gradientgenerator-tau.vercel.app/'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
