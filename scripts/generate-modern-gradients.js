const fs = require('fs');
const path = require('path');

// Modern gradient categories focused on sleek, juicy, vibrant, eye-catching designs
const modernCategories = [
  'neon', 'vibrant', 'sunset', 'ocean', 'cosmic', 'luxury', 'pastel', 
  'warm', 'cool', 'electric', 'dreamy', 'bold', 'fresh', 'dark', 'light'
];

// Modern, sleek, juicy, vibrant color palettes
const modernColorPalettes = {
  neon: [
    ['#ff0080', '#ff8c00', '#00ff80', '#8000ff'],
    ['#00ffff', '#ff1493', '#00ff00', '#ff4500'],
    ['#ff6600', '#ff0066', '#6600ff', '#00ff66'],
    ['#ff3300', '#33ff00', '#0033ff', '#ff0033'],
    ['#ff9900', '#9900ff', '#0099ff', '#99ff00']
  ],
  vibrant: [
    ['#ff006e', '#8338ec', '#3a86ff', '#06ffa5'],
    ['#f72585', '#b5179e', '#7209b7', '#480ca8'],
    ['#ff4081', '#e91e63', '#9c27b0', '#673ab7'],
    ['#ff5722', '#ff9800', '#ffc107', '#4caf50'],
    ['#e91e63', '#9c27b0', '#3f51b5', '#2196f3']
  ],
  sunset: [
    ['#ff6b35', '#f7931e', '#ffd23f', '#ee4266'],
    ['#ff9a56', '#ff6b9d', '#c44569', '#f8b500'],
    ['#ff8a65', '#ff7043', '#ff5722', '#e64a19'],
    ['#ffb74d', '#ffa726', '#ff9800', '#f57c00'],
    ['#ff7f50', '#ff6347', '#ff4500', '#ff1493']
  ],
  ocean: [
    ['#667eea', '#764ba2', '#89f7fe', '#66a6ff'],
    ['#43e97b', '#38f9d7', '#00d2ff', '#3a7bd5'],
    ['#209cff', '#68e0cf', '#30cfd0', '#91a7ff'],
    ['#667db6', '#0082c8', '#0052d4', '#4facfe'],
    ['#74b9ff', '#0984e3', '#6c5ce7', '#a29bfe']
  ],
  cosmic: [
    ['#8360c3', '#2ebf91', '#4776e6', '#8e54e9'],
    ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140', '#6a11cb', '#2575fc'],
    ['#a8edea', '#fed6e3', '#ff9a9e', '#fecfef']
  ],
  luxury: [
    ['#000000', '#ffd700', '#c0c0c0', '#4b0082'],
    ['#2c3e50', '#fd746c', '#ff8235', '#ffb347'],
    ['#1a1a2e', '#16213e', '#0f3460', '#e94560'],
    ['#8b0000', '#ffd700', '#c0c0c0', '#4b0082'],
    ['#191970', '#483d8b', '#9370db', '#dda0dd']
  ],
  pastel: [
    ['#ffecd2', '#fcb69f', '#ff9a9e', '#fecfef'],
    ['#a8edea', '#fed6e3', '#ff9a9e', '#fad0c4'],
    ['#d299c2', '#fef9d7', '#efd5ff', '#515ada'],
    ['#fbc2eb', '#a6c1ee', '#c2e9fb', '#a1c4fd'],
    ['#ffcccc', '#ffb3d9', '#d9b3ff', '#b3d9ff']
  ],
  electric: [
    ['#00f5ff', '#ff00f5', '#f5ff00', '#5f00ff'],
    ['#ff0099', '#9900ff', '#0099ff', '#99ff00'],
    ['#ff3366', '#3366ff', '#66ff33', '#33ff66'],
    ['#ff6600', '#6600ff', '#00ff66', '#66ff00'],
    ['#ff0040', '#4000ff', '#0040ff', '#40ff00']
  ],
  dreamy: [
    ['#ffeaa7', '#fab1a0', '#fd79a8', '#fdcb6e'],
    ['#a29bfe', '#6c5ce7', '#fd79a8', '#fdcb6e'],
    ['#74b9ff', '#0984e3', '#00cec9', '#00b894'],
    ['#ff7675', '#fd79a8', '#fdcb6e', '#ffeaa7'],
    ['#81ecec', '#74b9ff', '#a29bfe', '#fd79a8']
  ],
  bold: [
    ['#ff1744', '#ff9100', '#ffea00', '#76ff03'],
    ['#e91e63', '#ff5722', '#ff9800', '#4caf50'],
    ['#9c27b0', '#3f51b5', '#2196f3', '#00bcd4'],
    ['#f44336', '#ff5722', '#ff9800', '#ffeb3b'],
    ['#673ab7', '#3f51b5', '#2196f3', '#03dac6']
  ],
  fresh: [
    ['#00e676', '#00bcd4', '#40c4ff', '#448aff'],
    ['#64dd17', '#00e5ff', '#18ffff', '#64ffda'],
    ['#76ff03', '#00e676', '#00bcd4', '#40c4ff'],
    ['#c6ff00', '#76ff03', '#00e676', '#00bcd4'],
    ['#aeea00', '#66bb6a', '#26a69a', '#42a5f5']
  ],
  warm: [
    ['#ff9a8b', '#a8e6cf', '#ffd3a5', '#fd9853'],
    ['#ff8a80', '#ffab91', '#ffcc80', '#ffe082'],
    ['#ffb74d', '#ffa726', '#ff9800', '#ff8f00'],
    ['#ff7043', '#ff5722', '#f4511e', '#e64a19'],
    ['#ffcc02', '#ff6f00', '#e65100', '#bf360c']
  ],
  cool: [
    ['#667eea', '#764ba2', '#89f7fe', '#66a6ff'],
    ['#209cff', '#68e0cf', '#30cfd0', '#91a7ff'],
    ['#667db6', '#0082c8', '#0052d4', '#4facfe'],
    ['#74b9ff', '#0984e3', '#6c5ce7', '#a29bfe'],
    ['#81ecec', '#74b9ff', '#a29bfe', '#fd79a8']
  ],
  dark: [
    ['#000000', '#434343', '#868686', '#ffffff'],
    ['#2c3e50', '#34495e', '#7f8c8d', '#95a5a6'],
    ['#1a1a2e', '#16213e', '#0f3460', '#e94560'],
    ['#191970', '#483d8b', '#9370db', '#dda0dd'],
    ['#0f0f23', '#2d1b69', '#7209b7', '#a663cc']
  ],
  light: [
    ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6'],
    ['#fefefe', '#fdfdfd', '#fcfcfc', '#fbfbfb'],
    ['#f5f5f5', '#eeeeee', '#e0e0e0', '#bdbdbd'],
    ['#fafafa', '#f5f5f5', '#eeeeee', '#e0e0e0'],
    ['#ffffff', '#f7f7f7', '#efefef', '#e7e7e7']
  ]
};

