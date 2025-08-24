import { notFound } from 'next/navigation';
import { getGradientById, getAllGradients, generateSEOData, generateGradientSchema } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

// Generate static params for all gradients
export async function generateStaticParams() {
  const gradients = getAllGradients();
  return gradients.map((gradient) => ({
    id: gradient.frontMatter.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const gradient = getGradientById(id);

  if (!gradient) {
    return {
      title: 'Gradient Not Found',
      description: 'The requested gradient could not be found.',
    };
  }

  return {
    title: `${gradient.frontMatter.title} - Gradient Generator`,
    description: gradient.frontMatter.description,
    keywords: gradient.frontMatter.keywords,
  };
}

export default async function GradientDetailPage({ params }) {
  const { id } = await params;
  const gradient = getGradientById(id);

  if (!gradient) {
    notFound();
  }

  const schema = generateGradientSchema(gradient);

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {/* Hero Section with Gradient Preview */}
      <section 
        className="relative py-20"
        style={{ background: gradient.frontMatter.cssGradient }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center text-white">
            <div className="flex items-center justify-center gap-2 text-sm mb-4">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                {gradient.frontMatter.category}
              </span>
              {gradient.frontMatter.featured && (
                <span className="bg-yellow-500/30 px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {gradient.frontMatter.title}
              </h1>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto">
                {gradient.frontMatter.description}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                <button 
                  onClick={() => navigator.clipboard.writeText(gradient.frontMatter.cssGradient)}
                  className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Copy CSS
                </button>
                <button 
                  onClick={() => navigator.clipboard.writeText(gradient.frontMatter.colors.join(', '))}
                  className="bg-white/20 hover:bg-white/30 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Copy Colors
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Color Information */}
        <section className="max-w-4xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Colors */}
            <div className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Color Palette</h2>
              <div className="space-y-3">
                {gradient.frontMatter.colors?.map((color, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-lg border border-border"
                      style={{ backgroundColor: color }}
                    />
                    <div>
                      <div className="font-mono text-sm">{color}</div>
                      <div className="text-xs text-muted-foreground">
                        Color {index + 1}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CSS Code */}
            <div className="bg-card rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">CSS Code</h2>
              <div className="bg-muted rounded p-4">
                <code className="text-sm break-all">
                  background: {gradient.frontMatter.cssGradient};
                </code>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(`background: ${gradient.frontMatter.cssGradient};`)}
                className="mt-3 text-primary hover:text-primary/80 text-sm font-medium"
              >
                Copy to clipboard
              </button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <MDXRemote source={gradient.content} />
          </div>
          
          {/* Tags */}
          {gradient.frontMatter.tags && gradient.frontMatter.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {gradient.frontMatter.tags.map((tag) => (
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
              href="/gradient/explore"
              className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to all gradients
            </Link>
          </div>
        </section>
      </div>
    );
}
