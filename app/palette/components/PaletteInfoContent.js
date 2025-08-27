import Link from 'next/link';
import { ArrowRight, Palette, Shuffle, Download, Book } from 'lucide-react';

export default function PaletteInfoContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-16">
      {/* What is a Color Palette */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">What is a Color Palette?</h2>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-muted-foreground leading-relaxed mb-6">
            A color palette is like a carefully chosen set of paint colors that work together harmoniously. Just as an artist doesn&#39;t use every color in their paint box at once, designers use palettes to create cohesive, professional-looking designs. Think of it as your brand&#39;s color personality - a group of colors that feel like they belong together and create the right mood for your project.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Modern color palettes aren&#39;t random - they&#39;re built using color theory principles that have been developed and refined by artists and designers over centuries. Companies like Google, Apple, and major brands invest heavily in perfecting their palettes because they know that the right colors can make or break user experience and brand recognition.
          </p>
        </div>
      </section>

      {/* Color Harmony Types */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Color Harmony - The Science of Beautiful Palettes</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Complementary Colors</h3>
            <p className="text-muted-foreground mb-4">
              Colors that sit opposite each other on the color wheel, like red and green, or blue and orange. These create maximum contrast and vibrancy, perfect for attention-grabbing designs and call-to-action buttons.
            </p>
            <div className="bg-gradient-to-r from-red-500 to-green-500 h-4 rounded-full mb-4"></div>
            <p className="text-sm text-muted-foreground">
              Best for: CTAs, alerts, high-contrast designs
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Monochromatic Colors</h3>
            <p className="text-muted-foreground mb-4">
              Different shades, tints, and tones of the same color. Like having various blues from sky blue to navy - they create a sophisticated, unified look that&#39;s easy on the eyes.
            </p>
            <div className="bg-gradient-to-r from-blue-200 via-blue-500 to-blue-800 h-4 rounded-full mb-4"></div>
            <p className="text-sm text-muted-foreground">
              Best for: Professional designs, calm interfaces, branding
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Analogous Colors</h3>
            <p className="text-muted-foreground mb-4">
              Colors that sit next to each other on the color wheel, like yellow, orange, and red. These create a warm, harmonious feeling and are pleasing to look at for extended periods.
            </p>
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-4 rounded-full mb-4"></div>
            <p className="text-sm text-muted-foreground">
              Best for: Warm designs, food, hospitality, creative work
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Triadic Colors</h3>
            <p className="text-muted-foreground mb-4">
              Three colors evenly spaced around the color wheel, creating a vibrant yet balanced palette. Like red, yellow, and blue - the primary colors that form the foundation of all other colors.
            </p>
            <div className="flex gap-1 mb-4">
              <div className="w-1/3 h-4 bg-red-500 rounded-full"></div>
              <div className="w-1/3 h-4 bg-yellow-500 rounded-full"></div>
              <div className="w-1/3 h-4 bg-blue-500 rounded-full"></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Best for: Vibrant designs, children&#39;s products, creative work
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Tetradic Colors</h3>
            <p className="text-muted-foreground mb-4">
              Four colors arranged in two complementary pairs, creating a rich, complex palette with lots of possibilities. This is like having two sets of complementary colors working together.
            </p>
            <div className="flex gap-1 mb-4">
              <div className="w-1/4 h-4 bg-purple-500 rounded-full"></div>
              <div className="w-1/4 h-4 bg-orange-500 rounded-full"></div>
              <div className="w-1/4 h-4 bg-teal-500 rounded-full"></div>
              <div className="w-1/4 h-4 bg-pink-500 rounded-full"></div>
            </div>
            <p className="text-sm text-muted-foreground">
              Best for: Complex designs, rich illustrations, artistic work
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
              <Shuffle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Custom Palettes</h3>
            <p className="text-muted-foreground mb-4">
              Break free from traditional color theory and create unique palettes based on your specific needs, brand colors, or creative vision. Sometimes the best palettes are the ones that break the rules.
            </p>
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-4 rounded-full mb-4"></div>
            <p className="text-sm text-muted-foreground">
              Best for: Unique branding, artistic expression, custom projects
            </p>
          </div>
        </div>
      </section>

      {/* How Our Palette Generator Works */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">How Gradient Generator&#39;s Palette Studio Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
              1
            </div>
            <h3 className="text-lg font-semibold mb-2">Pick Your Base Color</h3>
            <p className="text-muted-foreground">
              Start with any color using our intuitive color wheel. Drag to select hue and saturation, then adjust brightness to get your perfect starting point.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
              2
            </div>
            <h3 className="text-lg font-semibold mb-2">Choose Harmony Type</h3>
            <p className="text-muted-foreground">
              Select from complementary, monochromatic, analogous, triadic, or tetradic schemes. Each creates scientifically-proven color relationships.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-primary">
              3
            </div>
            <h3 className="text-lg font-semibold mb-2">Fine-tune & Export</h3>
            <p className="text-muted-foreground">
              Adjust individual colors, change palette size, and export in multiple formats. Get CSS, HEX, RGB, and HSL values instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Professional Features */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Professional Palette Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Advanced Color Controls</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Hue, Saturation, Value:</strong> Full control over color properties using professional HSV color model</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Lightness Control:</strong> Fine-tune brightness levels to create perfect contrast ratios</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Palette Size:</strong> Create palettes from 2 to 8 colors based on your project needs</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Individual Editing:</strong> Adjust each color in your palette independently for maximum flexibility</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Export & Integration</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Multiple Formats:</strong> Export in HEX, RGB, RGBA, HSL, and HSLA for all your development needs</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>CSS Ready:</strong> Copy CSS classes and values directly for web development</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Design Software:</strong> Colors work seamlessly with Figma, Adobe XD, Sketch, and other design tools</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>High-Resolution Export:</strong> Download palette images for presentations and documentation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Choose Our Palette Tool */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Gradient Generator&#39;s Palette Studio?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Scientifically Accurate</h3>
            <p className="text-muted-foreground">
              Our color algorithms are based on proven color theory and industry standards used by professional designers worldwide. Every palette follows mathematical principles for perfect harmony.
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
              Built by experienced designers and developers who understand the nuances of color theory, accessibility, and modern web development. Our tools incorporate decades of collective experience.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Proven Results</h3>
            <p className="text-muted-foreground">
              Thousands of designers, developers, and creative professionals rely on our tools for their color palette needs. Our palettes have been used in websites, apps, and designs worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Color Theory Fundamentals */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Color Theory Fundamentals</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Understanding Color Properties</h3>
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-semibold mb-2 text-blue-600 dark:text-blue-400">Hue - The Color Type</h4>
                <p className="text-sm text-muted-foreground">
                  Hue is what we commonly think of as color - red, blue, green, etc. It&#39;s measured in degrees around the color wheel, with red at 0°, green at 120°, and blue at 240°.
                </p>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">Saturation - Color Intensity</h4>
                <p className="text-sm text-muted-foreground">
                  Saturation controls how vivid or muted a color appears. High saturation means bright, intense colors, while low saturation creates softer, more subdued tones.
                </p>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-semibold mb-2 text-purple-600 dark:text-purple-400">Value/Brightness - Light Level</h4>
                <p className="text-sm text-muted-foreground">
                  Value determines how light or dark a color is. This is separate from hue and saturation - you can have light blue or dark blue, both with the same hue but different values.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Color Temperature</h3>
            <div className="space-y-4">
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-semibold mb-2 text-orange-500">Warm Colors</h4>
                <p className="text-sm text-muted-foreground">
                  Reds, oranges, and yellows. These colors tend to advance toward the viewer and create feelings of energy, warmth, and excitement.
                </p>
                <div className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 h-3 rounded-full mt-2"></div>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-semibold mb-2 text-blue-500">Cool Colors</h4>
                <p className="text-sm text-muted-foreground">
                  Blues, greens, and purples. These colors tend to recede from the viewer and create feelings of calm, trust, and professionalism.
                </p>
                <div className="bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 h-3 rounded-full mt-2"></div>
              </div>

              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-semibold mb-2 text-gray-600">Neutral Colors</h4>
                <p className="text-sm text-muted-foreground">
                  Blacks, whites, grays, and beiges. These provide balance and contrast without overwhelming the design. They&#39;re essential for readability and hierarchy.
                </p>
                <div className="bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 h-3 rounded-full mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section>
        <h2 className="text-2xl font-bold text-foreground mb-6">Palette Applications in Modern Design</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Web & App Design</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Brand Identity:</strong> Create cohesive color schemes that reinforce your brand across all digital touchpoints</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>User Interface:</strong> Design intuitive interfaces with proper contrast ratios and accessible color combinations</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Data Visualization:</strong> Use color palettes that help users understand complex data through clear visual hierarchy</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Marketing Materials:</strong> Maintain brand consistency across websites, social media, and marketing collateral</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Creative & Professional Work</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Graphic Design:</strong> Build professional palettes for logos, posters, and print materials</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Photography:</strong> Create color grading presets and understand color relationships in post-processing</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Interior Design:</strong> Develop color schemes for spaces, furniture, and decor coordination</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span><strong>Product Design:</strong> Create harmonious color combinations for physical products and packaging</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-linear-to-tr from-[#FB585A]/100 to-[#F54DF0]/100 backdrop-blur rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-4">Create Your Perfect Palette Today</h2>
        <p className="text-lg text-card-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of designers and developers who trust Gradient Generator for their color palette needs. Create professional, harmonious color schemes in minutes.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/palette"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Start Creating <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link
            href="/gradient/explore"
            className="inline-flex items-center px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            Browse Gradients <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
