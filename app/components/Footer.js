import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Tools",
      links: [
        { href: "/palette", label: "Color Palette Generator" },
        { href: "/gradient", label: "Gradient Generator" },
        { href: "/text-gradient", label: "Text Gradient Generator" },
        { href: "/gradient/explore", label: "Explore Gradients" },
  { href: "/color", label: "Color Shades" },
      ]
    },
    {
      title: "Popular Gradient Categories",
      links: [
        { href: "/gradient/explore?category=red", label: "Red Gradients" },
        { href: "/gradient/explore?category=blue", label: "Blue Gradients" },
        { href: "/gradient/explore?category=green", label: "Green Gradients" },
        { href: "/gradient/explore?category=yellow", label: "Yellow Gradients" },
        { href: "/gradient/explore?category=purple", label: "Purple Gradients" },
        { href: "/gradient/explore?category=orange", label: "Orange Gradients" },
      ]
    },
    {
      title: "Color Shades",
      links: [
  { href: "/color/red", label: "Red Shades" },
  { href: "/color/blue", label: "Blue Shades" },
  { href: "/color/green", label: "Green Shades" },
  { href: "/color/purple", label: "Purple Shades" },
  { href: "/color/orange", label: "Orange Shades" },
  { href: "/color/yellow", label: "Yellow Shades" },
      ]
    },
    {
      title: "Resources",
      links: [
        { href: "/blog", label: "Design Blog" },
        { href: "/blog/css-gradients-guide", label: "CSS Gradients Guide" },
        { href: "/blog/color-psychology-web-design", label: "Color Psychology" },
        { href: "/blog/best-color-palettes-website-design", label: "Color Palettes 2025" },
        { href: "/blog/modern-web-design-trends", label: "Design Trends" },
        { href: "/blog/gradient-design-trends-2025", label: "Gradient Trends" },
      ]
    }
  ];

  const popularColors = [
    // Red shades
    { name: "Crimson Red", hex: "DC143C", rgb: "220, 20, 60" },
    { name: "Fire Red", hex: "FF2500", rgb: "255, 37, 0" },
    { name: "Dark Red", hex: "8B0000", rgb: "139, 0, 0" },
    // Blue shades  
    { name: "Royal Blue", hex: "4169E1", rgb: "65, 105, 225" },
    { name: "Deep Blue", hex: "003366", rgb: "0, 51, 102" },
    { name: "Sky Blue", hex: "87CEEB", rgb: "135, 206, 235" },
    // Green shades
    { name: "Forest Green", hex: "228B22", rgb: "34, 139, 34" },
    { name: "Emerald", hex: "50C878", rgb: "80, 200, 120" },
    { name: "Lime Green", hex: "32CD32", rgb: "50, 205, 50" },
    // Yellow shades
    { name: "Golden Yellow", hex: "FFD700", rgb: "255, 215, 0" },
    { name: "Sunshine", hex: "FFFF66", rgb: "255, 255, 102" },
    { name: "Amber", hex: "FFBF00", rgb: "255, 191, 0" },
    // Purple shades
    { name: "Royal Purple", hex: "7851A9", rgb: "120, 81, 169" },
    { name: "Violet", hex: "8A2BE2", rgb: "138, 43, 226" },
    { name: "Lavender", hex: "E6E6FA", rgb: "230, 230, 250" },
    // Orange shades
    { name: "Bright Orange", hex: "FF8C00", rgb: "255, 140, 0" },
    { name: "Tangerine", hex: "FF8243", rgb: "255, 130, 67" },
    { name: "Coral", hex: "FF7F50", rgb: "255, 127, 80" },
  ];

  const popularGradients = [
    { name: "Fire Sunset", slug: "fire-sunset", colors: ["#FF0000", "#FF6347", "#FFB347"] },
    { name: "Deep Ocean", slug: "deep-ocean", colors: ["#001f3f", "#0074D9", "#39CCCC"] },
    { name: "Emerald Forest", slug: "emerald-forest", colors: ["#013220", "#228B22", "#90EE90"] },
    { name: "Golden Hour", slug: "golden-hour", colors: ["#FFD700", "#FFED4E", "#FFF9C4"] },
    { name: "Royal Velvet", slug: "royal-velvet", colors: ["#4B0082", "#8A2BE2", "#DA70D6"] },
    { name: "Tangerine Dream", slug: "tangerine-dream", colors: ["#FF8C00", "#FFA500", "#FFB347"] },
  ];

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular Colors Section - Commented out as requested */}
        {/*
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-foreground mb-6">Popular Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularColors.map((color, index) => (
              <Link 
                key={index}
                href={`/color/${color.hex}`}
                className="group bg-background rounded-lg p-4 border border-border hover:border-primary transition-all"
              >
                <div 
                  className="w-full h-16 rounded-md mb-3 border border-border"
                  style={{ backgroundColor: `#${color.hex}` }}
                />
                <div className="text-sm">
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {color.name}
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">
                    #{color.hex}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    RGB({color.rgb})
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        */}

        {/* Popular Gradients Section - Commented out as requested */}
        {/*
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-foreground mb-6">Popular Gradients</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularGradients.map((gradient, index) => (
              <Link 
                key={index}
                href={`/gradient/explore?search=${gradient.slug}`}
                className="group bg-background rounded-lg p-4 border border-border hover:border-primary transition-all"
              >
                <div 
                  className="w-full h-20 rounded-md mb-3 border border-border"
                  style={{ 
                    background: `linear-gradient(135deg, ${gradient.colors.join(', ')})` 
                  }}
                />
                <div className="text-sm">
                  <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {gradient.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {gradient.colors.length} colors
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        */}

        {/* SEO Links Section - Commented out as requested
        <div className="mb-8 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold text-foreground mb-4">Design Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-foreground mb-2">CSS Tools</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><Link href="/blog/css-gradients-guide" className="hover:text-foreground transition-colors">CSS Gradient Tutorial</Link></li>
                <li><Link href="/blog/css-gradient-backgrounds-tutorial" className="hover:text-foreground transition-colors">Gradient Backgrounds</Link></li>
                <li><Link href="/gradient" className="hover:text-foreground transition-colors">CSS Gradient Generator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Color Theory</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><Link href="/blog/color-psychology-web-design" className="hover:text-foreground transition-colors">Color Psychology</Link></li>
                <li><Link href="/blog/best-color-palettes-website-design" className="hover:text-foreground transition-colors">Color Palettes Guide</Link></li>
                <li><Link href="/palette" className="hover:text-foreground transition-colors">Color Palette Generator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Design Trends</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li><Link href="/blog/modern-web-design-trends" className="hover:text-foreground transition-colors">Web Design Trends</Link></li>
                <li><Link href="/blog/gradient-design-trends-2025" className="hover:text-foreground transition-colors">Gradient Trends 2025</Link></li>
                <li><Link href="/text-gradient" className="hover:text-foreground transition-colors">Text Gradient Generator</Link></li>
              </ul>
            </div>
          </div>
        </div>
        */}

        {/* Bottom Footer */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-xl font-bold text-foreground">
                Gradient Studio
              </Link>
              <p className="text-sm text-muted-foreground mt-1">
                Create stunning gradients and color palettes for your designs
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              © {currentYear} Gradient Studio. All rights reserved.
            </div>
          </div>
          
          {/* SEO Footer Text */}
          <div className="mt-6 text-xs text-muted-foreground leading-relaxed">
            <p>
              Gradient Studio is your ultimate destination for creating beautiful CSS gradients, color palettes, and exploring color theory. 
              Our free tools help designers and developers generate stunning gradient backgrounds, discover perfect color combinations, 
              and learn about color psychology in web design. Whether you&apos;re looking for warm sunset gradients, cool ocean depths, 
              or vibrant neon glows, our extensive library has thousands of gradient combinations for every project. 
              Explore our comprehensive guides on CSS gradients, color palettes, and modern design trends to elevate your creative work.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
