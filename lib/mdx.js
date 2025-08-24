import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content');
const blogsDirectory = path.join(contentDirectory, 'blogs');
const gradientsDirectory = path.join(contentDirectory, 'gradients');
const colorShadesDirectory = path.join(contentDirectory, 'color-shades');

// Generic function to get all files from a directory
export function getAllFiles(directory) {
  try {
    const fileNames = fs.readdirSync(directory);
    return fileNames.filter(fileName => fileName.endsWith('.mdx'));
  } catch (error) {
    return [];
  }
}

// Generic function to get file data
export function getFileData(directory, slug) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(directory, `${realSlug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug: realSlug,
    frontMatter: data,
    content,
    readingTime: readingTime(content),
  };
}

// Blog functions
export function getAllBlogs() {
  const fileNames = getAllFiles(blogsDirectory);
  
  const allBlogs = fileNames
    .map((fileName) => {
      return getFileData(blogsDirectory, fileName);
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.frontMatter.date < b.frontMatter.date) {
        return 1;
      } else {
        return -1;
      }
    });

  return allBlogs;
}

export function getBlogBySlug(slug) {
  return getFileData(blogsDirectory, slug);
}

// Gradient functions
export function getAllGradients() {
  const fileNames = getAllFiles(gradientsDirectory);
  
  const allGradients = fileNames
    .map((fileName) => {
      return getFileData(gradientsDirectory, fileName);
    })
    .filter(Boolean)
    .sort((a, b) => {
      if (a.frontMatter.featured && !b.frontMatter.featured) return -1;
      if (!a.frontMatter.featured && b.frontMatter.featured) return 1;
      return new Date(b.frontMatter.createdAt) - new Date(a.frontMatter.createdAt);
    });

  return allGradients;
}

export function getGradientById(id) {
  return getFileData(gradientsDirectory, id);
}

export function getGradientsByCategory(category) {
  const allGradients = getAllGradients();
  return allGradients.filter(gradient => 
    gradient.frontMatter.category?.toLowerCase() === category.toLowerCase()
  );
}

// Color shade functions
export function getAllColorShades() {
  const fileNames = getAllFiles(colorShadesDirectory);
  
  const allShades = fileNames
    .map((fileName) => {
      return getFileData(colorShadesDirectory, fileName);
    })
    .filter(Boolean)
    .sort((a, b) => {
      return new Date(b.frontMatter.createdAt) - new Date(a.frontMatter.createdAt);
    });

  return allShades;
}

export function getColorShadeByHex(hex) {
  return getFileData(colorShadesDirectory, hex);
}

// SEO and meta functions
export function generateSEOData(frontMatter, type = 'article') {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
  
  return {
    title: frontMatter.title,
    description: frontMatter.description || frontMatter.excerpt,
    canonical: `${baseUrl}/${frontMatter.slug || frontMatter.id}`,
    openGraph: {
      type,
      title: frontMatter.title,
      description: frontMatter.description || frontMatter.excerpt,
      url: `${baseUrl}/${frontMatter.slug || frontMatter.id}`,
      images: frontMatter.image ? [
        {
          url: frontMatter.image,
          width: 1200,
          height: 630,
          alt: frontMatter.title,
        }
      ] : [],
      siteName: 'Gradient Generator',
    },
    twitter: {
      card: 'summary_large_image',
      title: frontMatter.title,
      description: frontMatter.description || frontMatter.excerpt,
      images: frontMatter.image ? [frontMatter.image] : [],
    },
    additionalMetaTags: [
      {
        name: 'keywords',
        content: frontMatter.keywords || frontMatter.tags?.join(', ') || '',
      },
      {
        name: 'author',
        content: frontMatter.author || 'Gradient Generator Team',
      },
    ],
  };
}

// Schema.org structured data
export function generateBlogSchema(blog) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.frontMatter.title,
    description: blog.frontMatter.description || blog.frontMatter.excerpt,
    image: blog.frontMatter.image || `${baseUrl}/og-image.jpg`,
    author: {
      '@type': 'Person',
      name: blog.frontMatter.author || 'Gradient Generator Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gradient Generator',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: blog.frontMatter.date,
    dateModified: blog.frontMatter.updatedAt || blog.frontMatter.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${blog.slug}`,
    },
  };
}

export function generateGradientSchema(gradient) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: gradient.frontMatter.title,
    description: gradient.frontMatter.description,
    image: gradient.frontMatter.previewImage || `${baseUrl}/gradient-preview.jpg`,
    creator: {
      '@type': 'Organization',
      name: 'Gradient Generator',
    },
    keywords: gradient.frontMatter.tags?.join(', ') || '',
    category: gradient.frontMatter.category,
    url: `${baseUrl}/gradient/explore/${gradient.slug}`,
  };
}
