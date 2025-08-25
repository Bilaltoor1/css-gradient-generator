const fs = require('fs');
const path = require('path');

// All categories as defined in the data/categories.js file
const categories = [
  'red', 'blue', 'green', 'purple', 'pink', 'yellow', 'orange', 'teal', 'indigo', 'gray',
  'warm', 'cool', 'nature', 'luxury', 'vibrant', 'pastel', 'sunset', 'ocean', 'forest', 'neon',
  'cosmic', 'metallic', 'earth', 'fire', 'ice', 'urban', 'retro', 'modern', 'dark', 'light'
];

// Total gradients = 1200, distributed across 30 categories = 40 gradients per category
const TOTAL_GRADIENTS = 1200;
const GRADIENTS_PER_CATEGORY = TOTAL_GRADIENTS / categories.length; // 40 per category

// Comprehensive color palettes for each category
const categoryColorPalettes = {
  // Color-based categories
  red: [
    ['#FF0000', '#FF4444', '#FF6B6B', '#FF8A80'],
    ['#DC143C', '#FF1744', '#F44336', '#E57373'],
    ['#B71C1C', '#C62828', '#D32F2F', '#F44336'],
    ['#FF5252', '#FF1744', '#D50000', '#FF8A80'],
    ['#E91E63', '#F50057', '#C2185B', '#AD1457']
  ],
  blue: [
    ['#0066CC', '#2196F3', '#64B5F6', '#90CAF9'],
    ['#1976D2', '#1E88E5', '#2196F3', '#42A5F5'],
    ['#0D47A1', '#1565C0', '#1976D2', '#1E88E5'],
    ['#2962FF', '#448AFF', '#82B1FF', '#B3E5FC'],
    ['#00BCD4', '#26C6DA', '#4DD0E1', '#80DEEA']
  ],
  green: [
    ['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7'],
    ['#388E3C', '#43A047', '#4CAF50', '#66BB6A'],
    ['#1B5E20', '#2E7D32', '#388E3C', '#43A047'],
    ['#00E676', '#1DE9B6', '#64DD17', '#76FF03'],
    ['#009688', '#26A69A', '#4DB6AC', '#80CBC4']
  ],
  purple: [
    ['#9C27B0', '#AB47BC', '#BA68C8', '#CE93D8'],
    ['#7B1FA2', '#8E24AA', '#9C27B0', '#AB47BC'],
    ['#4A148C', '#6A1B9A', '#7B1FA2', '#8E24AA'],
    ['#E040FB', '#D500F9', '#AA00FF', '#9C27B0'],
    ['#673AB7', '#7986CB', '#9575CD', '#B39DDB']
  ],
  pink: [
    ['#E91E63', '#EC407A', '#F06292', '#F48FB1'],
    ['#C2185B', '#D81B60', '#E91E63', '#EC407A'],
    ['#880E4F', '#AD1457', '#C2185B', '#D81B60'],
    ['#FF4081', '#F50057', '#E91E63', '#FF80AB'],
    ['#FF6EC7', '#FF4081', '#F50057', '#FFB2DD']
  ],
  yellow: [
    ['#FFEB3B', '#FFEE58', '#FFF176', '#FFF59D'],
    ['#FBC02D', '#F9A825', '#F57F17', '#FF8F00'],
    ['#FFD600', '#FFAB00', '#FF6F00', '#FFA726'],
    ['#FFFF00', '#FFEB3B', '#FDD835', '#FBC02D'],
    ['#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F']
  ],
  orange: [
    ['#FF9800', '#FFB74D', '#FFCC02', '#FFE0B2'],
    ['#F57C00', '#FB8C00', '#FF9800', '#FFB74D'],
    ['#E65100', '#EF6C00', '#F57C00', '#FB8C00'],
    ['#FF6D00', '#FF8F00', '#FF9100', '#FFAB00'],
    ['#FF3D00', '#DD2C00', '#BF360C', '#FF5722']
  ],
  teal: [
    ['#009688', '#26A69A', '#4DB6AC', '#80CBC4'],
    ['#00695C', '#00796B', '#00897B', '#009688'],
    ['#004D40', '#00695C', '#00796B', '#00897B'],
    ['#1DE9B6', '#64FFDA', '#A7FFEB', '#B2DFDB'],
    ['#00BCD4', '#00ACC1', '#0097A7', '#00838F']
  ],
  indigo: [
    ['#3F51B5', '#5C6BC0', '#7986CB', '#9FA8DA'],
    ['#303F9F', '#3949AB', '#3F51B5', '#5C6BC0'],
    ['#1A237E', '#283593', '#303F9F', '#3949AB'],
    ['#536DFE', '#448AFF', '#40C4FF', '#18FFFF'],
    ['#6200EA', '#651FFF', '#3D5AFE', '#2979FF']
  ],
  gray: [
    ['#9E9E9E', '#BDBDBD', '#E0E0E0', '#F5F5F5'],
    ['#616161', '#757575', '#9E9E9E', '#BDBDBD'],
    ['#212121', '#424242', '#616161', '#757575'],
    ['#FAFAFA', '#F5F5F5', '#EEEEEE', '#E0E0E0'],
    ['#37474F', '#455A64', '#546E7A', '#607D8B']
  ],

  // Theme-based categories
  warm: [
    ['#FF6B35', '#F7931E', '#FFD23F', '#FF8E53'],
    ['#FF4500', '#FF6347', '#FF7F50', '#FFA07A'],
    ['#DC143C', '#B22222', '#CD5C5C', '#F08080'],
    ['#FF8C00', '#FFA500', '#FFB347', '#FFCCCB'],
    ['#D2691E', '#CD853F', '#DEB887', '#F5DEB3']
  ],
  cool: [
    ['#4169E1', '#6495ED', '#87CEEB', '#B0E0E6'],
    ['#00CED1', '#48D1CC', '#40E0D0', '#AFEEEE'],
    ['#4682B4', '#5F9EA0', '#708090', '#778899'],
    ['#483D8B', '#6A5ACD', '#7B68EE', '#9370DB'],
    ['#191970', '#000080', '#00008B', '#0000CD']
  ],
  nature: [
    ['#228B22', '#32CD32', '#9ACD32', '#ADFF2F'],
    ['#006400', '#008000', '#00FF00', '#7CFC00'],
    ['#2E8B57', '#3CB371', '#90EE90', '#98FB98'],
    ['#8FBC8F', '#20B2AA', '#87CEEB', '#6495ED'],
    ['#8B4513', '#A0522D', '#CD853F', '#DEB887']
  ],
  luxury: [
    ['#FFD700', '#FFA500', '#B8860B', '#DAA520'],
    ['#800080', '#4B0082', '#8B008B', '#9400D3'],
    ['#000000', '#2F4F4F', '#696969', '#708090'],
    ['#C0C0C0', '#D3D3D3', '#DCDCDC', '#F5F5F5'],
    ['#8B0000', '#B22222', '#DC143C', '#FF0000']
  ],
  vibrant: [
    ['#FF1493', '#FF69B4', '#FF6347', '#FF4500'],
    ['#00FF00', '#32CD32', '#00CED1', '#FF1493'],
    ['#8A2BE2', '#9400D3', '#FF00FF', '#FF1493'],
    ['#FF8C00', '#FF6347', '#FF4500', '#FF0000'],
    ['#00BFFF', '#1E90FF', '#0000FF', '#8A2BE2']
  ],
  pastel: [
    ['#FFB6C1', '#FFC0CB', '#FFCCCB', '#FFE4E1'],
    ['#E0E6FF', '#B0C4DE', '#87CEEB', '#E6E6FA'],
    ['#F0FFF0', '#F5FFFA', '#F0F8FF', '#E0FFFF'],
    ['#FFF8DC', '#FFFFE0', '#FFFFF0', '#FFFAF0'],
    ['#FFE4E1', '#FFEFD5', '#FDF5E6', '#FAF0E6']
  ],
  sunset: [
    ['#FF4500', '#FF6347', '#FF7F50', '#FFA07A'],
    ['#FF69B4', '#FF1493', '#DC143C', '#B22222'],
    ['#FFD700', '#FFA500', '#FF8C00', '#FF4500'],
    ['#FF0000', '#FF4500', '#FFA500', '#FFD700'],
    ['#8B0000', '#DC143C', '#FF1493', '#FF69B4']
  ],
  ocean: [
    ['#006994', '#13547a', '#80daeb', '#b8f2ff'],
    ['#0077be', '#0099cc', '#33ccff', '#66d9ff'],
    ['#004d7a', '#008bb3', '#0db4d6', '#7dd3fc'],
    ['#003f5c', '#2f4b7c', '#665191', '#a05195'],
    ['#1e3a8a', '#1e40af', '#2563eb', '#3b82f6']
  ],
  forest: [
    ['#013220', '#355e3b', '#4f7942', '#8fbc8f'],
    ['#2d5016', '#3a5f0b', '#4f7c0b', '#66a61e'],
    ['#0b6623', '#228b22', '#32cd32', '#9acd32'],
    ['#1e4d2b', '#2e8b57', '#3cb371', '#90ee90'],
    ['#004225', '#2d5545', '#5e8b73', '#8fbc8f']
  ],
  neon: [
    ['#ff0080', '#ff8c00', '#00ff80', '#8000ff'],
    ['#00ffff', '#ff1493', '#00ff00', '#ff4500'],
    ['#ff6600', '#ff0066', '#6600ff', '#00ff66'],
    ['#ff3300', '#33ff00', '#0033ff', '#ff0033'],
    ['#ff9900', '#9900ff', '#0099ff', '#99ff00']
  ],
  cosmic: [
    ['#4c0080', '#8000ff', '#ff0080', '#ff8000'],
    ['#000080', '#4000ff', '#8000ff', '#ff0040'],
    ['#200040', '#400080', '#8000ff', '#ff4080'],
    ['#663399', '#9933cc', '#cc33ff', '#ff33cc'],
    ['#1a1a2e', '#16213e', '#0f3460', '#e94560']
  ],
  metallic: [
    ['#c0c0c0', '#d3d3d3', '#dcdcdc', '#f5f5f5'],
    ['#708090', '#778899', '#b0c4de', '#d3d3d3'],
    ['#2f4f4f', '#696969', '#808080', '#a9a9a9'],
    ['#ffd700', '#ffff00', '#f0e68c', '#f5deb3'],
    ['#cd7f32', '#daa520', '#b8860b', '#ffd700']
  ],
  earth: [
    ['#8b4513', '#a0522d', '#cd853f', '#deb887'],
    ['#d2691e', '#peru', '#f4a460', '#deb887'],
    ['#8fbc8f', '#9acd32', '#32cd32', '#228b22'],
    ['#2e8b57', '#3cb371', '#90ee90', '#98fb98'],
    ['#556b2f', '#6b8e23', '#9acd32', '#adff2f']
  ],
  fire: [
    ['#ff0000', '#ff4500', '#ffa500', '#ffd700'],
    ['#dc143c', '#b22222', '#cd5c5c', '#f08080'],
    ['#8b0000', '#dc143c', '#ff1493', '#ff69b4'],
    ['#ff6347', '#ff7f50', '#ffa07a', '#ffb6c1'],
    ['#ff4500', '#ff6347', '#ff8c00', '#ffa500']
  ],
  ice: [
    ['#b0e0e6', '#add8e6', '#87ceeb', '#87cefa'],
    ['#e0ffff', '#f0f8ff', '#f5fffa', '#ffffff'],
    ['#afeeee', '#b0e0e6', '#87ceeb', '#87cefa'],
    ['#4682b4', '#5f9ea0', '#87ceeb', '#b0e0e6'],
    ['#00bfff', '#87ceeb', '#87cefa', '#e0f6ff']
  ],
  urban: [
    ['#2f4f4f', '#696969', '#808080', '#a9a9a9'],
    ['#191970', '#483d8b', '#6a5acd', '#7b68ee'],
    ['#000000', '#2f2f2f', '#5f5f5f', '#8f8f8f'],
    ['#36454f', '#555555', '#777777', '#999999'],
    ['#1c1c1c', '#3a3a3a', '#5a5a5a', '#7a7a7a']
  ],
  retro: [
    ['#ff6b35', '#f7931e', '#ffd23f', '#ee4266'],
    ['#ff9a56', '#ff6b9d', '#c44569', '#f8b500'],
    ['#d4a574', '#b8860b', '#daa520', '#ffd700'],
    ['#8b4513', '#a0522d', '#cd853f', '#deb887'],
    ['#dc143c', '#b22222', '#cd5c5c', '#f08080']
  ],
  modern: [
    ['#1f2937', '#374151', '#4b5563', '#6b7280'],
    ['#111827', '#1f2937', '#374151', '#4b5563'],
    ['#000000', '#1a1a1a', '#333333', '#666666'],
    ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db'],
    ['#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0']
  ],
  dark: [
    ['#000000', '#1a1a1a', '#333333', '#4d4d4d'],
    ['#111827', '#1f2937', '#374151', '#4b5563'],
    ['#0f172a', '#1e293b', '#334155', '#475569'],
    ['#18181b', '#27272a', '#3f3f46', '#52525b'],
    ['#141414', '#1c1c1c', '#262626', '#404040']
  ],
  light: [
    ['#ffffff', '#fafafa', '#f5f5f5', '#f0f0f0'],
    ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db'],
    ['#fefefe', '#fdfdfd', '#fbfbfb', '#f8f8f8'],
    ['#fffbf0', '#fef7e0', '#fef3c7', '#fde68a'],
    ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc']
  ]
};