// Modern gradient names
const modernGradientNames = {
  neon: ['Electric Pulse', 'Neon Dreams', 'Cyber Glow', 'Digital Wave', 'Tech Flow', 'LED Burst', 'Laser Beam', 'Circuit Glow'],
  vibrant: ['Energy Burst', 'Color Splash', 'Electric Mix', 'Rainbow Bright', 'Vivid Dream', 'Bold Strike', 'Power Surge', 'Intense Glow'],
  sunset: ['Golden Hour', 'Sunset Dreams', 'Twilight Glow', 'Dawn Break', 'Evening Fire', 'Amber Sky', 'Fire Horizon', 'Sunset Beach'],
  ocean: ['Ocean Breeze', 'Deep Sea', 'Wave Crest', 'Marine Flow', 'Aqua Dreams', 'Tidal Wave', 'Ocean Depth', 'Blue Horizon'],
  cosmic: ['Galaxy Dust', 'Nebula Cloud', 'Star Field', 'Cosmic Ray', 'Aurora Light', 'Space Dream', 'Planet Glow', 'Meteor Shower'],
  luxury: ['Royal Gold', 'Platinum Elite', 'Diamond Shine', 'Velvet Night', 'Crystal Clear', 'Golden Crown', 'Silver Lining', 'Ruby Glow'],
  pastel: ['Soft Dreams', 'Cotton Candy', 'Pastel Sky', 'Sweet Memory', 'Gentle Touch', 'Cloud Nine', 'Baby Blue', 'Rose Petal'],
  electric: ['Lightning Strike', 'Electric Storm', 'Power Grid', 'Voltage Rush', 'Current Flow', 'Energy Beam', 'Electric Field', 'Spark Wave'],
  dreamy: ['Sweet Dreams', 'Fairy Tale', 'Magic Hour', 'Dreamy Sky', 'Soft Whisper', 'Cloud Dance', 'Peaceful Mind', 'Gentle Breeze'],
  bold: ['Bold Statement', 'Strong Impact', 'Power Move', 'Brave Heart', 'Confident Glow', 'Fearless Spirit', 'Dynamic Force', 'Bold Vision'],
  fresh: ['Fresh Start', 'Spring Morning', 'Green Energy', 'Natural Glow', 'Fresh Breeze', 'Mint Cool', 'Pure Nature', 'Clean Slate'],
  warm: ['Cozy Fire', 'Warm Embrace', 'Summer Glow', 'Autumn Warmth', 'Golden Light', 'Sunset Warmth', 'Campfire Glow', 'Heat Wave'],
  cool: ['Arctic Breeze', 'Ice Crystal', 'Cool Mint', 'Winter Sky', 'Frozen Lake', 'Snow Peak', 'Glacier Blue', 'Frost Line'],
  dark: ['Midnight Hour', 'Dark Matter', 'Shadow Dance', 'Black Hole', 'Deep Space', 'Night Sky', 'Dark Energy', 'Void Walker'],
  light: ['Pure Light', 'Bright Dawn', 'Clean White', 'Fresh Air', 'Clear Sky', 'White Sand', 'Light Beam', 'Crystal Clear']
};

