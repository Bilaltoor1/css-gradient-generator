"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { toast } from 'react-hot-toast';

export default function GradientActions({ gradientId, gradientName, cssGradient, tailwindClass }) {
  const [orientation, setOrientation] = useState("landscape");
  
  const options = [
    { label: "HD (1280x720)", w: 1280, h: 720 },
    { label: "FHD (1920x1080)", w: 1920, h: 1080 },
    { label: "2K (2560x1440)", w: 2560, h: 1440 },
    { label: "4K (3840x2160)", w: 3840, h: 2160 },
    { label: "Square (1080x1080)", w: 1080, h: 1080 },
    { label: "Mobile (1080x1920)", w: 1080, h: 1920 }
  ];

  const exportImage = async (w, h) => {
    const el = document.getElementById(`gradient-preview-${gradientId}`);
    if (!el) return;

    const toastId = toast.loading("Preparing download...");

    try {
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(el, { 
        width: w, 
        height: h, 
        pixelRatio: 1,
        quality: 0.95
      });
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `${gradientName}-gradient-${w}x${h}.png`;
      a.click();
      toast.dismiss(toastId);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to download image");
    }
  };

  const pick = async (o) => {
    const dims = orientation === "portrait" ? { w: o.h, h: o.w } : { w: o.w, h: o.h };
    await exportImage(dims.w, dims.h);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="lg"
          className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/30"
        >
          <Download className="w-5 h-5 mr-2" />
          Export Image
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end" sideOffset={8} className="w-56 bg-card text-card-foreground border border-border rounded-lg shadow-xl p-3">
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
            <DropdownMenuItem key={o.label} onSelect={() => pick(o)} className="text-sm px-3 py-2 rounded cursor-pointer">
              {o.label}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