// Gradient angles for variety
const angles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
const gradientTypes = ['linear', 'radial'];

// Color variations generator
function generateColorVariations(baseColors, count = 8) {
  const variations = [];
  
  for (let i = 0; i < count; i++) {
    const variation = baseColors.map(color => {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      // Add controlled variation
      const variance = 25;
      const newR = Math.max(0, Math.min(255, r + (Math.random() * variance - variance/2)));
      const newG = Math.max(0, Math.min(255, g + (Math.random() * variance - variance/2)));
      const newB = Math.max(0, Math.min(255, b + (Math.random() * variance - variance/2)));
      
      return `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;
    });
    
    variations.push(variation);
  }
  
  return variations;
}

// Name generators for each category
const categoryNames = {
  red: ['Crimson', 'Scarlet', 'Ruby', 'Cherry', 'Rose', 'Coral', 'Burgundy', 'Maroon'],
  blue: ['Azure', 'Sapphire', 'Cobalt', 'Navy', 'Cerulean', 'Indigo', 'Royal', 'Ocean'],
  green: ['Emerald', 'Forest', 'Jade', 'Mint', 'Lime', 'Sage', 'Olive', 'Pine'],
  purple: ['Violet', 'Lavender', 'Amethyst', 'Plum', 'Orchid', 'Magenta', 'Royal', 'Grape'],
  pink: ['Rose', 'Blush', 'Coral', 'Salmon', 'Fuchsia', 'Magenta', 'Hot', 'Soft'],
  yellow: ['Golden', 'Lemon', 'Amber', 'Sunshine', 'Canary', 'Butter', 'Honey', 'Bright'],
  orange: ['Tangerine', 'Peach', 'Amber', 'Sunset', 'Coral', 'Apricot', 'Flame', 'Bright'],
  teal: ['Turquoise', 'Aqua', 'Cyan', 'Sea', 'Mint', 'Jade', 'Caribbean', 'Crystal'],
  indigo: ['Deep', 'Royal', 'Midnight', 'Electric', 'Violet', 'Navy', 'Cosmic', 'Mystic'],
  gray: ['Silver', 'Charcoal', 'Steel', 'Smoke', 'Slate', 'Ash', 'Storm', 'Modern'],
  warm: ['Cozy', 'Autumn', 'Sunset', 'Fire', 'Ember', 'Spice', 'Toast', 'Golden'],
  cool: ['Arctic', 'Frost', 'Ice', 'Ocean', 'Winter', 'Crystal', 'Breeze', 'Chill'],
  nature: ['Forest', 'Garden', 'Earth', 'Leaf', 'Mountain', 'River', 'Field', 'Tree'],
  luxury: ['Gold', 'Platinum', 'Diamond', 'Elite', 'Premium', 'Royal', 'Rich', 'Noble'],
  vibrant: ['Electric', 'Neon', 'Bright', 'Bold', 'Vivid', 'Intense', 'Dynamic', 'Energy'],
  pastel: ['Soft', 'Gentle', 'Sweet', 'Tender', 'Dreamy', 'Light', 'Delicate', 'Whisper'],
  sunset: ['Evening', 'Dusk', 'Twilight', 'Golden', 'Horizon', 'Amber', 'Warm', 'Glow'],
  ocean: ['Wave', 'Deep', 'Tide', 'Surf', 'Marine', 'Aquatic', 'Blue', 'Flow'],
  forest: ['Woods', 'Grove', 'Pine', 'Moss', 'Fern', 'Canopy', 'Wild', 'Natural'],
  neon: ['Electric', 'Cyber', 'Glow', 'Neon', 'Bright', 'Flash', 'Digital', 'Future'],
  cosmic: ['Galaxy', 'Nebula', 'Star', 'Space', 'Universe', 'Cosmic', 'Astral', 'Celestial'],
  metallic: ['Chrome', 'Steel', 'Silver', 'Copper', 'Bronze', 'Platinum', 'Metal', 'Shine'],
  earth: ['Clay', 'Soil', 'Rock', 'Stone', 'Desert', 'Canyon', 'Mesa', 'Terra'],
  fire: ['Flame', 'Blaze', 'Ember', 'Spark', 'Heat', 'Burn', 'Lava', 'Inferno'],
  ice: ['Frost', 'Glacier', 'Crystal', 'Snow', 'Arctic', 'Frozen', 'Chill', 'Winter'],
  urban: ['City', 'Metro', 'Street', 'Concrete', 'Steel', 'Modern', 'Industrial', 'Urban'],
  retro: ['Vintage', 'Classic', 'Retro', 'Nostalgic', 'Old', 'Timeless', 'Antique', 'Heritage'],
  modern: ['Clean', 'Minimal', 'Sleek', 'Contemporary', 'Fresh', 'Simple', 'Pure', 'Crisp'],
  dark: ['Shadow', 'Night', 'Dark', 'Deep', 'Black', 'Noir', 'Midnight', 'Void'],
  light: ['Bright', 'Pure', 'Clean', 'White', 'Radiant', 'Luminous', 'Glowing', 'Clear']
};

// Create content directory
const contentDir = path.join(__dirname, '..', 'content', 'gradients');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

console.log(`🎨 Generating ${TOTAL_GRADIENTS} comprehensive gradients across ${categories.length} categories...`);
console.log(`📊 Each category will have ${GRADIENTS_PER_CATEGORY} gradients`);

let totalGradients = 0;
let gradientId = 1;

categories.forEach((category, categoryIndex) => {
  console.log(`\n🎯 Generating ${category.toUpperCase()} gradients...`);
  
  const palettes = categoryColorPalettes[category];
  const names = categoryNames[category];
  let categoryGradients = 0;

  palettes.forEach((basePalette, paletteIndex) => {
    if (categoryGradients >= GRADIENTS_PER_CATEGORY) return;
    
    const variations = generateColorVariations(basePalette, 8);
    
    variations.forEach((colors, variationIndex) => {
      if (categoryGradients >= GRADIENTS_PER_CATEGORY) return;
      
      // Create gradients with 2-6 stops for optimal Tailwind support
      const stopConfigs = [
        { stops: 2, weight: 3 }, // More 2-stop gradients
        { stops: 3, weight: 3 }, // More 3-stop gradients  
        { stops: 4, weight: 2 }, // Some 4-stop gradients
        { stops: 5, weight: 1 }, // Few 5-stop gradients
        { stops: 6, weight: 1 }  // Few 6-stop gradients
      ];

      stopConfigs.forEach((config, configIndex) => {
        // Create multiple gradients per config based on weight
        for (let w = 0; w < config.weight; w++) {
          if (categoryGradients >= GRADIENTS_PER_CATEGORY) return;
          
          const selectedColors = colors.slice(0, config.stops);
          const gradientType = gradientTypes[Math.floor(Math.random() * gradientTypes.length)];
          const angle = angles[Math.floor(Math.random() * angles.length)];
          
          // Build CSS gradient
          let cssGradient;
          if (gradientType === 'radial') {
            cssGradient = `radial-gradient(circle, ${selectedColors.join(', ')})`;
          } else {
            cssGradient = `linear-gradient(${angle}deg, ${selectedColors.join(', ')})`;
          }
          
          // Generate name
          const baseName = names[paletteIndex % names.length];
          const nameVariations = ['Pro', 'Elite', 'Modern', 'Classic', 'Bold', 'Soft', 'Deep', 'Bright'];
          const nameVariation = nameVariations[(variationIndex + w) % nameVariations.length];
          const gradientName = `${baseName} ${nameVariation}`;
          
          // Create slug
          const slug = `${category}-${gradientId.toString().padStart(4, '0')}`;
          
          // Generate description
          const descriptions = [
            `A stunning ${config.stops}-color ${gradientType} gradient with beautiful ${category} tones`,
            `Eye-catching ${category} gradient featuring ${config.stops} harmonious colors`,
            `${gradientType.charAt(0).toUpperCase() + gradientType.slice(1)} gradient perfect for ${category}-themed designs`,
            `Beautiful ${config.stops}-stop gradient with rich ${category} color palette`,
            `Modern ${category} gradient with ${config.stops} carefully selected colors`
          ];
          const description = descriptions[Math.floor(Math.random() * descriptions.length)];
          
          // Tags
          const tags = [category, gradientType, `${config.stops}-stop`, 'modern', 'beautiful', 'design'];
          
          // Create MDX content
          const mdxContent = `---
id: "${slug}"
title: "${gradientName}"
description: "${description}"
category: "${category}"
tags: ${JSON.stringify(tags)}
colors: ${JSON.stringify(selectedColors)}
cssGradient: "${cssGradient}"
featured: ${totalGradients < 30 ? 'true' : 'false'}
createdAt: "${new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString()}"
updatedAt: "${new Date().toISOString()}"
author: "Gradient Generator"
keywords: "${category} gradient, ${gradientType} gradient, ${config.stops} colors, CSS gradient, design, ${selectedColors.join(', ')}"
---

# ${gradientName}

${description}

## Colors Used
${selectedColors.map((color, index) => `- **Color ${index + 1}**: ${color}`).join('\n')}

## Technical Details
- **Type**: ${gradientType.charAt(0).toUpperCase() + gradientType.slice(1)} Gradient
- **Angle**: ${gradientType === 'linear' ? angle + '°' : 'N/A (Radial)'}
- **Color Stops**: ${config.stops}
- **Category**: ${category.charAt(0).toUpperCase() + category.slice(1)}

## CSS Implementation
\`\`\`css
background: ${cssGradient};
\`\`\`

Perfect for modern web design, UI components, and digital art projects.
`;

          // Write file
          const fileName = `${slug}.mdx`;
          const filePath = path.join(contentDir, fileName);
          
          try {
            fs.writeFileSync(filePath, mdxContent);
            gradientId++;
            categoryGradients++;
            totalGradients++;
            
            if (totalGradients % 100 === 0) {
              console.log(`✅ Generated ${totalGradients} gradients...`);
            }
          } catch (error) {
            console.error(`❌ Error writing ${fileName}:`, error.message);
          }
        }
      });
    });
  });
  
  console.log(`✅ ${category.toUpperCase()}: ${categoryGradients} gradients created`);
});

console.log(`\n🎉 Successfully generated ${totalGradients} comprehensive gradients!`);
console.log(`📁 All gradients saved in: ${contentDir}`);
console.log(`📊 Distribution: ${GRADIENTS_PER_CATEGORY} gradients per category across ${categories.length} categories`);
