/**
 * Converts hex to HSL
 */
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
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

  return [h * 360, s * 100, l * 100];
}

/**
 * Converts HSL to hex
 */
function hslToHex(h, s, l) {
  h = h / 360;
  s = s / 100;
  l = l / 100;

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const r = hue2rgb(p, q, h + 1/3);
  const g = hue2rgb(p, q, h);
  const b = hue2rgb(p, q, h - 1/3);

  const toHex = (c) => {
    const hex = Math.round(c * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generates an array of color shades from a base hex color
 * @param {string} baseHex - Base hex color (e.g., "#FF0000")
 * @param {number} count - Number of shades to generate
 * @returns {Array} Array of shade objects with hex and name properties
 */
export function generateShades(baseHex, count = 7) {
  if (!baseHex || !baseHex.startsWith('#')) {
    throw new Error('Invalid hex color provided');
  }

  const [h, s, l] = hexToHsl(baseHex);
  const shades = [];
  
  // Generate shades by varying lightness
  for (let i = 0; i < count; i++) {
    // Create a distribution from very light (90%) to very dark (10%)
    const lightness = 90 - (i * 80 / (count - 1));
    const shadeHex = hslToHex(h, s, lightness);
    
    shades.push({
      hex: shadeHex,
      name: `Shade ${i + 1}`,
      lightness: Math.round(lightness)
    });
  }

  return shades;
}

/**
 * Generates lighter tints of a color
 */
export function generateTints(baseHex, count = 5) {
  const [h, s, l] = hexToHsl(baseHex);
  const tints = [];
  
  for (let i = 0; i < count; i++) {
    const lightness = l + (i * (100 - l) / count);
    const tintHex = hslToHex(h, s, Math.min(lightness, 95));
    
    tints.push({
      hex: tintHex,
      name: `Tint ${i + 1}`,
      lightness: Math.round(lightness)
    });
  }

  return tints;
}

/**
 * Generates darker shades of a color
 */
export function generateShadesOnly(baseHex, count = 5) {
  const [h, s, l] = hexToHsl(baseHex);
  const shades = [];
  
  for (let i = 0; i < count; i++) {
    const lightness = l - (i * l / count);
    const shadeHex = hslToHex(h, s, Math.max(lightness, 5));
    
    shades.push({
      hex: shadeHex,
      name: `Shade ${i + 1}`,
      lightness: Math.round(lightness)
    });
  }

  return shades;
}