// Generate color variations (max 6 colors for optimal Tailwind CSS support)
function generateColorVariations(baseColors, count = 4) {
  const variations = [];
  
  // Limit base colors to maximum 6 for optimal Tailwind support
  const limitedBaseColors = baseColors.slice(0, 6);
  
  for (let i = 0; i < count; i++) {
    const variation = limitedBaseColors.map(color => {
      const hex = color.replace('#', '');
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);
      
      // Add controlled variation for modern look
      const variance = 20;
      const newR = Math.max(0, Math.min(255, r + (Math.random() * variance - variance/2)));
      const newG = Math.max(0, Math.min(255, g + (Math.random() * variance - variance/2)));
      const newB = Math.max(0, Math.min(255, b + (Math.random() * variance - variance/2)));
      
      return `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;
    });
    
    variations.push(variation);
  }
  
  return variations;
}

// Modern gradient angles for eye-catching effects
const modernAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330];
const gradientTypes = ['linear', 'radial'];

// Create content directory
const contentDir = path.join(__dirname, '..', 'content', 'gradients');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

let totalGradients = 0;
let gradientId = 1;

// Generate 1000 modern gradients
const targetGradients = 1000;
const gradientsPerCategory = Math.ceil(targetGradients / modernCategories.length);

modernCategories.forEach(category => {
  const categoryPalettes = modernColorPalettes[category] || modernColorPalettes.vibrant;
  const categoryNames = modernGradientNames[category] || modernGradientNames.vibrant;
  
  let categoryGradients = 0;
  
  // Generate gradients for this category
  categoryPalettes.forEach((basePalette, paletteIndex) => {
    if (categoryGradients >= gradientsPerCategory) return;
    
    const variations = generateColorVariations(basePalette, 8);
    
    variations.forEach((colors, variationIndex) => {
      if (categoryGradients >= gradientsPerCategory) return;
      
      // Create different gradient configurations for modern look (max 6 stops for optimal Tailwind support)
      const configs = [
        { stops: 2, angle: modernAngles[Math.floor(Math.random() * modernAngles.length)] },
        { stops: 3, angle: modernAngles[Math.floor(Math.random() * modernAngles.length)] },
        { stops: 4, angle: modernAngles[Math.floor(Math.random() * modernAngles.length)] },
        { stops: 5, angle: modernAngles[Math.floor(Math.random() * modernAngles.length)] },
        { stops: Math.min(6, colors.length), angle: modernAngles[Math.floor(Math.random() * modernAngles.length)] }
      ];
      
      configs.forEach((config, configIndex) => {
        if (categoryGradients >= gradientsPerCategory) return;
        
        const selectedColors = colors.slice(0, config.stops);
        const gradientType = gradientTypes[Math.floor(Math.random() * gradientTypes.length)];
        
        // Build modern CSS gradient
        let cssGradient;
        if (gradientType === 'radial') {
          cssGradient = `radial-gradient(circle, ${selectedColors.join(', ')})`;
        } else {
          cssGradient = `linear-gradient(${config.angle}deg, ${selectedColors.join(', ')})`;
        }
        
        // Generate modern name
        const baseName = categoryNames[paletteIndex % categoryNames.length];
        const nameVariations = ['Pro', 'Elite', 'Modern', 'Sleek', 'Vibrant', 'Juicy', 'Fresh', 'Bold'];
        const nameVariation = nameVariations[variationIndex % nameVariations.length];
        const gradientName = `${baseName} ${nameVariation}`;
        
        // Create slug
        const slug = `${category}-${gradientId.toString().padStart(4, '0')}`;
        
        // Generate modern description
        const descriptions = [
          `A stunning ${config.stops}-color ${gradientType} gradient with modern ${category} vibes`,
          `Eye-catching ${category} gradient featuring ${config.stops} vibrant colors`,
          `Sleek ${gradientType} gradient perfect for contemporary designs`,
          `Juicy ${category}-themed gradient with ${config.stops} bold color stops`,
          `Modern ${config.stops}-stop gradient with a ${config.angle}° flow`
        ];
        const description = descriptions[Math.floor(Math.random() * descriptions.length)];
        
        // Modern tags
        const modernTags = [category, gradientType, `${config.stops}-stop`, 'modern', 'sleek', 'vibrant', 'juicy', 'eye-catching'];
        
        // Create MDX content
        const mdxContent = `---
id: "${slug}"
title: "${gradientName}"
description: "${description}"
category: "${category}"
tags: ${JSON.stringify(modernTags)}
colors: ${JSON.stringify(selectedColors)}
cssGradient: "${cssGradient}"
featured: ${totalGradients < 15 ? 'true' : 'false'}
createdAt: "${new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()}"
previewImage: "/gradients/${slug}.jpg"
keywords: "${category} gradient, ${gradientType} gradient, modern CSS gradient, ${config.stops} colors, sleek design"
author: "Modern Gradient Studio"
stops:
${selectedColors.map((color, index) => `  - color: "${color}"
    position: ${Math.round((index / (selectedColors.length - 1)) * 100)}`).join('\n')}
---

# ${gradientName}

${description}. This ${gradientType} gradient combines ${config.stops} carefully selected colors to create a visually stunning modern effect.

## Color Information

${selectedColors.map((color, index) => `- **Color ${index + 1}** (${color}) - Position ${Math.round((index / (selectedColors.length - 1)) * 100)}%`).join('\n')}

## Technical Details

- **Type**: ${gradientType.charAt(0).toUpperCase() + gradientType.slice(1)} gradient
- **Angle**: ${config.angle}°
- **Color Stops**: ${config.stops}
- **Style**: Modern, Sleek, Eye-catching
- **Category**: ${category.charAt(0).toUpperCase() + category.slice(1)}

## CSS Implementation

\`\`\`css
background: ${cssGradient};
\`\`\`

## Perfect For

- Modern web applications
- Mobile app interfaces
- Brand identity designs
- UI/UX components
- Marketing materials
- ${category.charAt(0).toUpperCase() + category.slice(1)}-themed projects
`;

        // Write the MDX file
        fs.writeFileSync(path.join(contentDir, `${slug}.mdx`), mdxContent);
        
        totalGradients++;
        gradientId++;
        categoryGradients++;
        
        // Log progress
        if (totalGradients % 50 === 0) {
          console.log(`Generated ${totalGradients} modern gradients...`);
        }
      });
    });
  });
});

console.log(`\n🎨 Successfully generated ${totalGradients} modern, sleek, juicy, vibrant gradients!`);
console.log(`📁 Files created in: ${contentDir}`);
console.log(`📊 Categories: ${modernCategories.length}`);
console.log(`🎯 Average per category: ${Math.round(totalGradients / modernCategories.length)}`);
console.log(`✨ Featured gradients: ${Math.min(15, totalGradients)}`);
console.log(`🚀 All gradients are eye-catching and modern!`);
