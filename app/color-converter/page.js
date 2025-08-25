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
    </div>
  );
}
