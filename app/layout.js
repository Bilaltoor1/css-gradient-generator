import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/ThemeProvider";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Gradient Generator - Professional Color Palette & Gradient Generator",
    template: "%s | Gradient Generator"
  },
  description: "Create stunning color palettes, gradients, and text effects with our professional color tools. Generate CSS, export images, and explore thousands of beautiful gradients.",
  keywords: ["color palette", "gradient generator", "color tools", "CSS gradients", "web design", "color picker"],
  authors: [{ name: "Gradient Generator" }],
  creator: "Gradient Generator",
  publisher: "Gradient Generator",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gradientgenerator-tau.vercel.app/'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Gradient Generator - Professional Color Tools",
    description: "Create stunning color palettes, gradients, and text effects with our professional color tools.",
    siteName: "Gradient Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gradient Generator - Professional Color Tools",
    description: "Create stunning color palettes, gradients, and text effects with our professional color tools.",
    creator: "@gradientgenerator",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="_2BVpqnfxfRx6alD9ohMojeDq-9jOuk6Kl2kYOzb9Ss" />
        <link rel="canonical" href="https://gradientgenerator-tau.vercel.app/" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              className: '',
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-color)',
              },
            }}
          />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
