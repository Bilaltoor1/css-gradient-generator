import ColorConverter from './components/ColorConverter';

export const metadata = {
  title: 'Color Converter - HEX RGB HSL Color Format Converter',
  description: 'Convert colors between HEX, RGB, RGBA, HSL, and HSLA formats instantly. Free online color converter tool for designers and developers.',
  keywords: 'color converter, hex to rgb, rgb to hsl, color format converter, hex rgba hsl hsla converter',
};

export default function ColorConverterPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-linear-to-b from-[#6BD4EA]/100 to-[#0B71A2]/100 backdrop-blur border-b border-border">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-20 md:pb-24">
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Free Color Tool
                </div>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-white/90 drop-shadow sm:text-5xl md:text-6xl">
                <span className="block">Color Format</span>
                <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Converter
                </span>
              </h1>
              
              <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
                Convert colors between HEX, RGB, RGBA, HSL, and HSLA formats instantly. 
                Perfect for designers, developers, and anyone working with colors.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-white/70">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-red-400"></div>
                  HEX
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-green-400"></div>
                  RGB / RGBA
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-400"></div>
                  HSL / HSLA
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-purple-400"></div>
                  Live Preview
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Color Converter Tool */}
      <div className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ColorConverter />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
              Powerful Color Conversion Features
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need for color format conversion
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Multiple Formats
              </h3>
              <p className="mt-2 text-muted-foreground">
                Convert between HEX, RGB, RGBA, HSL, and HSLA formats seamlessly.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Real-time Conversion
              </h3>
              <p className="mt-2 text-muted-foreground">
                See instant conversions as you type with live color preview.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Copy to Clipboard
              </h3>
              <p className="mt-2 text-muted-foreground">
                One-click copy for all color formats to use in your projects.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Mobile Friendly
              </h3>
              <p className="mt-2 text-muted-foreground">
                Works perfectly on desktop, tablet, and mobile devices.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No Registration
              </h3>
              <p className="mt-2 text-muted-foreground">
                Free to use, no sign-up required. Start converting colors right away.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Accurate Results
              </h3>
              <p className="mt-2 text-muted-foreground">
                Precise color conversion algorithms for professional use.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">
              How to Use the Color Converter
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Simple steps to convert any color format
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-accent flex items-center justify-center text-2xl font-bold text-primary">
                1
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Enter Your Color
              </h3>
              <p className="mt-2 text-muted-foreground">
                Type or paste any color value in HEX, RGB, HSL format or use the color picker.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-accent flex items-center justify-center text-2xl font-bold text-primary">
                2
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                See All Formats
              </h3>
              <p className="mt-2 text-muted-foreground">
                Instantly view the color in all supported formats with live preview.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-accent flex items-center justify-center text-2xl font-bold text-primary">
                3
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Copy & Use
              </h3>
              <p className="mt-2 text-muted-foreground">
                Click to copy any format to your clipboard and use in your projects.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Comprehensive Color Guide */}
      <div className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Complete Guide to Color Formats & Conversion
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Understanding color formats is essential for designers and developers. Our comprehensive guide explains everything you need to know about digital colors and how to convert between different formats.
            </p>
          </div>

          {/* What are Colors in Digital Design */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">What are Colors in Digital Design?</h2>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-muted-foreground leading-relaxed mb-6">
                Colors in digital design are created by mixing light in different combinations. Unlike traditional paint mixing, digital colors work by combining red, green, and blue light (RGB) at varying intensities. Every color you see on your screen is made up of these three primary colors of light, each with values ranging from 0 (no light) to 255 (full brightness).
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Understanding how colors are represented digitally helps you work more effectively with design tools, web development, and graphic software. Different color formats exist because they serve different purposes - some are more human-readable, others are optimized for computers, and some include transparency information.
              </p>
            </div>
          </section>

          {/* HEX Color Format */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">HEX Color Format - The Web Standard</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">What is HEX Color?</h3>
                <p className="text-muted-foreground mb-4">
                  HEX (hexadecimal) colors are the most common way to represent colors on the web. They use a six-digit code preceded by a hash symbol (#). Each pair of digits represents the intensity of red, green, and blue light respectively.
                </p>
                <div className="bg-card p-4 rounded-lg border mb-4">
                  <h4 className="font-semibold mb-2">HEX Format Structure:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">#RRGGBB</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    #FF0000 = Pure Red, #00FF00 = Pure Green, #0000FF = Pure Blue
                  </p>
                </div>
                <p className="text-muted-foreground">
                  HEX colors are widely used because they&#39;re compact, easy to copy and paste, and universally supported across all web browsers and design software.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">HEX Color Examples</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-[#FF0000]"></div>
                    <span className="font-mono text-sm">#FF0000</span>
                    <span className="text-muted-foreground">Bright Red</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-[#00FF00]"></div>
                    <span className="font-mono text-sm">#00FF00</span>
                    <span className="text-muted-foreground">Bright Green</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-[#0000FF]"></div>
                    <span className="font-mono text-sm">#0000FF</span>
                    <span className="text-muted-foreground">Bright Blue</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-[#FFFF00]"></div>
                    <span className="font-mono text-sm">#FFFF00</span>
                    <span className="text-muted-foreground">Bright Yellow</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RGB Color Format */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">RGB Color Format - How Computers See Color</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">What is RGB Color?</h3>
                <p className="text-muted-foreground mb-4">
                  RGB stands for Red, Green, Blue - the three primary colors of light that computers use to create all the colors you see on screens. Each color channel has a value from 0 to 255, where 0 means no light and 255 means maximum brightness.
                </p>
                <div className="bg-card p-4 rounded-lg border mb-4">
                  <h4 className="font-semibold mb-2">RGB Format Structure:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">rgb(red, green, blue)</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    rgb(255, 0, 0) = Pure Red, rgb(0, 255, 0) = Pure Green, rgb(0, 0, 255) = Pure Blue
                  </p>
                </div>
                <p className="text-muted-foreground">
                  RGB is the native color model used by computer monitors, televisions, and digital cameras. It&#39;s based on how the human eye perceives light and how electronic displays work.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">RGB Color Examples</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'rgb(255, 0, 0)'}}></div>
                    <span className="font-mono text-sm">rgb(255, 0, 0)</span>
                    <span className="text-muted-foreground">Pure Red</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'rgb(0, 255, 0)'}}></div>
                    <span className="font-mono text-sm">rgb(0, 255, 0)</span>
                    <span className="text-muted-foreground">Pure Green</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'rgb(0, 0, 255)'}}></div>
                    <span className="font-mono text-sm">rgb(0, 0, 255)</span>
                    <span className="text-muted-foreground">Pure Blue</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'rgb(255, 255, 0)'}}></div>
                    <span className="font-mono text-sm">rgb(255, 255, 0)</span>
                    <span className="text-muted-foreground">Yellow</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RGBA Color Format */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">RGBA Color Format - Colors with Transparency</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">What is RGBA Color?</h3>
                <p className="text-muted-foreground mb-4">
                  RGBA extends the RGB color model by adding an Alpha channel for transparency. The alpha value ranges from 0.0 (completely transparent) to 1.0 (completely opaque). This is essential for creating layered designs and effects.
                </p>
                <div className="bg-card p-4 rounded-lg border mb-4">
                  <h4 className="font-semibold mb-2">RGBA Format Structure:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">rgba(red, green, blue, alpha)</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    rgba(255, 0, 0, 1.0) = Opaque Red, rgba(255, 0, 0, 0.5) = Semi-transparent Red
                  </p>
                </div>
                <p className="text-muted-foreground">
                  RGBA is crucial for modern web design, allowing you to create overlays, shadows, and layered visual effects that blend naturally with background content.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">RGBA Transparency Examples</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-striped">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'rgba(255, 0, 0, 1.0)'}}></div>
                    <span className="font-mono text-sm">rgba(255, 0, 0, 1.0)</span>
                    <span className="text-muted-foreground">Fully Opaque</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-striped">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'rgba(255, 0, 0, 0.7)'}}></div>
                    <span className="font-mono text-sm">rgba(255, 0, 0, 0.7)</span>
                    <span className="text-muted-foreground">70% Opaque</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-striped">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'rgba(255, 0, 0, 0.3)'}}></div>
                    <span className="font-mono text-sm">rgba(255, 0, 0, 0.3)</span>
                    <span className="text-muted-foreground">30% Opaque</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-striped">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'rgba(255, 0, 0, 0.1)'}}></div>
                    <span className="font-mono text-sm">rgba(255, 0, 0, 0.1)</span>
                    <span className="text-muted-foreground">10% Opaque</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HSL Color Format */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">HSL Color Format - Human-Friendly Color Representation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">What is HSL Color?</h3>
                <p className="text-muted-foreground mb-4">
                  HSL stands for Hue, Saturation, Lightness - a color model that&#39;s more intuitive for humans. Hue represents the type of color (like red, blue, or yellow), Saturation controls color intensity, and Lightness controls brightness.
                </p>
                <div className="bg-card p-4 rounded-lg border mb-4">
                  <h4 className="font-semibold mb-2">HSL Format Structure:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">hsl(hue, saturation%, lightness%)</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Hue: 0-360°, Saturation: 0-100%, Lightness: 0-100%
                  </p>
                </div>
                <p className="text-muted-foreground">
                  HSL is popular among designers because it&#39;s easier to understand and modify colors systematically. You can create color variations by adjusting individual components.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">HSL Color Examples</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'hsl(0, 100%, 50%)'}}></div>
                    <span className="font-mono text-sm">hsl(0, 100%, 50%)</span>
                    <span className="text-muted-foreground">Pure Red</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'hsl(120, 100%, 50%)'}}></div>
                    <span className="font-mono text-sm">hsl(120, 100%, 50%)</span>
                    <span className="text-muted-foreground">Pure Green</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'hsl(240, 100%, 50%)'}}></div>
                    <span className="font-mono text-sm">hsl(240, 100%, 50%)</span>
                    <span className="text-muted-foreground">Pure Blue</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'hsl(60, 100%, 50%)'}}></div>
                    <span className="font-mono text-sm">hsl(60, 100%, 50%)</span>
                    <span className="text-muted-foreground">Pure Yellow</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* HSLA Color Format */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">HSLA Color Format - HSL with Transparency</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">What is HSLA Color?</h3>
                <p className="text-muted-foreground mb-4">
                  HSLA extends HSL by adding an alpha channel for transparency, just like RGBA does for RGB. This gives you the human-friendly HSL color model with the ability to control transparency.
                </p>
                <div className="bg-card p-4 rounded-lg border mb-4">
                  <h4 className="font-semibold mb-2">HSLA Format Structure:</h4>
                  <code className="text-sm bg-muted p-2 rounded block">hsla(hue, saturation%, lightness%, alpha)</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    hsla(0, 100%, 50%, 1.0) = Opaque Red, hsla(0, 100%, 50%, 0.5) = Semi-transparent Red
                  </p>
                </div>
                <p className="text-muted-foreground">
                  HSLA combines the best of both worlds - the intuitive HSL color model with transparency control, making it perfect for modern web design and UI development.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">HSLA Transparency Examples</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-striped">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'hsla(0, 100%, 50%, 1.0)'}}></div>
                    <span className="font-mono text-sm">hsla(0, 100%, 50%, 1.0)</span>
                    <span className="text-muted-foreground">Fully Opaque</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-striped">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'hsla(0, 100%, 50%, 0.7)'}}></div>
                    <span className="font-mono text-sm">hsla(0, 100%, 50%, 0.7)</span>
                    <span className="text-muted-foreground">70% Opaque</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-striped">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'hsla(0, 100%, 50%, 0.3)'}}></div>
                    <span className="font-mono text-sm">hsla(0, 100%, 50%, 0.3)</span>
                    <span className="text-muted-foreground">30% Opaque</span>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-striped">
                    <div className="w-8 h-8 rounded" style={{backgroundColor: 'hsla(0, 100%, 50%, 0.1)'}}></div>
                    <span className="font-mono text-sm">hsla(0, 100%, 50%, 0.1)</span>
                    <span className="text-muted-foreground">10% Opaque</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Color Conversion Tools */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Color Conversion Tools & Applications</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">HEX to RGB Converter</h3>
                <p className="text-muted-foreground mb-4">
                  Converting from HEX to RGB is one of the most common color format conversions. Our tool instantly transforms your six-digit HEX codes into RGB values that computers can understand. Simply enter any HEX color like #FF5733 and get the corresponding RGB values (255, 87, 51) instantly.
                </p>
                <p className="text-muted-foreground mb-4">
                  This conversion is essential when working with CSS, programming graphics, or any application that requires RGB color values. The process involves converting each pair of hexadecimal digits to decimal numbers.
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Remember that #FF0000 in HEX equals rgb(255, 0, 0) in RGB. The first two digits represent red, the middle two green, and the last two blue.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">RGB to HEX Converter</h3>
                <p className="text-muted-foreground mb-4">
                  Converting RGB values to HEX is perfect when you need web-compatible color codes. If you have RGB values like (255, 87, 51), our converter will transform them into the compact HEX format #FF5733. This is particularly useful when working with design software that outputs RGB values but you need HEX codes for web development.
                </p>
                <p className="text-muted-foreground mb-4">
                  The conversion process takes each RGB component (0-255) and converts it to a two-digit hexadecimal number, then combines them with a # symbol.
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    RGB to HEX conversion is the reverse of HEX to RGB. Each decimal value (0-255) becomes a two-character hex code (00-FF).
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">HEX to HSL Converter</h3>
                <p className="text-muted-foreground mb-4">
                  HEX to HSL conversion transforms web color codes into a more human-friendly format. This is especially valuable for designers who want to understand and modify colors more intuitively. A HEX color like #FF5733 becomes something like hsl(12, 100%, 58%) in HSL format.
                </p>
                <p className="text-muted-foreground mb-4">
                  This conversion is complex because it requires understanding color theory and mathematics, but our tool handles all the calculations instantly, giving you the hue (color type), saturation (color intensity), and lightness (brightness) values.
                </p>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300">
                    HSL is great for creating color variations. Once you have the HSL values, you can easily adjust saturation or lightness to create different shades.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">RGB to HSL Converter</h3>
                <p className="text-muted-foreground mb-4">
                  RGB to HSL conversion helps bridge the gap between computer-readable colors and human understanding. If you have RGB values from a design tool or image editor, converting them to HSL lets you work with colors more intuitively by adjusting hue, saturation, and lightness separately.
                </p>
                <p className="text-muted-foreground mb-4">
                  This conversion involves complex color space mathematics, but our tool makes it simple - just enter your RGB values and instantly get the corresponding HSL representation.
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-orange-700 dark:text-orange-300">
                    Use RGB to HSL conversion when you want to create color schemes or modify colors systematically based on their hue, saturation, and lightness properties.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">HSL to RGB Converter</h3>
                <p className="text-muted-foreground mb-4">
                  Converting from HSL back to RGB is essential when you need computer-readable color values. If you&#39;ve been working with HSL colors for design purposes, this converter will give you the RGB values needed for CSS, programming, or other technical applications.
                </p>
                <p className="text-muted-foreground mb-4">
                  This conversion is the reverse of RGB to HSL and involves converting the human-friendly HSL values back into the RGB color space that computers and displays understand.
                </p>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    HSL to RGB conversion is commonly used when moving from design tools (which often use HSL) to development environments (which need RGB values).
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">HSL to HEX Converter</h3>
                <p className="text-muted-foreground mb-4">
                  HSL to HEX conversion combines the benefits of human-friendly color editing with web-compatible color codes. This is perfect for designers who want to work in HSL for color selection but need HEX codes for their websites or applications.
                </p>
                <p className="text-muted-foreground mb-4">
                  The process involves converting HSL values to RGB first, then converting RGB to the compact hexadecimal format that works across all web platforms.
                </p>
                <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
                  <h4 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Pro Tip:</h4>
                  <p className="text-sm text-teal-700 dark:text-teal-300">
                    This conversion is ideal for creating color palettes in HSL (easy to modify) and then converting to HEX for web implementation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Our Converter Stands Out */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Our Color Converter?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Trusted Accuracy</h3>
                <p className="text-muted-foreground">
                  Our color conversion algorithms are based on industry-standard formulas used by professional design software. You can trust our results for both creative and technical work.
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
                  Created by experienced developers and designers who understand the nuances of color theory and digital color representation across different platforms and devices.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Proven Experience</h3>
                <p className="text-muted-foreground">
                  Used by thousands of designers, developers, and creative professionals worldwide. Our tool has been refined through years of real-world application and user feedback.
                </p>
              </div>
            </div>
          </section>

          {/* Common Use Cases */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Common Color Conversion Use Cases</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Web Development</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Converting design tool colors to CSS-compatible formats</li>
                  <li>• Ensuring color consistency across different platforms</li>
                  <li>• Working with CSS custom properties and design systems</li>
                  <li>• Creating responsive color schemes with transparency</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Graphic Design</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Matching colors between different design applications</li>
                  <li>• Creating color palettes for branding projects</li>
                  <li>• Converting colors for print vs digital media</li>
                  <li>• Ensuring color accuracy across different devices</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
