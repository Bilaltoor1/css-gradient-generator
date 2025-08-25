"use client";
import { useState, useCallback } from "react";
import GradientGenerator from "../components/GradientGenerator";
import { Button } from "@/components/ui/button";
import { RiTailwindCssFill, RiFileCopyLine, RiCss3Fill } from "react-icons/ri";
import { MdCheck } from "react-icons/md";

export default function GradientPage() {
  const [currentGradient, setCurrentGradient] = useState("linear-gradient(90deg, rgba(130, 83, 255, 1) 0%, rgba(78, 205, 196, 1) 100%)");
  const [tailwindBgClasses, setTailwindBgClasses] = useState("");

  const handleGradientChange = useCallback((gradient) => {
    setCurrentGradient(gradient);
  }, []);

  // CopyButtons component for both CSS and Tailwind
  function CopyButtons({ cssGradient, tailwindClass, type }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
      try {
        const text = type === 'css' ? `background: ${cssGradient};` : tailwindClass;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (e) {
        // No toast
      }
    };
    return (
      <Button
        onClick={handleCopy}
        size="sm"
        variant="outline"
        className="inline-flex items-center gap-2 px-2 py-1 text-xs rounded border border-border transition"
      >
        {copied
          ? <MdCheck className="w-4 h-4 text-green-600" />
          : <RiFileCopyLine className="w-4 h-4" />}
        <span>Copy</span>
      </Button>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero area */}
      <section className="w-full bg-card/80 backdrop-blur border-b border-border" style={{ background: currentGradient }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white/90 drop-shadow">Gradient Generator</h1>
          <p className="mt-3 text-white/80 max-w-2xl">Create beautiful gradients with multiple color stops, linear and radial types.</p>
        </div>
      </section>

      {/* Tool Content */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 flex-1">
        <GradientGenerator onGradientChange={handleGradientChange} onTailwindBgChange={setTailwindBgClasses} />
        {/* CSS and Tailwind copy section - mobile responsive */}
        <div className="max-w-6xl mt-4 md:mt-6 space-y-6 md:space-y-8">
          {/* Copy CSS and Tailwind - side by side layout */}
          <div className="flex flex-col gap-4">
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
                    <CopyButtons cssGradient={currentGradient} type="css" />
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-foreground">{`background: ${currentGradient};`}</code>
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
                    <CopyButtons tailwindClass={tailwindBgClasses} type="tailwind" />
                  </div>
                  <pre className="p-4 text-sm overflow-x-auto">
                    <code className="text-foreground break-all">{tailwindBgClasses}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
