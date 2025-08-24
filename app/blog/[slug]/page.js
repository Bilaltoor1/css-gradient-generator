import { notFound } from 'next/navigation';
import { getBlogBySlug, getAllBlogs, generateSEOData, generateBlogSchema } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

// Generate static params for all blog posts
export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${blog.frontMatter.title} - Design Blog`,
    description: blog.frontMatter.excerpt || blog.frontMatter.description,
    keywords: blog.frontMatter.keywords,
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const schema = generateBlogSchema(blog);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-2 text-sm mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {blog.frontMatter.category}
              </span>
              <span>•</span>
              <span>{blog.readingTime.text}</span>
              <span>•</span>
              <span>{new Date(blog.frontMatter.date).toLocaleDateString()}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {blog.frontMatter.title}
              </h1>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {blog.frontMatter.excerpt || blog.frontMatter.description}
              </p>
              
              <div className="flex items-center justify-center gap-2 mt-6 text-sm">
                <span>By {blog.frontMatter.author || 'Design Team'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-16">
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <MDXRemote source={blog.content} />
          </div>
          
          {/* Tags */}
          {blog.frontMatter.tags && blog.frontMatter.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {blog.frontMatter.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link 
              href="/blog"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all posts
            </Link>
          </div>
        </article>
      </div>
    );
}
