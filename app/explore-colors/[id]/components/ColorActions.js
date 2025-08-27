'use client';

import { useState } from 'react';
import { Download, Image, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { toPng } from 'html-to-image';

export default function ColorActions({ colorId, colorName, hexColor, shades = [] }) {
  const [isExporting, setIsExporting] = useState(false);

  const exportAsImage = async (format = 'png', resolution = '1080') => {
    setIsExporting(true);
    try {
      const element = document.getElementById(`color-preview-${colorId}`);
      if (!element) {
        throw new Error('Color preview element not found');
      }

      const scale = resolution === '4k' ? 4 : resolution === '2k' ? 2 : 1;
      const width = 1920 * scale;
      const height = 1080 * scale;

      const dataUrl = await toPng(element, {
        width,
        height,
        style: {
          width: `${width}px`,
          height: `${height}px`,
        },
        pixelRatio: 1,
      });

      const link = document.createElement('a');
      link.download = `${colorName.toLowerCase().replace(/\s+/g, '-')}-${resolution}.${format}`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const exportPalette = async () => {
    setIsExporting(true);
    try {
      // Create palette data
      const paletteData = {
        name: colorName,
        mainColor: hexColor,
        shades: shades.map(shade => ({
          name: shade.name,
          hex: shade.hex
        }))
      };

      // Create downloadable JSON file
      const dataStr = JSON.stringify(paletteData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.download = `${colorName.toLowerCase().replace(/\s+/g, '-')}-palette.json`;
      link.href = url;
      link.click();
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Palette export failed:', error);
      alert('Palette export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Export Image Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="secondary" 
            size="sm"
            className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/20"
            disabled={isExporting}
          >
            <Image className="w-4 h-4 mr-1" aria-hidden="true" alt="" />
            <span className="hidden sm:inline">Export</span>
            {isExporting && <span className="ml-1">...</span>}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem onClick={() => exportAsImage('png', '1080')}>
            <div className="flex items-center justify-between w-full">
              <span>PNG (HD)</span>
              <Badge variant="secondary" className="text-xs">1080p</Badge>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportAsImage('png', '2k')}>
            <div className="flex items-center justify-between w-full">
              <span>PNG (2K)</span>
              <Badge variant="secondary" className="text-xs">1440p</Badge>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => exportAsImage('png', '4k')}>
            <div className="flex items-center justify-between w-full">
              <span>PNG (4K)</span>
              <Badge variant="secondary" className="text-xs">2160p</Badge>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Export Palette Button */}
      {shades.length > 0 && (
        <Button 
          variant="secondary" 
          size="sm"
          onClick={exportPalette}
          className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/20"
          disabled={isExporting}
        >
          <Palette className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Palette</span>
        </Button>
      )}
    </div>
  );
}
