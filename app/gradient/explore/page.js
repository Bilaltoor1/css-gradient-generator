import { Suspense } from "react";
import { GRADIENT_CATEGORIES } from '@/data/categories';
import { getAllGradients, getGradientsByCategory } from '@/lib/mdx';
import HeroSection from './components/HeroSection';
import CategoryFilter from './components/CategoryFilter';
import ClientGradientSection from './components/ClientGradientSection';

export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params.category || 'all';
  
  return {
    title: category === 'all' ? 'Explore Gradients - Color Palette Generator' : `${category} Gradients - Color Palette Generator`,
    description: `Discover beautiful ${category === 'all' ? '' : category + ' '}CSS gradients for your design projects. Copy CSS code and create stunning backgrounds.`,
  };
}

// Server-side data fetching from MDX files with pagination
async function getGradients(searchParams) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const limit = parseInt(params.limit || '24'); // Increased for better pagination
  const sort = params.sort || 'newest';
  const category = params.category || 'all';
  
  const skip = (page - 1) * limit;
  
  try {
    // Get gradients from MDX files
    let items = category === 'all' ? 
      getAllGradients() : 
      getGradientsByCategory(category);
    
    // Sort items
    if (sort === 'oldest') {
      items = items.reverse();
    }
    
    const total = items.length;
    const paginatedItems = items.slice(skip, skip + limit);
    const hasMore = skip + paginatedItems.length < total;
    const totalPages = Math.ceil(total / limit);
    
    // Transform data to match expected format
    const transformedItems = paginatedItems.map(item => ({
      _id: item.slug,
      id: item.frontMatter.id,
      title: item.frontMatter.title,
      description: item.frontMatter.description,
      category: item.frontMatter.category,
      tags: item.frontMatter.tags || [],
      colors: item.frontMatter.colors || [],
      cssGradient: item.frontMatter.cssGradient,
      featured: item.frontMatter.featured || false,
      createdAt: item.frontMatter.createdAt,
      previewImage: item.frontMatter.previewImage,
      categories: [item.frontMatter.category] // For compatibility
    }));
    
    return {
      gradients: transformedItems,
      total,
      page,
      limit,
      hasMore,
      totalPages,
      sort,
      category
    };
  } catch (error) {
    console.error('Error fetching gradients:', error);
    return {
      gradients: [],
      total: 0,
      page: 1,
      limit: 24,
      hasMore: false,
      totalPages: 0,
      sort: 'newest',
      category: 'all'
    };
  }
}

// Pagination component
function Pagination({ currentPage, totalPages, category, sort }) {
  if (totalPages <= 1) return null;

  const getPageUrl = (page) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.set('category', category);
    if (sort && sort !== 'newest') params.set('sort', sort);
    if (page > 1) params.set('page', page.toString());
    
    const query = params.toString();
    return `/gradient/explore${query ? '?' + query : ''}`;
  };

  const pages = [];
  const showPages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);
  
  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 && (
        <a
          href={getPageUrl(currentPage - 1)}
          className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
        >
          Previous
        </a>
      )}
      
      {startPage > 1 && (
        <>
          <a
            href={getPageUrl(1)}
            className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
          >
            1
          </a>
          {startPage > 2 && <span className="px-2 text-muted-foreground">...</span>}
        </>
      )}
      
      {pages.map(page => (
        <a
          key={page}
          href={getPageUrl(page)}
          className={`px-3 py-2 text-sm border rounded-md transition-colors ${
            page === currentPage
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border hover:bg-muted'
          }`}
        >
          {page}
        </a>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 text-muted-foreground">...</span>}
          <a
            href={getPageUrl(totalPages)}
            className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
          >
            {totalPages}
          </a>
        </>
      )}
      
      {currentPage < totalPages && (
        <a
          href={getPageUrl(currentPage + 1)}
          className="px-3 py-2 text-sm border border-border rounded-md hover:bg-muted transition-colors"
        >
          Next
        </a>
      )}
    </div>
  );
}

