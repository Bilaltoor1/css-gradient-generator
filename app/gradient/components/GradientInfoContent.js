import Link from 'next/link';
import { ArrowRight, Palette, Code, Download, Book } from 'lucide-react';

export default function GradientInfoContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      {/* Main introduction */}
      <section className="prose prose-lg max-w-none dark:prose-invert">
        <h2 className="text-3xl font-bold mb-6">Tailwind CSS Gradient Generator - Create Stunning Gradients with CSS & Tailwind Code</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Our advanced Tailwind CSS gradient generator creates stunning gradients and provides both CSS code and Tailwind utility classes instantly. 
          Perfect for developers using modern frameworks like Next.js, React, and Vue.js - generate both formats simultaneously for maximum flexibility. 
          Whether you&#39;re building modern web interfaces, designing backgrounds, or creating visual elements, 
          our tool provides everything you need to generate beautiful linear and radial gradients with professional-quality output.
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Why Choose Our Tailwind CSS Gradient Generator?</h3>
            <p>
              Gradients have evolved from being overused design elements to sophisticated tools for creating 
              depth, visual interest, and modern aesthetics. Our generator specializes in Tailwind CSS gradient generation, 
              providing optimized utility classes that work seamlessly with your existing Tailwind setup. 
              Today&#39;s web design heavily relies on gradients to create engaging user interfaces, from subtle background 
              transitions to bold statement pieces like those seen in brands like Spotify, Instagram, and Stripe.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Built for Designers & Developers</h3>
            <p>
              Our tool bridges the gap between design and development by providing instant CSS code and Tailwind utility classes. 
              Generate both formats simultaneously - copy CSS for vanilla projects or Tailwind classes for modern React, Next.js, and Vue applications. 
              Whether you&#39;re prototyping in Figma or implementing in production, our generator streamlines your workflow with dual code generation.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-center">Powerful Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
              <Palette className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold mb-2">Color Shades</h3>
            <p className="text-sm text-muted-foreground">
              Explore curated color palettes and shades. From soft pastels to vibrant hues, 
              find the perfect colors for your gradient foundations.
            </p>
            <Link href="/explore-colors" className="inline-flex items-center text-sm text-primary hover:text-primary/80 mt-3">
              Browse Colors <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
              <Code className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold mb-2">Tailwind CSS Swatches</h3>
            <p className="text-sm text-muted-foreground">
              Access our curated collection of popular gradients optimized for Tailwind CSS. 
              Each swatch comes with both CSS code and Tailwind utility classes ready for immediate 
              implementation in your Next.js, React, or Vue.js projects.
            </p>
            <Link href="/gradient/explore" className="inline-flex items-center text-sm text-primary hover:text-primary/80 mt-3">
              View Gallery <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold mb-2">Export Options</h3>
            <p className="text-sm text-muted-foreground">
              Download your gradients as high-resolution PNG images or PDF files. 
              Perfect for presentations, mockups, and design systems.
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur rounded-xl p-6 border border-border">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
              <Book className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-semibold mb-2">Learning Resources</h3>
            <p className="text-sm text-muted-foreground">
              Explore our comprehensive guides on gradient implementation, 
              color theory, and modern web design techniques.
            </p>
            {/* <Link href="/blog" className="inline-flex items-center text-sm text-primary hover:text-primary/80 mt-3">
              Read Blog <ArrowRight className="w-4 h-4 ml-1" />
            </Link> */}
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section>
        <h2 className="text-3xl font-bold mb-8">How to Use the Gradient Generator</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-blue-600 dark:text-blue-400">
              1
            </div>
            <h3 className="font-semibold mb-2">Choose Your Colors</h3>
            <p className="text-muted-foreground">
              Select your gradient colors using our intuitive color picker or choose from our preset library. 
              Add up to multiple color stops for complex gradients.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-green-600 dark:text-green-400">
              2
            </div>
            <h3 className="font-semibold mb-2">Customize Settings</h3>
            <p className="text-muted-foreground">
              Adjust gradient type (linear or radial), angle, color positions, and opacity. 
              See real-time preview as you make changes to perfect your design.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-purple-600 dark:text-purple-400">
              3
            </div>
            <h3 className="font-semibold mb-2">Copy Code & Export</h3>
            <p className="text-muted-foreground">
              Get your CSS gradients, Tailwind utility classes, or download high-resolution images. 
              Everything is optimized for modern web development - use CSS for vanilla projects or 
              Tailwind classes for React, Next.js, and Vue.js applications.
            </p>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Linear Gradients</h2>
          <p className="text-muted-foreground mb-4">
            Linear gradients create smooth transitions along a straight line. They&#39;re perfect for 
            backgrounds, buttons, and creating directional flow in your designs. Our generator 
            supports custom angles, multiple color stops, and opacity controls.
          </p>
          
          <div className="bg-muted rounded-lg p-4 mb-4">
            <h4 className="font-semibold mb-2">Example CSS:</h4>
            <code className="text-sm">
              background: linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%);
            </code>
          </div>
          
          <p className="text-muted-foreground">
            Linear gradients are widely used in modern web design. Companies like Spotify 
            leverage linear gradients for brand consistency and visual appeal across their interfaces.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Radial Gradients</h2>
          <p className="text-muted-foreground mb-4">
            Radial gradients emanate from a center point, creating circular or elliptical 
            color transitions. They&#39;re excellent for creating focal points, lighting effects, 
            and adding dimensional depth to your designs.
          </p>
          
          <div className="bg-muted rounded-lg p-4 mb-4">
            <h4 className="font-semibold mb-2">Example CSS:</h4>
            <code className="text-sm">
              background: radial-gradient(circle, #5c0067 0%, #00d4ff 100%);
            </code>
          </div>
          
          <p className="text-muted-foreground">
            While less common than linear gradients, radial gradients can create stunning 
            visual effects when used strategically in hero sections, cards, and interactive elements.
          </p>
        </div>
      </section>

      {/* What is a Gradient */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Understanding CSS Gradients</h2>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg leading-relaxed">
            CSS gradients are powerful image data types that display smooth transitions between two or more colors. 
            Unlike static images, gradients are rendered by the browser, making them scalable, lightweight, 
            and perfect for responsive design.
          </p>
          
          <p>
            Modern gradients have become essential in contemporary web design, moving far beyond the 
            simple two-color transitions of the past. Today&#39;s gradients can incorporate multiple colors, 
            varying opacity levels, and complex positioning to create sophisticated visual effects.
          </p>
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Why Gradients Matter in Modern Design</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Create visual hierarchy and guide user attention</li>
            <li>Add depth and dimension to flat design elements</li>
            <li>Establish brand identity and emotional connection</li>
            <li>Improve readability when used as overlays</li>
            <li>Reduce bandwidth compared to large background images</li>
          </ul>
          
          <p className="mt-6">
            Whether you&#39;re creating subtle background transitions or bold statement pieces, 
            gradients offer endless possibilities for creative expression while maintaining 
            optimal performance and accessibility.
          </p>
        </div>
      </section>

      {/* Advanced Gradient Features */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Advanced Tailwind CSS Gradient Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Multi-Stop Gradient Generation</h3>
            <p className="text-muted-foreground mb-4">
              Create complex gradients with up to 6 color stops using our advanced Tailwind CSS gradient generator. 
              Our tool automatically optimizes gradient generation for Tailwind&#39;s 6-stop maximum, ensuring full compatibility 
              with Tailwind CSS frameworks and utility classes.
            </p>
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold mb-2">Tailwind Example:</h4>
              <code className="text-sm">
                bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
              </code>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Dual Code Generation</h3>
            <p className="text-muted-foreground mb-4">
              Generate both CSS gradients and Tailwind utility classes simultaneously. Perfect for developers 
              working with modern frameworks like Next.js, React, and Vue.js who need both vanilla CSS and 
              Tailwind implementations.
            </p>
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold mb-2">CSS Output:</h4>
              <code className="text-sm">
                background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center rounded-2xl bg-linear-to-tr from-[#FB1A58]/100 to-[#F5B314]/100 backdrop-blur brounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-4">Ready to Create Stunning Tailwind CSS Gradients?</h2>
        <p className="text-lg text-card-foreground mb-6 max-w-2xl mx-auto">
          Join thousands of designers and developers who use our Tailwind CSS gradient generator to create 
          beautiful, professional-quality gradients for their Next.js, React, and Vue.js projects.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="/gradient/explore" 
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Browse Gallery <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
          <Link 
            href="/color-converter" 
            className="inline-flex items-center px-6 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
          >
            Color Tools <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
