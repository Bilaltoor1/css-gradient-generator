import Link from 'next/link';
import { getAllBlogs } from '@/lib/mdx';

export async function generateMetadata() {
  return {
    title: "Blog - Gradient Generator",
    description: "Learn about gradients, color theory, web design, and CSS with our comprehensive blog posts",
  };
}

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Design Blog
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Discover the latest in gradient design, color theory, and web development. 
            Learn tips, tricks, and best practices from design experts.
          </p>
        </div>
      </section>

        {/* Blog Posts Grid */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article key={blog.slug} className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {blog.frontMatter.image && (
                  <div className="aspect-video bg-gradient-to-br from-purple-400 to-blue-500">
                    <img 
                      src={blog.frontMatter.image} 
                      alt={blog.frontMatter.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <span>{blog.frontMatter.category}</span>
                    <span>•</span>
                    <span>{blog.readingTime.text}</span>
                    <span>•</span>
                    <span>{new Date(blog.frontMatter.date).toLocaleDateString()}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2">
                    {blog.frontMatter.title}
                  </h2>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {blog.frontMatter.excerpt || blog.frontMatter.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.frontMatter.tags?.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                  >
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
          
          {blogs.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-foreground mb-4">No blog posts yet</h3>
              <p className="text-muted-foreground">Check back soon for design insights and tutorials!</p>
            </div>
          )}
        </section>
      </div>
    );
}
