// Utility functions for gradient manipulation and CSS generation

export function buildGradientCss(gradient) {
  if (!gradient) return '';
  // Prefer generating gradient CSS from stops or colors so runtime controls (angle/type/offset)
  // are applied. Only fall back to an existing cssGradient string if no stops/colors exist.

  // If it has stops array (preferred, more control)
  if (gradient.stops && Array.isArray(gradient.stops) && gradient.stops.length > 0) {
    const colorStops = gradient.stops.map((stop, index) => {
      // if stop has explicit position use it, otherwise distribute evenly
      const position = (typeof stop.position === 'number')
        ? stop.position
        : (index / (gradient.stops.length - 1)) * 100;
      return `${stop.color} ${position}%`;
    }).join(', ');

    if (gradient.type === 'conic') {
      const dir = `from ${gradient.angle || 0}deg`;
      return `conic-gradient(${dir}, ${colorStops})`;
    } else if (gradient.type === 'radial') {
      return `radial-gradient(circle, ${colorStops})`;
    } else {
      // linear gradient
      const dir = `${gradient.angle !== undefined ? gradient.angle + 'deg' : (gradient.direction || '135deg')}`;
      return `linear-gradient(${dir}, ${colorStops})`;
    }
  }

  // If it has colors array, build a gradient from colors
  if (gradient.colors && Array.isArray(gradient.colors) && gradient.colors.length > 0) {
    const colors = gradient.colors.join(', ');
    if (gradient.type === 'conic') {
      const from = gradient.angle || 0;
      return `conic-gradient(from ${from}deg, ${colors})`;
    } else if (gradient.type === 'radial') {
      return `radial-gradient(circle, ${colors})`;
    } else {
      // linear gradient
      const angle = gradient.angle !== undefined ? `${gradient.angle}deg` : '135deg';
      return `linear-gradient(${angle}, ${colors})`;
    }
  }

  // If the gradient already has a cssGradient property, use it as a fallback
  if (gradient.cssGradient) {
    return gradient.cssGradient;
  }
  
  // Fallback to a default gradient
  return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

export function applyRgbOffset(color, offset = { r: 0, g: 0, b: 0 }) {
  if (!color || typeof color !== 'string') return color;
  
  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + (offset.r || 0)));
    const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + (offset.g || 0)));
    const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + (offset.b || 0)));
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  // Handle rgb/rgba colors
  if (color.startsWith('rgb')) {
    const values = color.match(/\d+/g);
    if (values && values.length >= 3) {
      const r = Math.max(0, Math.min(255, parseInt(values[0]) + (offset.r || 0)));
      const g = Math.max(0, Math.min(255, parseInt(values[1]) + (offset.g || 0)));
      const b = Math.max(0, Math.min(255, parseInt(values[2]) + (offset.b || 0)));
      
      if (values.length === 4) {
        return `rgba(${r}, ${g}, ${b}, ${values[3]})`;
      }
      return `rgb(${r}, ${g}, ${b})`;
    }
  }
  
  // Return original color if can't parse
  return color;
}