export default async function ExploreGradientsPage({ searchParams }) {
  const data = await getGradients(searchParams);
  const { gradients, hasMore, total, page, totalPages, sort, category } = data;
  const params = await searchParams;
  const selectedCategory = params.category || 'all';
  const currentSort = params.sort || 'newest';

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          categories={GRADIENT_CATEGORIES}
          currentSort={currentSort}
        />

        {gradients.length === 0 ? (
          <div className="py-12 text-center">
            <h3 className="text-lg font-semibold text-foreground">No gradients found for this category</h3>
            <p className="text-sm text-muted-foreground mt-2">Try selecting a different category or clear the filter.</p>
          </div>
        ) : (
          <ClientGradientSection
            gradients={gradients}
            total={total}
            selectedCategory={selectedCategory}
            hasMore={hasMore}
            page={page}
            totalPages={totalPages}
            categories={GRADIENT_CATEGORIES}
            currentSort={currentSort}
          />
        )}
      </div>

      {/* Comprehensive Gradient Guide */}
      <div className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* What is a CSS Gradient */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">What is a CSS Gradient?</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-muted-foreground leading-relaxed mb-6">
                CSS gradients are like digital paint brushes that create smooth color transitions on your website. Instead of using plain, flat colors, gradients let you blend multiple colors together to create beautiful, eye-catching effects. Think of them as the digital version of mixing paints on a canvas - you start with one color and gradually blend it into another.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Modern websites use gradients everywhere - from subtle background transitions to bold, colorful hero sections. Companies like Spotify, Instagram, and Stripe have made gradients a key part of their visual identity because they add depth, movement, and visual interest to otherwise flat designs.
              </p>
            </div>
          </section>

          {/* Types of CSS Gradients */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Types of CSS Gradients</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Linear Gradients - The Most Popular Choice</h3>
                <p className="text-muted-foreground mb-4">
                  Linear gradients create straight-line color transitions and are the most commonly used type. They flow in a straight line across your element, like sunlight moving across a room. You can control the direction (horizontal, vertical, or diagonal) and add multiple color stops for complex effects.
                </p>
                <div className="bg-card p-4 rounded-lg border mb-4">
                  <h4 className="font-semibold mb-2">CSS Linear Gradient Example:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">
                    background: linear-gradient(90deg, #ff6b6b 0%, #4ecdc4 100%);
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    This creates a smooth transition from coral to teal, flowing from left to right
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Linear gradients are perfect for buttons, backgrounds, and creating directional flow in your designs. They&#39;re widely supported across all modern browsers and form the foundation of most gradient designs.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Radial Gradients - Circular Color Transitions</h3>
                <p className="text-muted-foreground mb-4">
                  Radial gradients start from a central point and spread outward in a circular pattern, like ripples on water or light from a lamp. They&#39;re excellent for creating focal points, lighting effects, and adding dimension to your designs.
                </p>
                <div className="bg-card p-4 rounded-lg border mb-4">
                  <h4 className="font-semibold mb-2">CSS Radial Gradient Example:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">
                    background: radial-gradient(circle, #667eea 0%, #764ba2 100%);
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    This creates a circular blend from blue to purple, emanating from the center
                  </p>
                </div>
                <p className="text-muted-foreground">
                  While less common than linear gradients, radial gradients can create stunning visual effects when used strategically in hero sections, cards, and interactive elements.
                </p>
              </div>
            </div>
          </section>

          {/* CSS Gradient Properties */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">CSS Gradient Properties & Controls</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Color Stops - Building Complex Gradients</h3>
                <p className="text-muted-foreground mb-4">
                  Color stops are the individual colors in your gradient, and you can have as many as you want. Each stop has a position that determines where that color appears in the transition. This lets you create complex, multi-color gradients with precise control.
                </p>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Multiple Color Stops:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">
                    background: linear-gradient(90deg,<br />
                    &nbsp;&nbsp;#ff6b6b 0%,<br />
                    &nbsp;&nbsp;#4ecdc4 33%,<br />
                    &nbsp;&nbsp;#45b7d1 66%,<br />
                    &nbsp;&nbsp;#667eea 100%);
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Direction & Angle Control</h3>
                <p className="text-muted-foreground mb-4">
                  Control where your gradient flows by setting the direction or angle. Use simple keywords like &quot;to right&quot; or &quot;to bottom right&quot;, or specify exact angles in degrees for precise control over the gradient&#39;s flow.
                </p>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Direction Examples:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">
                    {/* Horizontal */}<br />
                    background: linear-gradient(to right, #ff6b6b, #4ecdc4);<br />
                    {/* Diagonal */}<br />
                    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                  </code>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Position & Size Control</h3>
                <p className="text-muted-foreground mb-4">
                  For radial gradients, you can control the starting position and size. This lets you create effects like light sources, shadows, and custom-shaped color transitions that fit your design needs.
                </p>
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-semibold mb-2">Position Control:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">
                    {/* Center light effect */}<br />
                    background: radial-gradient(circle at center,<br />
                    &nbsp;&nbsp;#ff6b6b 0%, #4ecdc4 100%);
                  </code>
                </div>
              </div>
            </div>
          </section>

          {/* Tailwind CSS Gradients */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Tailwind CSS Gradients - Modern Development Made Easy</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">What Makes Tailwind CSS Gradients Special?</h3>
                <p className="text-muted-foreground mb-4">
                  Tailwind CSS gradients are pre-built utility classes that make creating beautiful gradients as simple as adding a class to your HTML. Instead of writing complex CSS code, you can use simple, memorable class names that work consistently across your entire project.
                </p>
                <p className="text-muted-foreground mb-4">
                  This approach saves development time and ensures consistency across your website. Tailwind&#39;s gradient utilities are carefully designed to work with the framework&#39;s color palette and spacing system, making them perfect for rapid prototyping and production development.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Pro Developer Tip:</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Tailwind CSS gradients automatically optimize for performance and follow modern CSS best practices, so you get professional-quality results without writing custom CSS.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Tailwind CSS Gradient Classes</h3>
                <div className="space-y-4">
                  <div className="bg-card p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2">Basic Linear Gradients:</h4>
                    <code className="text-sm bg-muted p-2 rounded block">
                      bg-gradient-to-r from-blue-500 to-purple-600
                    </code>
                    <p className="text-sm text-muted-foreground mt-1">Horizontal gradient from blue to purple</p>
                  </div>

                  <div className="bg-card p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2">Multi-Stop Gradients:</h4>
                    <code className="text-sm bg-muted p-2 rounded block">
                      bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
                    </code>
                    <p className="text-sm text-muted-foreground mt-1">Three-color gradient with via for middle color</p>
                  </div>

                  <div className="bg-card p-4 rounded-lg border">
                    <h4 className="font-semibold mb-2">Radial Gradients:</h4>
                    <code className="text-sm bg-muted p-2 rounded block">
                      bg-gradient-radial from-blue-500 to-transparent
                    </code>
                    <p className="text-sm text-muted-foreground mt-1">Circular gradient from center outward</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tailwind CSS Gradient Directions */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Tailwind CSS Gradient Directions</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg mx-auto mb-3"></div>
                <h3 className="font-semibold mb-2">bg-gradient-to-r</h3>
                <p className="text-sm text-muted-foreground">Left to right horizontal</p>
                <code className="text-xs bg-muted p-1 rounded mt-2 block">from-blue-500 to-purple-500</code>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-l from-green-500 to-blue-500 rounded-lg mx-auto mb-3"></div>
                <h3 className="font-semibold mb-2">bg-gradient-to-l</h3>
                <p className="text-sm text-muted-foreground">Right to left horizontal</p>
                <code className="text-xs bg-muted p-1 rounded mt-2 block">from-green-500 to-blue-500</code>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-t from-pink-500 to-orange-500 rounded-lg mx-auto mb-3"></div>
                <h3 className="font-semibold mb-2">bg-gradient-to-t</h3>
                <p className="text-sm text-muted-foreground">Bottom to top vertical</p>
                <code className="text-xs bg-muted p-1 rounded mt-2 block">from-pink-500 to-orange-500</code>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-b from-purple-500 to-pink-500 rounded-lg mx-auto mb-3"></div>
                <h3 className="font-semibold mb-2">bg-gradient-to-b</h3>
                <p className="text-sm text-muted-foreground">Top to bottom vertical</p>
                <code className="text-xs bg-muted p-1 rounded mt-2 block">from-purple-500 to-pink-500</code>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-tr from-red-500 to-yellow-500 rounded-lg mx-auto mb-3"></div>
                <h3 className="font-semibold mb-2">bg-gradient-to-tr</h3>
                <p className="text-sm text-muted-foreground">Bottom-left to top-right</p>
                <code className="text-xs bg-muted p-1 rounded mt-2 block">from-red-500 to-yellow-500</code>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg mx-auto mb-3"></div>
                <h3 className="font-semibold mb-2">bg-gradient-to-br</h3>
                <p className="text-sm text-muted-foreground">Top-left to bottom-right</p>
                <code className="text-xs bg-muted p-1 rounded mt-2 block">from-indigo-500 to-purple-500</code>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-tl from-teal-500 to-blue-500 rounded-lg mx-auto mb-3"></div>
                <h3 className="font-semibold mb-2">bg-gradient-to-tl</h3>
                <p className="text-sm text-muted-foreground">Bottom-right to top-left</p>
                <code className="text-xs bg-muted p-1 rounded mt-2 block">from-teal-500 to-blue-500</code>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-bl from-orange-500 to-red-500 rounded-lg mx-auto mb-3"></div>
                <h3 className="font-semibold mb-2">bg-gradient-to-bl</h3>
                <p className="text-sm text-muted-foreground">Top-right to bottom-left</p>
                <code className="text-xs bg-muted p-1 rounded mt-2 block">from-orange-500 to-red-500</code>
              </div>
            </div>
          </section>

          {/* Advanced Gradient Techniques */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Advanced Gradient Techniques</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Multi-Stop Gradients with Tailwind CSS</h3>
                <p className="text-muted-foreground mb-4">
                  Create complex gradients with multiple colors using Tailwind&#39;s via modifier. This lets you create sophisticated color transitions that flow through three or more colors, adding depth and visual interest to your designs.
                </p>
                <div className="bg-card p-4 rounded-lg border mb-4">
                  <h4 className="font-semibold mb-2">Three-Color Gradient:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">
                    bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Blue → Purple → Pink with smooth transitions between each color
                  </p>
                </div>
                <p className="text-muted-foreground">
                  The via modifier creates a color stop in the middle of the gradient, allowing for more complex and visually appealing color transitions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Gradient Opacity & Transparency</h3>
                <p className="text-muted-foreground mb-4">
                  Combine gradients with opacity to create sophisticated visual effects. This technique is perfect for overlays, shadows, and creating depth in your user interface designs.
                </p>
                <div className="bg-card p-4 rounded-lg border mb-4">
                  <h4 className="font-semibold mb-2">Gradient with Transparency:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">
                    bg-gradient-to-t from-black/50 to-transparent
                  </code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Creates a fade effect from semi-transparent black to fully transparent
                  </p>
                </div>
                <p className="text-muted-foreground">
                  Using opacity modifiers (/50, /30, /10) with Tailwind gradients gives you fine control over transparency, perfect for creating modern overlay effects.
                </p>
              </div>
            </div>
          </section>

          {/* Why Choose Our Gradient Tools */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Our Gradient Tools?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Trusted by Professionals</h3>
                <p className="text-muted-foreground">
                  Our gradient tools are used by thousands of designers and developers worldwide. We follow industry best practices and provide reliable, production-ready code that you can trust for your projects.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert-Developed</h3>
                <p className="text-muted-foreground">
                  Created by experienced developers who understand modern web technologies. Our tools incorporate years of real-world experience and stay updated with the latest CSS and Tailwind CSS features.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Proven Track Record</h3>
                <p className="text-muted-foreground">
                  With thousands of gradients generated and countless successful projects, our tools have a proven track record of helping developers and designers create beautiful, high-quality work efficiently.
                </p>
              </div>
            </div>
          </section>

          {/* Common Gradient Use Cases */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Common Gradient Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Web Design Applications</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Hero Sections:</strong> Create eye-catching landing page backgrounds that immediately grab visitor attention</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Buttons & CTAs:</strong> Make call-to-action buttons more engaging and clickable with subtle gradient effects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Cards & Components:</strong> Add depth and visual interest to content cards and UI components</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Backgrounds:</strong> Create subtle texture and movement in page backgrounds without using large image files</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Modern Development Benefits</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Performance:</strong> Gradients load instantly and don&#39;t require additional HTTP requests like images</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Scalability:</strong> Look crisp on any screen size or pixel density, from mobile phones to large displays</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Flexibility:</strong> Easy to modify colors, directions, and effects without editing image files</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span><strong>Accessibility:</strong> Can be designed to meet WCAG contrast requirements for better accessibility</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Getting Started Tips */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Getting Started with Gradients</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  1
                </div>
                <h3 className="text-lg font-semibold mb-2">Choose Your Colors</h3>
                <p className="text-muted-foreground">
                  Start with 2-3 colors that work well together. Consider your brand colors or use complementary colors from a color wheel for best results.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  2
                </div>
                <h3 className="text-lg font-semibold mb-2">Pick a Direction</h3>
                <p className="text-muted-foreground">
                  Decide how you want your colors to flow. Horizontal gradients work well for backgrounds, while diagonal gradients add more dynamic movement.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  3
                </div>
                <h3 className="text-lg font-semibold mb-2">Test & Refine</h3>
                <p className="text-muted-foreground">
                  Preview your gradient in different contexts. Adjust colors, add more stops, or change the direction until it looks perfect for your design.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Enable ISR with 60 second revalidation
export const revalidate = 60;