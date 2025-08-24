const fs = require('fs');
const path = require('path');

// Color categories and their base colors
const colorCategories = [
  {
    id: 'red',
    name: 'Red',
    baseColors: ['#FF0000', '#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FEE2E2', '#8B0000', '#B91C1C', '#991B1B']
  },
  {
    id: 'green', 
    name: 'Green',
    baseColors: ['#00FF00', '#16A34A', '#22C55E', '#4ADE80', '#86EFAC', '#DCFCE7', '#006400', '#15803D', '#166534']
  },
  {
    id: 'blue',
    name: 'Blue',
    baseColors: ['#0000FF', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE', '#000080', '#1D4ED8', '#1E40AF']
  },
  {
    id: 'yellow',
    name: 'Yellow', 
    baseColors: ['#FFFF00', '#CA8A04', '#EAB308', '#FACC15', '#FDE047', '#FEFCE8', '#FFD700', '#A16207', '#854D0E']
  },
  {
    id: 'purple',
    name: 'Purple',
    baseColors: ['#800080', '#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD', '#EDE9FE', '#4C1D95', '#6D28D9', '#5B21B6']
  },
  {
    id: 'orange',
    name: 'Orange',
    baseColors: ['#FFA500', '#EA580C', '#F97316', '#FB923C', '#FDBA74', '#FED7AA', '#FF8C00', '#C2410C', '#9A3412']
  },
  {
    id: 'pink',
    name: 'Pink',
    baseColors: ['#FFC0CB', '#DB2777', '#EC4899', '#F472B6', '#F9A8D4', '#FCE7F3', '#FF69B4', '#BE185D', '#9D174D']
  },
  {
    id: 'cyan',
    name: 'Cyan',
    baseColors: ['#00FFFF', '#0891B2', '#06B6D4', '#22D3EE', '#67E8F9', '#CFFAFE', '#008B8B', '#0E7490', '#155E75']
  },
  {
    id: 'gray',
    name: 'Gray',
    baseColors: ['#808080', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB', '#F3F4F6', '#374151', '#1F2937', '#111827']
  },
  {
    id: 'brown',
    name: 'Brown',
    baseColors: ['#A52A2A', '#92400E', '#A16207', '#CA8A04', '#D97706', '#F59E0B', '#8B4513', '#78716C', '#57534E']
  }
];

// Generate shades for a hex color
function generateShades(hex, baseName, category) {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  const shades = [];
  
  // Generate lighter shades (tints)
  for (let i = 1; i <= 5; i++) {
    const factor = i * 0.15;
    const newR = Math.round(r + (255 - r) * factor);
    const newG = Math.round(g + (255 - g) * factor);
    const newB = Math.round(b + (255 - b) * factor);
    
    const newHex = ((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, '0').toUpperCase();
    shades.push({
      name: `${baseName} Light ${i}`,
      hex: `#${newHex}`,
      description: `Light variation of ${baseName}`
    });
  }
  
  // Generate darker shades
  for (let i = 1; i <= 5; i++) {
    const factor = 1 - (i * 0.15);
    const newR = Math.round(r * factor);
    const newG = Math.round(g * factor);
    const newB = Math.round(b * factor);
    
    const newHex = ((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, '0').toUpperCase();
    shades.push({
      name: `${baseName} Dark ${i}`,
      hex: `#${newHex}`,
      description: `Dark variation of ${baseName}`
    });
  }
  
  // Generate saturated variations
  for (let i = 1; i <= 3; i++) {
    const factor = 1 + (i * 0.1);
    let newR = Math.round(Math.min(255, r * factor));
    let newG = Math.round(Math.min(255, g * factor));
    let newB = Math.round(Math.min(255, b * factor));
    
    const newHex = ((newR << 16) | (newG << 8) | newB).toString(16).padStart(6, '0').toUpperCase();
    shades.push({
      name: `${baseName} Vibrant ${i}`,
      hex: `#${newHex}`,
      description: `Vibrant variation of ${baseName}`
    });
  }
  
  return shades;
}

// Create content directory if it doesn't exist
const contentDir = path.join(__dirname, '..', 'content', 'color-shades');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Remove existing files
const existingFiles = fs.readdirSync(contentDir);
existingFiles.forEach(file => {
  if (file.endsWith('.mdx')) {
    fs.unlinkSync(path.join(contentDir, file));
  }
});

let totalColors = 0;

// Generate MDX files for each category
colorCategories.forEach(category => {
  category.baseColors.forEach((baseHex, index) => {
    const colorName = `${category.name} ${index + 1}`;
    const slug = `${category.id}-${index + 1}`;
    const shades = generateShades(baseHex, colorName, category.id);
    
    totalColors += 1 + shades.length; // Base color + shades
    
    const mdxContent = `---
title: "${colorName}"
description: "Beautiful ${category.name.toLowerCase()} color with ${shades.length} variations"
category: "${category.id}"
baseHex: "${baseHex}"
hex: "${baseHex}"
featured: ${index === 0 ? 'true' : 'false'}
createdAt: "${new Date().toISOString()}"
tags: ["${category.id}", "shades", "palette"]
shades:
${shades.map(shade => `  - name: "${shade.name}"
    hex: "${shade.hex}"
    description: "${shade.description}"`).join('\n')}
---

# ${colorName}

This is a beautiful ${category.name.toLowerCase()} color with multiple shade variations. Perfect for creating harmonious color palettes in your design projects.

## Color Information

- **Base Hex**: ${baseHex}
- **Category**: ${category.name}
- **Variations**: ${shades.length} shades available

## Usage

This color works well for:
- UI design elements
- Brand color schemes  
- Background gradients
- Accent colors

Copy the CSS or Tailwind classes to use in your projects.
`;

    fs.writeFileSync(path.join(contentDir, `${slug}.mdx`), mdxContent);
  });
});

console.log(`Generated ${colorCategories.length * 9} MDX files with ${totalColors} total color variations`);
console.log(`Files created in: ${contentDir}`);