export function buildTailwindClass(cssGradient, type = 'linear', angle = 135) {
  if (!cssGradient || typeof cssGradient !== 'string') return '';
  // Extract colors from the CSS gradient (hex and rgb/rgba)
  const colorRegex = /#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3}|rgb\([^)]+\)|rgba\([^)]+\)/g;
  const colors = cssGradient.match(colorRegex) || [];

  // Limit to maximum 6 color stops for optimal Tailwind CSS support
  const limitedColors = colors.slice(0, 6);

  // Helper: compute direction token for Tailwind from angle
  const computeDirection = (angleVal) => {
    let direction = 'to-br';
    if ((angleVal >= 0 && angleVal < 22.5) || angleVal >= 337.5) {
      direction = 'to-t';
    } else if (angleVal >= 22.5 && angleVal < 67.5) {
      direction = 'to-tr';
    } else if (angleVal >= 67.5 && angleVal < 112.5) {
      direction = 'to-r';
    } else if (angleVal >= 112.5 && angleVal < 157.5) {
      direction = 'to-br';
    } else if (angleVal >= 157.5 && angleVal < 202.5) {
      direction = 'to-b';
    } else if (angleVal >= 202.5 && angleVal < 247.5) {
      direction = 'to-bl';
    } else if (angleVal >= 247.5 && angleVal < 292.5) {
      direction = 'to-l';
    } else if (angleVal >= 292.5 && angleVal < 337.5) {
      direction = 'to-tl';
    }
    return direction;
  };

  // RADIAL / CONIC: Tailwind has limited direct utilities; build from/via/to when possible
  if (type === 'radial' || type === 'conic') {
    if (limitedColors.length === 0) return type === 'radial' ? 'bg-gradient-radial' : 'bg-gradient-conic';
    if (limitedColors.length === 1) return `${type === 'radial' ? 'bg-gradient-radial' : 'bg-gradient-conic'} from-[${limitedColors[0]}]`;
    if (limitedColors.length === 2) return `${type === 'radial' ? 'bg-gradient-radial' : 'bg-gradient-conic'} from-[${limitedColors[0]}] to-[${limitedColors[1]}]`;
    if (limitedColors.length === 3) return `${type === 'radial' ? 'bg-gradient-radial' : 'bg-gradient-conic'} from-[${limitedColors[0]}] via-[${limitedColors[1]}] to-[${limitedColors[2]}]`;
    
    // 4+ stops: Use multiple via colors (Tailwind supports multiple via-* utilities)
    const baseClass = type === 'radial' ? 'bg-gradient-radial' : 'bg-gradient-conic';
    let tailwindClass = `${baseClass} from-[${limitedColors[0]}]`;
    
    // Add via colors for middle stops (excluding first and last)
    for (let i = 1; i < limitedColors.length - 1; i++) {
      tailwindClass += ` via-[${limitedColors[i]}]`;
    }
    
    // Add final to color
    tailwindClass += ` to-[${limitedColors[limitedColors.length - 1]}]`;
    
    return tailwindClass;
  }

  // LINEAR: compute Tailwind direction and build classes
  const dir = computeDirection(angle);
  let tailwindClass = `bg-gradient-${dir}`;

  if (limitedColors.length === 0) {
    return tailwindClass;
  }

  if (limitedColors.length === 1) {
    // single color: apply as from color
    tailwindClass += ` from-[${limitedColors[0]}]`;
    return tailwindClass;
  }

  if (limitedColors.length === 2) {
    tailwindClass += ` from-[${limitedColors[0]}] to-[${limitedColors[1]}]`;
    return tailwindClass;
  }

  if (limitedColors.length === 3) {
    tailwindClass += ` from-[${limitedColors[0]}] via-[${limitedColors[1]}] to-[${limitedColors[2]}]`;
    return tailwindClass;
  }

  // 4-6 colors: Use multiple via utilities for optimal Tailwind CSS support
  tailwindClass += ` from-[${limitedColors[0]}]`;
  
  // Add via colors for middle stops (excluding first and last)
  for (let i = 1; i < limitedColors.length - 1; i++) {
    tailwindClass += ` via-[${limitedColors[i]}]`;
  }
  
  // Add final to color
  tailwindClass += ` to-[${limitedColors[limitedColors.length - 1]}]`;
  
  return tailwindClass;
}

// Additional utility functions that might be needed

export function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return null;
  
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function shuffleRgb(color, shuffle = { r: 0, g: 0, b: 0 }) {
  return applyRgbOffset(color, shuffle);
}

// Color manipulation utilities
export function lightenColor(color, amount = 0.1) {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const factor = 1 + amount;
  const r = Math.min(255, Math.floor(rgb.r * factor));
  const g = Math.min(255, Math.floor(rgb.g * factor));
  const b = Math.min(255, Math.floor(rgb.b * factor));
  
  return rgbToHex(r, g, b);
}

export function darkenColor(color, amount = 0.1) {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const factor = 1 - amount;
  const r = Math.max(0, Math.floor(rgb.r * factor));
  const g = Math.max(0, Math.floor(rgb.g * factor));
  const b = Math.max(0, Math.floor(rgb.b * factor));
  
  return rgbToHex(r, g, b);
}

// Gradient generation utilities
export function generateRandomGradient() {
  const colors = [
    '#FF6B35', '#F7931E', '#FFD23F', '#3498DB', '#E74C3C', 
    '#27AE60', '#9B59B6', '#1ABC9C', '#E67E22', '#34495E'
  ];
  
  const color1 = colors[Math.floor(Math.random() * colors.length)];
  let color2 = colors[Math.floor(Math.random() * colors.length)];
  
  // Ensure different colors
  while (color2 === color1) {
    color2 = colors[Math.floor(Math.random() * colors.length)];
  }
  
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
}

export function generateComplementaryGradient(baseColor) {
  const rgb = hexToRgb(baseColor);
  if (!rgb) return generateRandomGradient();
  
  // Simple complementary color calculation
  const compR = 255 - rgb.r;
  const compG = 255 - rgb.g;
  const compB = 255 - rgb.b;
  
  const complementary = rgbToHex(compR, compG, compB);
  
  return `linear-gradient(135deg, ${baseColor} 0%, ${complementary} 100%)`;
}
