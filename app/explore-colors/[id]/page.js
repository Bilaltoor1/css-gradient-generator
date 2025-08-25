import { notFound, redirect } from 'next/navigation';
import { getAllColorShades } from '@/lib/mdx';
import { COLOR_CATEGORIES } from '@/data/color-categories';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Copy, Download } from 'lucide-react';
import Link from 'next/link';
import ColorActions from './components/ColorActions';
import ColorCopyButtons from './components/ColorCopyButtons';

export async function generateStaticParams() {
  const colors = getAllColorShades();
  return colors.map((color) => ({
    id: color.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const color = await getColor(resolvedParams.id);

  if (!color) {
    return {
      title: 'Color Not Found',
    };
  }

  return {
    title: `${color.frontMatter.title} - Beautiful Color Shades`,
    description: color.frontMatter.description,
    keywords: color.frontMatter.tags?.join(', '),
  };
}

async function getColor(id) {
  // If the id matches a category id, redirect to the explore-colors list for that category
  const categoryMatch = COLOR_CATEGORIES.find(cat => cat.id === id);
  if (categoryMatch) {
    redirect(`/explore-colors?category=${id}`);
  }

  const colors = getAllColorShades();
  return colors.find(color => color.slug === id);
}

export default async function ColorDetailPage({ params }) {
  const resolvedParams = await params;
  const color = await getColor(resolvedParams.id);
  
  if (!color) {
    notFound();
  }

  const { frontMatter } = color;
  const category = COLOR_CATEGORIES.find(cat => cat.id === frontMatter.category);
  const mainColor = frontMatter.hex || frontMatter.baseHex;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-responsive full-screen color display */}
      <div className="relative h-screen w-full">
        <div 
          id={`color-preview-${resolvedParams.id}`}
          className="w-full h-full"
          style={{ backgroundColor: mainColor }}
        />
        
        {/* Export buttons overlay - responsive positioning */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6">
          <ColorActions 
            colorId={resolvedParams.id}
            colorName={frontMatter.title}
            hexColor={mainColor}
            shades={frontMatter.shades || []}
          />
        </div>

        {/* Back button overlay - responsive positioning */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <Link 
            href="/explore-colors" 
            className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-lg transition-colors text-sm md:text-base"
          >
            <ArrowLeft className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Back to</span> Colors
          </Link>
        </div>

        {/* Color info overlay - mobile responsive */}
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
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs md:text-sm">
                {mainColor}
              </Badge>
              {frontMatter.tags?.slice(0, 2).map(tag => (
                <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-white/30 text-xs md:text-sm">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Color information and shades section - mobile responsive */}
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
        {/* Main Color Copy Section */}
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <div 
              className="w-5 h-5 md:w-6 md:h-6 rounded border border-border"
              style={{ backgroundColor: mainColor }}
            />
            Main Color
          </h2>
          
          <div className="relative group">
            <div className="bg-muted border border-border rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-3 bg-muted-foreground/5 border-b">
                <span className="text-sm font-medium text-muted-foreground">HEX Code</span>
                <ColorCopyButtons hexColor={mainColor} />
              </div>
              <pre className="p-4 text-sm overflow-x-auto">
                <code className="text-foreground font-mono text-lg">{mainColor}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Color Shades Grid */}
        {frontMatter.shades && frontMatter.shades.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-semibold">Color Shades ({frontMatter.shades.length})</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
              {frontMatter.shades.map((shade, index) => (
                <div key={index} className="group">
                  <div className="relative p-3 md:p-4 border border-border rounded-lg bg-card hover:shadow-md transition-shadow">
                    <div 
                      className="w-full h-16 md:h-20 rounded-lg border border-border shadow-sm mb-2 md:mb-3 cursor-pointer"
                      style={{ backgroundColor: shade.hex }}
                      title={shade.name}
                    />
                    <div className="space-y-1">
                      <p className="font-mono text-xs md:text-sm font-medium truncate">{shade.hex}</p>
                      <p className="text-xs text-muted-foreground truncate">{shade.name}</p>
                    </div>
                    
                    {/* Copy button overlay */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ColorCopyButtons hexColor={shade.hex} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Details - mobile responsive grid */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">Technical Details</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="p-3 md:p-4 border border-border rounded-lg bg-card">
              <label className="text-xs md:text-sm font-medium text-muted-foreground">HEX Code</label>
              <p className="font-mono text-sm md:text-base font-medium mt-1">{mainColor}</p>
            </div>
            
            <div className="p-3 md:p-4 border border-border rounded-lg bg-card">
              <label className="text-xs md:text-sm font-medium text-muted-foreground">RGB</label>
              <p className="font-mono text-sm md:text-base font-medium mt-1">{hexToRgb(mainColor)}</p>
            </div>
            
            <div className="p-3 md:p-4 border border-border rounded-lg bg-card">
              <label className="text-xs md:text-sm font-medium text-muted-foreground">Shades</label>
              <p className="font-mono text-sm md:text-base font-medium mt-1">{frontMatter.shades?.length || 0}</p>
            </div>

            <div className="p-3 md:p-4 border border-border rounded-lg bg-card">
              <label className="text-xs md:text-sm font-medium text-muted-foreground">Category</label>
              <p className="font-mono text-sm md:text-base font-medium mt-1">{category?.name || 'Colors'}</p>
            </div>
          </div>
        </div>

        {/* Usage Examples - mobile responsive */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">Usage Examples</h2>
          
          <div className="p-4 md:p-6 border border-border rounded-lg bg-muted/50">
            <p className="text-muted-foreground mb-4 text-sm md:text-base">Perfect for:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <ul className="list-disc list-inside space-y-1 md:space-y-2 text-sm text-muted-foreground">
                <li>Website color schemes</li>
                <li>UI component styling</li>
                <li>Brand identity design</li>
                <li>Mobile app interfaces</li>
              </ul>
              <ul className="list-disc list-inside space-y-1 md:space-y-2 text-sm text-muted-foreground">
                <li>Marketing materials</li>
                <li>Social media graphics</li>
                <li>Print design projects</li>
                <li>{category?.name.toLowerCase() || 'color'} themed designs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CSS Examples */}
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-semibold">CSS Examples</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-3">
              <h3 className="text-base font-medium">Background Color</h3>
              <div className="bg-muted border border-border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-muted-foreground/5 border-b">
                  <span className="text-sm font-medium text-muted-foreground">CSS</span>
                  <ColorCopyButtons cssCode={`background-color: ${mainColor};`} />
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-foreground">{`background-color: ${mainColor};`}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-medium">Text Color</h3>
              <div className="bg-muted border border-border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-muted-foreground/5 border-b">
                  <span className="text-sm font-medium text-muted-foreground">CSS</span>
                  <ColorCopyButtons cssCode={`color: ${mainColor};`} />
                </div>
                <pre className="p-4 text-sm overflow-x-auto">
                  <code className="text-foreground">{`color: ${mainColor};`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : 
    'Invalid color';
}
