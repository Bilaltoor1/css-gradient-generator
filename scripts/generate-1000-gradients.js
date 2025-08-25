const fs = require('fs');
const path = require('path');

// Gradient categories from your existing structure
const gradientCategories = [
  // Color-based categories
  'red', 'blue', 'green', 'purple', 'pink', 'yellow', 'orange', 'teal', 'indigo', 'gray',
  // Theme-based categories  
  'warm', 'cool', 'nature', 'luxury', 'vibrant', 'pastel', 'sunset', 'ocean', 'forest', 'neon',
  // Additional categories for variety
  'cosmic', 'metallic', 'earth', 'fire', 'ice', 'urban', 'retro', 'modern', 'dark', 'light'
];

// Color palettes for different moods and themes
const colorPalettes = {
  sunset: [
    ['#FF6B35', '#F7931E', '#FFD23F', '#EE4266'],
    ['#FF9A56', '#FF6B9D', '#C44569', '#F8B500'],
    ['#FF8A65', '#FF7043', '#FF5722', '#E64A19'],
    ['#FFB74D', '#FFA726', '#FF9800', '#F57C00'],
    ['#FFCC02', '#FF6F00', '#E65100', '#BF360C']
  ],
  ocean: [
    ['#1e3c72', '#2a5298', '#00b4db', '#0083b0'],
    ['#667db6', '#0082c8', '#0052d4', '#4facfe'],
    ['#43e97b', '#38f9d7', '#00d2ff', '#3a7bd5'],
    ['#89f7fe', '#66a6ff', '#667eea', '#764ba2'],
    ['#00c6ff', '#0072ff', '#2196F3', '#21CBF3']
  ],
  forest: [
    ['#134e5e', '#71b280', '#8fbc8f', '#98fb98'],
    ['#2d5016', '#3e7b27', '#4caf50', '#81c784'],
    ['#1b4332', '#2d6a4f', '#40916c', '#52b788'],
    ['#355c7d', '#6c5b7b', '#c06c84', '#f67280'],
    ['#0f3460', '#16537e', '#1a759f', '#168aad']
  ],
  cosmic: [
    ['#8360c3', '#2ebf91', '#4776e6', '#8e54e9'],
    ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140', '#6a11cb', '#2575fc'],
    ['#a8edea', '#fed6e3', '#ff9a9e', '#fecfef']
  ],
  luxury: [
    ['#8B0000', '#FFD700', '#C0C0C0', '#4B0082'],
    ['#2C3E50', '#FD746C', '#FF8235', '#FFB347'],
    ['#000000', '#434343', '#FFD700', '#FFA500'],
    ['#4B0082', '#8A2BE2', '#DDA0DD', '#E6E6FA'],
    ['#800020', '#B8860B', '#F4A460', '#DEB887']
  ],
  neon: [
    ['#00ff00', '#ff00ff', '#00ffff', '#ffff00'],
    ['#ff0080', '#8000ff', '#0080ff', '#80ff00'],
    ['#ff6600', '#ff0066', '#6600ff', '#0066ff'],
    ['#ff3300', '#33ff00', '#0033ff', '#ff0033'],
    ['#ff8800', '#88ff00', '#0088ff', '#8800ff']
  ],
  pastel: [
    ['#ffecd2', '#fcb69f', '#ff9a9e', '#fecfef'],
    ['#a8edea', '#fed6e3', '#ff9a9e', '#fad0c4'],
    ['#d299c2', '#fef9d7', '#efd5ff', '#515ada'],
    ['#fbc2eb', '#a6c1ee', '#c2e9fb', '#a1c4fd'],
    ['#fdbb2d', '#22c1c3', '#fdbb2d', '#3b82f6']
  ],
  warm: [
    ['#ff9a9e', '#fecfef', '#fecfef', '#ff9a9e'],
    ['#ff6b6b', '#feca57', '#48dbfb', '#0abde3'],
    ['#ff7675', '#fdcb6e', '#6c5ce7', '#a29bfe'],
    ['#fd79a8', '#fdcb6e', '#00b894', '#00cec9'],
    ['#e17055', '#fdcb6e', '#00b894', '#6c5ce7']
  ],
  cool: [
    ['#667eea', '#764ba2', '#89f7fe', '#66a6ff'],
    ['#a8edea', '#fed6e3', '#89f7fe', '#66a6ff'],
    ['#209cff', '#68e0cf', '#30cfd0', '#91a7ff'],
    ['#667db6', '#0082c8', '#0052d4', '#4facfe'],
    ['#74b9ff', '#0984e3', '#6c5ce7', '#a29bfe']
  ],
  vibrant: [
    ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5'],
    ['#f72585', '#b5179e', '#7209b7', '#480ca8'],
    ['#ff4081', '#e91e63', '#9c27b0', '#673ab7'],
    ['#ff5722', '#ff9800', '#ffc107', '#ffeb3b'],
    ['#f44336', '#e91e63', '#9c27b0', '#673ab7']
  ]
};

