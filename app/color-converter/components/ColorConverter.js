'use client';

import { useState, useEffect, useCallback } from 'react';
import { Copy, Check, Palette, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ColorConverter() {
  const [inputColor, setInputColor] = useState('#3B82F6');
  const [inputFormat, setInputFormat] = useState('hex');
  const [convertedColors, setConvertedColors] = useState({});
  const [copiedFormat, setCopiedFormat] = useState(null);

  // Color conversion functions
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToRgb = (h, s, l) => {
    h /= 360;
    s /= 100;
    l /= 100;
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  const parseColor = (color, format) => {
    try {
      let rgb = null;

      switch (format) {
        case 'hex':
          if (!/^#[0-9A-F]{6}$/i.test(color)) return null;
          rgb = hexToRgb(color);
          break;
        case 'rgb':
          const rgbMatch = color.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/);
          if (!rgbMatch) return null;
          rgb = {
            r: parseInt(rgbMatch[1]),
            g: parseInt(rgbMatch[2]),
            b: parseInt(rgbMatch[3])
          };
          break;
        case 'rgba':
          const rgbaMatch = color.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/);
          if (!rgbaMatch) return null;
          rgb = {
            r: parseInt(rgbaMatch[1]),
            g: parseInt(rgbaMatch[2]),
            b: parseInt(rgbaMatch[3]),
            a: parseFloat(rgbaMatch[4])
          };
          break;
        case 'hsl':
          const hslMatch = color.match(/hsl\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*\)/);
          if (!hslMatch) return null;
          rgb = hslToRgb(parseInt(hslMatch[1]), parseInt(hslMatch[2]), parseInt(hslMatch[3]));
          break;
        case 'hsla':
          const hslaMatch = color.match(/hsla\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*([\d.]+)\s*\)/);
          if (!hslaMatch) return null;
          rgb = { ...hslToRgb(parseInt(hslaMatch[1]), parseInt(hslaMatch[2]), parseInt(hslaMatch[3])), a: parseFloat(hslaMatch[4]) };
          break;
        default:
          return null;
      }

      if (!rgb || rgb.r < 0 || rgb.r > 255 || rgb.g < 0 || rgb.g > 255 || rgb.b < 0 || rgb.b > 255) {
        return null;
      }

      return rgb;
    } catch (error) {
      return null;
    }
  };

  const convertColor = useCallback((color, format) => {
    const rgb = parseColor(color, format);
    if (!rgb) return null;

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

    return {
      hex: hex.toUpperCase(),
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a || 1})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${rgb.a || 1})`,
      rgbValues: rgb,
      hslValues: hsl
    };
  }, []);

  useEffect(() => {
    const converted = convertColor(inputColor, inputFormat);
    if (converted) {
      setConvertedColors(converted);
    }
  }, [inputColor, inputFormat, convertColor]);

  const handleInputChange = (value) => {
    setInputColor(value);
  };

  const handleFormatChange = (format) => {
    setInputFormat(format);
    // Convert current color to new format for input
    if (convertedColors[format]) {
      setInputColor(convertedColors[format]);
    }
  };

  const copyToClipboard = async (text, format) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const formatLabels = {
    hex: 'HEX',
    rgb: 'RGB',
    rgba: 'RGBA',
    hsl: 'HSL',
    hsla: 'HSLA'
  };

  const formatExamples = {
    hex: '#FF5733',
    rgb: 'rgb(255, 87, 51)',
    rgba: 'rgba(255, 87, 51, 1)',
    hsl: 'hsl(14, 100%, 60%)',
    hsla: 'hsla(14, 100%, 60%, 1)'
  };

  const randomColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];

  const setRandomColor = () => {
    const randomColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    setInputColor(randomColor);
    setInputFormat('hex');
  };

  const isValidColor = convertColor(inputColor, inputFormat) !== null;

  return (
    <div className="mx-auto max-w-4xl">
      {/* Main Converter Card */}
      <div className="rounded-2xl bg-card shadow-xl ring-1 ring-border">
        <div className="p-6 sm:p-8">
          {/* Color Preview */}
          <div className="mb-8 text-center">
            <div 
              className="mx-auto h-32 w-32 rounded-2xl border-4 border-border shadow-lg transition-all duration-300 sm:h-40 sm:w-40"
              style={{ 
                backgroundColor: isValidColor ? convertedColors.hex : 'var(--muted)',
                boxShadow: isValidColor ? `0 20px 25px -5px ${convertedColors.hex}33, 0 10px 10px -5px ${convertedColors.hex}1a` : undefined
              }}
            />
            {isValidColor && (
              <p className="mt-4 text-lg font-medium text-foreground">
                {convertedColors.hex}
              </p>
            )}
          </div>

          {/* Input Section */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground mb-3">
              Input Color Format
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(formatLabels).map(([format, label]) => (
                <button
                  key={format}
                  onClick={() => handleFormatChange(format)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    inputFormat === format
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-accent text-accent-foreground hover:bg-accent/80'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={inputColor}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={formatExamples[inputFormat]}
                  className={`w-full rounded-lg border px-4 py-3 text-lg font-mono transition-colors bg-background text-foreground ${
                    isValidColor
                      ? 'border-border focus:border-primary focus:ring-primary'
                      : 'border-red-500 focus:border-red-500 focus:ring-red-500'
                  }`}
                />
              </div>
              <Button
                onClick={setRandomColor}
                variant="outline"
                size="lg"
                className="px-4"
              >
                <RefreshCw className="h-5 w-5" />
              </Button>
              {inputFormat === 'hex' && (
                <input
                  type="color"
                  value={typeof convertedColors.hex === 'string' ? convertedColors.hex : '#000000'}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className="h-12 w-12 rounded-lg border-2 border-border cursor-pointer"
                />
              )}
            </div>
            {!isValidColor && inputColor && (
              <p className="mt-2 text-sm text-red-600">
                Invalid {formatLabels[inputFormat]} format
              </p>
            )}
          </div>

          {/* Output Section */}
          {isValidColor && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Converted Formats
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                {Object.entries(formatLabels).map(([format, label]) => (
                  <div key={format} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {label}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(convertedColors[format], format)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedFormat === format ? (
                          <>
                            <Check className="h-4 w-4 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <div 
                      className="rounded-lg px-4 py-3 font-mono text-sm cursor-pointer transition-colors text-foreground"
                      style={{ backgroundColor: 'var(--muted)' }}
                      onClick={() => copyToClipboard(convertedColors[format], format)}
                    >
                      {convertedColors[format]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Colors */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Quick Colors
        </h3>
        <div className="flex flex-wrap gap-3">
          {randomColors.map((color, index) => (
            <button
              key={index}
              onClick={() => {
                setInputColor(color);
                setInputFormat('hex');
              }}
              className="h-12 w-12 rounded-lg border-2 border-border transition-transform hover:scale-110"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Color Information */}
      {isValidColor && convertedColors.rgbValues && (
        <div className="mt-8 rounded-xl bg-muted p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Color Information
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <span className="text-sm text-muted-foreground">Red</span>
              <p className="text-lg font-mono text-foreground">{convertedColors.rgbValues.r}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Green</span>
              <p className="text-lg font-mono text-foreground">{convertedColors.rgbValues.g}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Blue</span>
              <p className="text-lg font-mono text-foreground">{convertedColors.rgbValues.b}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Hue</span>
              <p className="text-lg font-mono text-foreground">{convertedColors.hslValues.h}°</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Saturation</span>
              <p className="text-lg font-mono text-foreground">{convertedColors.hslValues.s}%</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Lightness</span>
              <p className="text-lg font-mono text-foreground">{convertedColors.hslValues.l}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
