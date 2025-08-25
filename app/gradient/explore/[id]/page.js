import { notFound } from 'next/navigation';
import { getAllGradients } from '@/lib/mdx';
import { buildGradientCss, buildTailwindClass } from '@/lib/gradients';
import { GRADIENT_CATEGORIES } from '@/data/categories';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Copy, Download } from 'lucide-react';
import { RiCss3Fill, RiTailwindCssFill } from 'react-icons/ri';
import Link from 'next/link';
import GradientActions from './components/GradientActions';
import CopyButtons from './components/CopyButtons';

export async function generateStaticParams() {
  const gradients = getAllGradients();
  return gradients.map((gradient) => ({
    id: gradient.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const gradient = await getGradient(resolvedParams.id);

  if (!gradient) {
    return {
      title: 'Gradient Not Found',
    };
  }

  return {
    title: `${gradient.frontMatter.title} - Beautiful CSS Gradient`,
    description: gradient.frontMatter.description,
    keywords: gradient.frontMatter.keywords,
  };
}

async function getGradient(id) {
  const gradients = getAllGradients();
  return gradients.find(gradient => gradient.slug === id);
}

export default async function GradientDetailPage({ params }) {
  const resolvedParams = await params;
  const gradient = await getGradient(resolvedParams.id);
  
  if (!gradient) {
    notFound();
  }

  const { frontMatter } = gradient;
  const cssGradient = frontMatter.cssGradient || buildGradientCss(frontMatter);
  const category = GRADIENT_CATEGORIES.find(cat => cat.id === frontMatter.category);
  
  // Extract angle from CSS gradient for Tailwind class generation
  const angleMatch = cssGradient.match(/(\d+)deg/);
  const angle = angleMatch ? parseInt(angleMatch[1]) : 135;
  const gradientType = cssGradient.includes('radial') ? 'radial' : 
                      cssGradient.includes('conic') ? 'conic' : 'linear';
  
  const tailwindClass = buildTailwindClass(cssGradient, gradientType, angle);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-responsive full-screen gradient */}
      <div className="relative h-screen w-full">
        <div 
          id={`gradient-preview-${resolvedParams.id}`}
          className="w-full h-full"
          style={{ background: cssGradient }}
        />
        
        {/* Export buttons overlay - responsive positioning */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <GradientActions 
            gradientId={resolvedParams.id}
            gradientName={frontMatter.title}
            cssGradient={cssGradient}
            tailwindClass={tailwindClass}
          />
        </div>

        {/* Back button overlay - responsive positioning */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <Link 
            href="/gradient/explore" 
            className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-lg transition-colors text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Back to</span> Gradients
          </Link>
        </div>

        {/* Gradient info overlay - mobile responsive */}
        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 text-white">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{frontMatter.title}</h1>
              {frontMatter.featured && (
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30 w-fit">Featured</Badge>
              )}
            </div>
            
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-3 md:mb-4">{frontMatter.description}</p>
            
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              {category && (
                <Badge 
                  variant="outline" 
                  className="bg-white/20 text-white border-white/30 text-xs md:text-sm"
                >
                  {category.name}
                </Badge>
              )}
              {frontMatter.tags?.slice(0, 3).map(tag => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30 text-xs md:text-sm">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS and Tailwind copy section - mobile responsive */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Copy CSS and Tailwind - side by side layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* CSS Copy */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                <RiCss3Fill className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                CSS Code
              </h2>
            </div>
            
            <div className="relative group">
              <div className="bg-muted border border-border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-muted-foreground/5 border-b">
                  <span className="text-sm font-medium text-muted-foreground">CSS</span>
                  <CopyButtons cssGradient={cssGradient} type="css" />
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-foreground">{`background: ${cssGradient};`}</code>
                </pre>
              </div>
            </div>
          </div>

          {/* Tailwind Copy */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                <RiTailwindCssFill className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" />
                Tailwind CSS
              </h2>
            </div>
            
            <div className="relative group">
              <div className="bg-muted border border-border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-muted-foreground/5 border-b">
                  <span className="text-sm font-medium text-muted-foreground">Tailwind</span>
                  <CopyButtons tailwindClass={tailwindClass} type="tailwind" />
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-foreground break-all">{tailwindClass}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details - mobile responsive grid */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">Technical Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="p-3 md:p-4 border border-border rounded-lg bg-card">
              <label className="text-xs md:text-sm font-medium text-muted-foreground">Type</label>
              <p className="font-mono text-sm md:text-base font-medium mt-1">{gradientType.charAt(0).toUpperCase() + gradientType.slice(1)}</p>
            </div>
            
            <div className="p-3 md:p-4 border border-border rounded-lg bg-card">
              <label className="text-xs md:text-sm font-medium text-muted-foreground">Angle</label>
              <p className="font-mono text-sm md:text-base font-medium mt-1">{angle}°</p>
            </div>
            
            <div className="p-3 md:p-4 border border-border rounded-lg bg-card">
              <label className="text-xs md:text-sm font-medium text-muted-foreground">Colors</label>
              <p className="font-mono text-sm md:text-base font-medium mt-1">{frontMatter.colors?.length || 0} stops</p>
            </div>

            <div className="p-3 md:p-4 border border-border rounded-lg bg-card">
              <label className="text-xs md:text-sm font-medium text-muted-foreground">Category</label>
              <p className="font-mono text-sm md:text-base font-medium mt-1">{category?.name || 'Modern'}</p>
            </div>
          </div>
        </div>

        {/* Color Palette - responsive grid */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">Color Palette</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
            {frontMatter.colors?.map((color, index) => (
              <div key={index} className="p-3 md:p-4 border border-border rounded-lg bg-card">
                <div 
                  className="w-full h-12 md:h-16 rounded-lg border border-border shadow-sm mb-2 md:mb-3"
                  style={{ backgroundColor: color }}
                />
                <p className="font-mono text-xs md:text-sm font-medium truncate">{color}</p>
                <p className="text-xs text-muted-foreground">Stop {index + 1}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Examples - mobile responsive */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">Usage Examples</h2>
          
          <div className="p-4 md:p-6 border border-border rounded-lg bg-muted/50">
            <p className="text-muted-foreground mb-4 text-sm md:text-base">Perfect for:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <ul className="list-disc list-inside space-y-1 md:space-y-2 text-sm text-muted-foreground">
                <li>Modern website backgrounds</li>
                <li>Mobile app interfaces</li>
                <li>UI components and buttons</li>
                <li>Hero sections and banners</li>
              </ul>
              <ul className="list-disc list-inside space-y-1 md:space-y-2 text-sm text-muted-foreground">
                <li>Brand identity materials</li>
                <li>Social media graphics</li>
                <li>Card and container styling</li>
                <li>{category?.name.toLowerCase() || 'modern'} themed designs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