// Generate random variations of color palettes
function generateColorVariations(baseColors, count = 5) {
  const variations = [];
  
  for (let i = 0; i < count; i++) {
    const variation = baseColors.map(color => {
      // Add slight variations to each color
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      // Add random variation (-30 to +30)
      const newR = Math.max(0, Math.min(255, r + (Math.random() * 60 - 30)));
      const newG = Math.max(0, Math.min(255, g + (Math.random() * 60 - 30)));
      const newB = Math.max(0, Math.min(255, b + (Math.random() * 60 - 30)));
      
      return `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;
    });
    
    variations.push(variation);
  }
  
  return variations;
}

// Generate gradient angles and types
const gradientAngles = [0, 45, 90, 135, 180, 225, 270, 315];
const gradientTypes = ['linear', 'radial'];

// Generate descriptive names
const gradientNames = {
  sunset: ['Sunset Dream', 'Golden Hour', 'Twilight Sky', 'Dawn Break', 'Evening Glow', 'Amber Horizon', 'Fire Sky', 'Sunset Beach'],
  ocean: ['Ocean Breeze', 'Deep Sea', 'Coral Reef', 'Wave Crest', 'Marine Blue', 'Aqua Flow', 'Tidal Wave', 'Ocean Depth'],
  forest: ['Forest Canopy', 'Emerald Woods', 'Pine Grove', 'Jungle Mist', 'Moss Garden', 'Woodland Path', 'Fern Valley', 'Tree Line'],
  cosmic: ['Galaxy Dust', 'Nebula Cloud', 'Star Field', 'Cosmic Ray', 'Aurora Light', 'Space Dream', 'Planet Glow', 'Meteor Shower'],
  luxury: ['Royal Gold', 'Platinum Elite', 'Diamond Shine', 'Velvet Night', 'Crystal Clear', 'Golden Crown', 'Silver Lining', 'Ruby Red'],
  neon: ['Electric Pulse', 'Neon Lights', 'Cyber Glow', 'Digital Wave', 'Tech Flow', 'LED Strip', 'Laser Beam', 'Circuit Board'],
  pastel: ['Soft Dreams', 'Cotton Candy', 'Pastel Sky', 'Sweet Memory', 'Gentle Touch', 'Cloud Nine', 'Baby Blue', 'Rose Petal'],
  warm: ['Cozy Fire', 'Warm Embrace', 'Summer Day', 'Autumn Leaf', 'Golden Light', 'Campfire Glow', 'Sunny Morning', 'Heat Wave'],
  cool: ['Arctic Breeze', 'Ice Crystal', 'Cool Mint', 'Winter Sky', 'Frozen Lake', 'Snow Peak', 'Glacier Blue', 'Frost Line'],
  vibrant: ['Energy Burst', 'Color Splash', 'Electric Mix', 'Rainbow Bright', 'Vivid Dream', 'Bold Strike', 'Power Surge', 'Intense Glow']
};

// Create content directory if it doesn't exist
const contentDir = path.join(__dirname, '..', 'content', 'gradients');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

let totalGradients = 0;
let gradientId = 1;

// Generate gradients for each category
gradientCategories.forEach(category => {
  const categoryPalettes = colorPalettes[category] || colorPalettes.vibrant;
  const categoryNames = gradientNames[category] || gradientNames.vibrant;
  
  // Generate multiple variations for each palette
  categoryPalettes.forEach((basePalette, paletteIndex) => {
    // Reduced variations for reasonable total count
    const variations = generateColorVariations(basePalette, 2);
    
    variations.forEach((colors, variationIndex) => {
      // Create different gradient configurations (reduced)
      const configs = [
        { stops: 2, angle: gradientAngles[Math.floor(Math.random() * gradientAngles.length)] },
        { stops: 3, angle: gradientAngles[Math.floor(Math.random() * gradientAngles.length)] },
        { stops: 4, angle: gradientAngles[Math.floor(Math.random() * gradientAngles.length)] }
      ];
      
      configs.forEach((config, configIndex) => {
        const selectedColors = colors.slice(0, config.stops);
        const gradientType = gradientTypes[Math.floor(Math.random() * gradientTypes.length)];
        
        // Build CSS gradient
        let cssGradient;
        if (gradientType === 'radial') {
          cssGradient = `radial-gradient(circle, ${selectedColors.join(', ')})`;
        } else {
          cssGradient = `linear-gradient(${config.angle}deg, ${selectedColors.join(', ')})`;
        }
        
        // Generate name
        const baseName = categoryNames[paletteIndex % categoryNames.length];
        const nameVariation = ['Pro', 'Elite', 'Premium', 'Classic', 'Modern', 'Vintage', 'Bold', 'Soft'][variationIndex];
        const gradientName = `${baseName} ${nameVariation} ${config.stops}`;
        
        // Create slug
        const slug = `${category}-${gradientId.toString().padStart(4, '0')}`;
        
        // Generate description
        const descriptions = [
          `A stunning ${config.stops}-color ${gradientType} gradient perfect for modern designs`,
          `Eye-catching ${category} gradient with ${config.stops} beautiful color stops`,
          `Professional ${gradientType} gradient featuring ${config.stops} harmonious colors`,
          `Vibrant ${category}-themed gradient ideal for creative projects`,
          `Elegant ${config.stops}-stop gradient with a ${config.angle}° angle`
        ];
        const description = descriptions[Math.floor(Math.random() * descriptions.length)];
        
        // Create MDX content
        const mdxContent = `---
id: "${slug}"
title: "${gradientName}"
description: "${description}"
category: "${category}"
tags: ["${category}", "${gradientType}", "${config.stops}-stop", "gradient", "modern"]
colors: ${JSON.stringify(selectedColors)}
cssGradient: "${cssGradient}"
featured: ${totalGradients < 20 ? 'true' : 'false'}
createdAt: "${new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()}"
previewImage: "/gradients/${slug}.jpg"
keywords: "${category} gradient, ${gradientType} gradient, CSS gradient, ${config.stops} colors"
author: "Gradient Generator"
stops:
${selectedColors.map((color, index) => `  - color: "${color}"
    position: ${Math.round((index / (selectedColors.length - 1)) * 100)}`).join('\n')}
---

# ${gradientName}

${description}. This ${gradientType} gradient combines ${config.stops} carefully selected colors to create a visually stunning effect.

## Color Information

${selectedColors.map((color, index) => `- **Color ${index + 1}** (${color}) - Position ${Math.round((index / (selectedColors.length - 1)) * 100)}%`).join('\n')}

## Technical Details

- **Type**: ${gradientType.charAt(0).toUpperCase() + gradientType.slice(1)} gradient
- **Angle**: ${config.angle}°
- **Color Stops**: ${config.stops}
- **Category**: ${category.charAt(0).toUpperCase() + category.slice(1)}

## CSS Implementation

\`\`\`css
background: ${cssGradient};
\`\`\`

## Perfect For

- Modern web designs
- App backgrounds
- UI elements
- Branding materials
- Creative projects
- ${category.charAt(0).toUpperCase() + category.slice(1)}-themed designs
`;

        // Write the MDX file
        fs.writeFileSync(path.join(contentDir, `${slug}.mdx`), mdxContent);
        
        totalGradients++;
        gradientId++;
        
        // Log progress every 100 gradients
        if (totalGradients % 100 === 0) {
          console.log(`Generated ${totalGradients} gradients...`);
        }
      });
    });
  });
});

console.log(`\n🎨 Successfully generated ${totalGradients} eye-catching gradients!`);
console.log(`📁 Files created in: ${contentDir}`);
console.log(`📊 Categories: ${gradientCategories.length}`);
console.log(`🎯 Average per category: ${Math.round(totalGradients / gradientCategories.length)}`);
console.log(`✨ Featured gradients: ${Math.min(20, totalGradients)}`);
