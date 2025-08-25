"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { RiCss3Fill, RiTailwindCssFill } from "react-icons/ri";
import toast from "react-hot-toast";

// Time ago formatter
function timeAgo(date) {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffSecs < 60) return "Just now";
  if (diffMins < 60) return `${diffMins}min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffWeeks < 4) return `${diffWeeks}w ago`;
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${diffYears}y ago`;
}

export default function ColorGrid({ initialItems, categories }) {
  
  const copyCss = async (color) => {
    const css = `#${color.hex}`;
    await navigator.clipboard.writeText(`background-color: ${css};`);
    toast.success("CSS copied to clipboard!");
  };

  const copyTailwind = async (color) => {
    const hex = color.hex.toLowerCase();
    // Try to match common Tailwind colors or provide custom class
    const tailwindClass = getTailwindClass(hex);
    await navigator.clipboard.writeText(tailwindClass);
    toast.success("Tailwind class copied to clipboard!");
  };

  const getTailwindClass = (hex) => {
    // Common Tailwind color mappings
    const tailwindColors = {
      'ff0000': 'bg-red-500',
      'ef4444': 'bg-red-500',
      '00ff00': 'bg-green-500',
      '10b981': 'bg-emerald-500',
      '0000ff': 'bg-blue-500',
      '3b82f6': 'bg-blue-500',
      'ffff00': 'bg-yellow-500',
      'f59e0b': 'bg-amber-500',
      'ff00ff': 'bg-fuchsia-500',
      '8b5cf6': 'bg-violet-500',
      'ffa500': 'bg-orange-500',
      'f97316': 'bg-orange-500',
    };

    return tailwindColors[hex] || `bg-[#${hex}]`;
  };

  async function exportImage(id, w, h, colorName) {
    const el = document.getElementById(id);
    if (!el) return;

    const toastId = toast.loading("Preparing download...");

    try {
      const { toPng } = await import("html-to-image");
      // Use pixelRatio: 1 and exact dimensions to get the selected resolution
      const dataUrl = await toPng(el, { 
        width: w, 
        height: h, 
        pixelRatio: 1,
        quality: 0.95
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${colorName}-color-${w}x${h}.png`;
      a.click();
      toast.dismiss(toastId);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to download image");
    }
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {initialItems.map((colorShade, index) => {
          const uniqueKey = `${colorShade.slug}-${colorShade.hex || colorShade.baseHex}-${index}`;
          const id = `color-card-${uniqueKey}`;
          return (
            <div key={uniqueKey} className="group bg-card/80 backdrop-blur rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300">
              <Link href={`/explore-colors/${colorShade.slug}`} className="block">
                <div id={id} className="h-48 w-full cursor-pointer" style={{ backgroundColor: `#${colorShade.baseHex?.replace('#', '') || colorShade.hex}` }} />
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {colorShade.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {timeAgo(colorShade.createdAt)}
                    </p>
                  </div>

                  {/* Show color hex */}
                  <div className="text-xs text-muted-foreground font-mono">
                    #{colorShade.baseHex?.replace('#', '') || colorShade.hex}
                  </div>
                </div>
              </Link>
              
              {/* Action buttons - outside of link to prevent nested interaction */}
              <div className="px-4 pb-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copyCss({ hex: colorShade.baseHex?.replace('#', '') || colorShade.hex });
                    }}
                    className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 border-blue-200"
                  >
                    <RiCss3Fill className="w-4 h-4 mr-1" />
                    CSS
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      copyTailwind({ hex: colorShade.baseHex?.replace('#', '') || colorShade.hex });
                    }}
                    className="cursor-pointer hover:bg-cyan-50 hover:text-cyan-600 border-cyan-200"
                  >
                    <RiTailwindCssFill className="w-4 h-4 mr-1" />
                    Tailwind
                  </Button>
                  <div onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                    <ExportMenu onPick={(w, h) => exportImage(id, w, h, colorShade.title)} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function ExportMenu({ onPick }) {
  const [orientation, setOrientation] = useState("landscape");
  const options = [
    { label: "HD (1280x720)", w: 1280, h: 720 },
    { label: "FHD (1920x1080)", w: 1920, h: 1080 },
    { label: "2K (2560x1440)", w: 2560, h: 1440 },
    { label: "4K (3840x2160)", w: 3840, h: 2160 },
    { label: "Square (1080x1080)", w: 1080, h: 1080 },
    { label: "Mobile (1080x1920)", w: 1080, h: 1920 }
  ];

  const pick = async (o) => {
    const dims = orientation === "portrait" ? { w: o.h, h: o.w } : { w: o.w, h: o.h };
    await onPick(dims.w, dims.h);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="cursor-pointer hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 border-green-200 dark:border-green-800"
        >
          <Download className="w-4 h-4 mr-1" />
          Export
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="top" align="end" sideOffset={8} className="w-56 bg-card text-card-foreground border border-border rounded-lg shadow-xl p-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Orientation</span>
          <select
            className="text-sm border rounded px-2 py-1 cursor-pointer bg-card text-card-foreground border-border"
            value={orientation}
            onChange={e => setOrientation(e.target.value)}
          >
            <option value="landscape">Landscape</option>
            <option value="portrait">Portrait</option>
          </select>
        </div>

        <div className="space-y-1">
          {options.map(o => (
            <DropdownMenuItem key={o.label} onSelect={() => pick(o)} className="text-sm px-3 py-2 rounded">
              {o.label}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
