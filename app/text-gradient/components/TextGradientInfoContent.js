import Link from "next/link";
import { ArrowRight, Palette, Code, Zap, Users, Star } from "lucide-react";

export default function TextGradientInfoContent() {
  return (
    <div className="mt-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center py-8">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Star className="w-4 h-4" />
          Trusted by 10,000+ Designers
        </div>
        <h2 className="text-3xl font-bold mb-4">Master Text Gradients Like a Pro</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create stunning gradient text effects that make your headlines pop and engage your visitors
        </p>
      </section>

      {/* Different Types of Gradient Text */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Linear Gradient Text */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
            <Palette className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Linear Gradients</h3>
          <p className="text-muted-foreground mb-4">
            Smooth color transitions that flow in a straight line. Perfect for modern, clean designs that guide the reader&#39;s eye naturally.
          </p>
          <div
            className="text-2xl font-bold mb-4 p-3 rounded"
            style={{
              background: 'linear-gradient(90deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Beautiful Flow
          </div>
          <p className="text-sm text-muted-foreground">
            Great for headlines, hero sections, and call-to-action buttons
          </p>
        </div>

        {/* Radial Gradient Text */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="w-12 h-12 bg-gradient-radial from-pink-500 to-orange-500 rounded-lg flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Radial Gradients</h3>
          <p className="text-muted-foreground mb-4">
            Circular color patterns that create depth and focus. Ideal for creating eye-catching effects that draw attention to important content.
          </p>
          <div
            className="text-2xl font-bold mb-4 p-3 rounded"
            style={{
              background: 'radial-gradient(circle, #FF6B6B 0%, #4ECDC4 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Center Focus
          </div>
          <p className="text-sm text-muted-foreground">
            Perfect for logos, feature highlights, and creative headings
          </p>
        </div>

        {/* Multi-Color Gradient Text */}
        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
            <Code className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-3">Rainbow Effects</h3>
          <p className="text-muted-foreground mb-4">
            Vibrant multi-color gradients that add energy and personality. Use these to create memorable, playful text that stands out.
          </p>
          <div
            className="text-2xl font-bold mb-4 p-3 rounded"
            style={{
              background: 'linear-gradient(45deg, #FF6B6B 0%, #FFD93D 25%, #6BCF7F 50%, #4D96FF 75%, #9B59B6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Color Burst
          </div>
          <p className="text-sm text-muted-foreground">
            Ideal for creative projects, gaming, and youth-oriented content
          </p>
        </div>
      </section>

      {/* Why Choose Our Tool */}
      <section className="bg-muted/30 rounded-lg p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">Why Designers Love Our Text Gradient Tool</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Trusted by Professionals</h4>
                <p className="text-sm text-muted-foreground">
                  Used by web designers, developers, and marketing teams at top companies worldwide
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Clean, Ready-to-Use Code</h4>
                <p className="text-sm text-muted-foreground">
                  Get perfectly formatted CSS and Tailwind classes that work immediately in your projects
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Lightning Fast</h4>
                <p className="text-sm text-muted-foreground">
                  Create beautiful gradients in seconds with our intuitive, responsive interface
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Palette className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <h4 className="font-semibold mb-1">Endless Possibilities</h4>
                <p className="text-sm text-muted-foreground">
                  Mix colors, adjust angles, and create unique effects that match your brand perfectly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section>
        <h3 className="text-2xl font-bold mb-6 text-center">How to Use Text Gradients Effectively</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Best Practices</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Use high contrast colors for better readability</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Keep text large enough (24px+) for gradient effects to show clearly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Test on different backgrounds to ensure accessibility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Use gradients sparingly for maximum impact</span>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Common Use Cases</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Hero section headlines that grab attention</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Call-to-action buttons with visual appeal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Brand logos and creative typography</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>Social media graphics and marketing materials</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-8">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Create Amazing Text Gradients?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of designers who use our tool to create stunning gradient text effects for their projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/palette"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Create Color Palette
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/gradient/explore"
              className="inline-flex items-center px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Explore Gradients
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
