"use client";

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CopyButtons({ cssGradient, tailwindClass, type }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      let textToCopy = '';
      if (type === 'css' && cssGradient) {
        textToCopy = `background: ${cssGradient};`;
      } else if (type === 'tailwind' && tailwindClass) {
        textToCopy = tailwindClass;
      }
      
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-1" />
          <span className="text-xs">Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-1" />
          <span className="text-xs">Copy</span>
        </>
      )}
    </Button>
  );
}
