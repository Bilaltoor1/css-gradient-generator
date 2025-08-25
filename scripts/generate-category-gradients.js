const fs = require('fs');
const path = require('path');

// Gradient categories with their specific color themes
const gradientCategories = {
  red: {
    name: 'Red Gradients',
    baseColors: [
      ['#FF0000', '#DC143C', '#B22222', '#8B0000'],
      ['#FF6B6B', '#FF4757', '#FF3838', '#E55039'],
      ['#FF4081', '#F50057', '#C51162', '#880E4F'],
      ['#FF5722', '#E64A19', '#D84315', '#BF360C'],
      ['#F44336', '#D32F2F', '#C62828', '#B71C1C']
    ]
  },
  orange: {
    name: 'Orange Gradients',
    baseColors: [
      ['#FF8C00', '#FF7F00', '#FF6347', '#FF4500'],
      ['#FFA500', '#FF9500', '#FF8500', '#FF7500'],
      ['#FF9800', '#F57C00', '#E65100', '#BF360C'],
      ['#FFB74D', '#FFA726', '#FF9800', '#F57C00'],
      ['#FFAB91', '#FF8A65', '#FF7043', '#FF5722']
    ]
  },
  yellow: {
    name: 'Yellow Gradients',
    baseColors: [
      ['#FFFF00', '#FFD700', '#FFA500', '#FF8C00'],
      ['#FFEB3B', '#FFC107', '#FF9800', '#FF5722'],
      ['#FFF176', '#FFEE58', '#FFEB3B', '#FDD835'],
      ['#FFCC02', '#FFB300', '#FF8F00', '#FF6F00'],
      ['#F9A825', '#F57F17', '#FF8F00', '#FF6F00']
    ]
  },
  green: {
    name: 'Green Gradients',
    baseColors: [
      ['#00FF00', '#32CD32', '#228B22', '#006400'],
      ['#4CAF50', '#388E3C', '#2E7D32', '#1B5E20'],
      ['#8BC34A', '#689F38', '#558B2F', '#33691E'],
      ['#00E676', '#00C853', '#00BFA5', '#00ACC1'],
      ['#66BB6A', '#4CAF50', '#43A047', '#388E3C']
    ]
  },
  blue: {
    name: 'Blue Gradients',
    baseColors: [
      ['#0000FF', '#1E90FF', '#4169E1', '#0000CD'],
      ['#2196F3', '#1976D2', '#1565C0', '#0D47A1'],
      ['#03A9F4', '#0288D1', '#0277BD', '#01579B'],
      ['#00BCD4', '#0097A7', '#00838F', '#006064'],
      ['#3F51B5', '#303F9F', '#283593', '#1A237E']
    ]
  },
  purple: {
    name: 'Purple Gradients',
    baseColors: [
      ['#800080', '#9932CC', '#8A2BE2', '#4B0082'],
      ['#9C27B0', '#7B1FA2', '#6A1B9A', '#4A148C'],
      ['#673AB7', '#512DA8', '#4527A0', '#311B92'],
      ['#E91E63', '#C2185B', '#AD1457', '#880E4F'],
      ['#AA00FF', '#9C27B0', '#8E24AA', '#7B1FA2']
    ]
  },
  pink: {
    name: 'Pink Gradients',
    baseColors: [
      ['#FFC0CB', '#FF69B4', '#FF1493', '#DC143C'],
      ['#E91E63', '#C2185B', '#AD1457', '#880E4F'],
      ['#FF4081', '#F50057', '#C51162', '#880E4F'],
      ['#FF80AB', '#FF4081', '#F50057', '#C51162'],
      ['#FCE4EC', '#F8BBD9', '#F48FB1', '#F06292']
    ]
  },
  cyan: {
    name: 'Cyan Gradients',
    baseColors: [
      ['#00FFFF', '#00CED1', '#48D1CC', '#20B2AA'],
      ['#00BCD4', '#0097A7', '#00838F', '#006064'],
      ['#26C6DA', '#00ACC1', '#0097A7', '#00838F'],
      ['#4DD0E1', '#26C6DA', '#00BCD4', '#00ACC1'],
      ['#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4']
    ]
  },
  teal: {
    name: 'Teal Gradients',
    baseColors: [
      ['#008080', '#20B2AA', '#48D1CC', '#00CED1'],
      ['#009688', '#00796B', '#00695C', '#004D40'],
      ['#26A69A', '#009688', '#00897B', '#00796B'],
      ['#4DB6AC', '#26A69A', '#009688', '#00897B'],
      ['#80CBC4', '#4DB6AC', '#26A69A', '#009688']
    ]
  },
  gray: {
    name: 'Gray Gradients',
    baseColors: [
      ['#000000', '#2F2F2F', '#5F5F5F', '#8F8F8F'],
      ['#9E9E9E', '#757575', '#616161', '#424242'],
      ['#BDBDBD', '#9E9E9E', '#757575', '#616161'],
      ['#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575'],
      ['#F5F5F5', '#EEEEEE', '#E0E0E0', '#BDBDBD']
    ]
  },
  brown: {
    name: 'Brown Gradients',
    baseColors: [
      ['#8B4513', '#A0522D', '#CD853F', '#DEB887'],
      ['#795548', '#5D4037', '#4E342E', '#3E2723'],
      ['#8D6E63', '#795548', '#6D4C41', '#5D4037'],
      ['#A1887F', '#8D6E63', '#795548', '#6D4C41'],
      ['#BCAAA4', '#A1887F', '#8D6E63', '#795548']
    ]
  },
  indigo: {
    name: 'Indigo Gradients',
    baseColors: [
      ['#4B0082', '#483D8B', '#6A5ACD', '#7B68EE'],
      ['#3F51B5', '#303F9F', '#283593', '#1A237E'],
      ['#5C6BC0', '#3F51B5', '#3949AB', '#303F9F'],
      ['#7986CB', '#5C6BC0', '#3F51B5', '#3949AB'],
      ['#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5']
    ]
  },
  lime: {
    name: 'Lime Gradients',
    baseColors: [
      ['#00FF00', '#32CD32', '#9AFF9A', '#98FB98'],
      ['#CDDC39', '#AFD135', '#9BC53D', '#8BC34A'],
      ['#D4E157', '#CDDC39', '#C0CA33', '#AFD135'],
      ['#DCE775', '#D4E157', '#CDDC39', '#C0CA33'],
      ['#E6EE9C', '#DCE775', '#D4E157', '#CDDC39']
    ]
  },
  amber: {
    name: 'Amber Gradients',
    baseColors: [
      ['#FFC107', '#FFB300', '#FFA000', '#FF8F00'],
      ['#FFD54F', '#FFCA28', '#FFC107', '#FFB300'],
      ['#FFE082', '#FFD54F', '#FFCA28', '#FFC107'],
      ['#FFECB3', '#FFE082', '#FFD54F', '#FFCA28'],
      ['#FFF8E1', '#FFECB3', '#FFE082', '#FFD54F']
    ]
  },
  deeporange: {
    name: 'Deep Orange Gradients',
    baseColors: [
      ['#FF5722', '#E64A19', '#D84315', '#BF360C'],
      ['#FF7043', '#FF5722', '#F4511E', '#E64A19'],
      ['#FF8A65', '#FF7043', '#FF5722', '#F4511E'],
      ['#FFAB91', '#FF8A65', '#FF7043', '#FF5722'],
      ['#FFCCBC', '#FFAB91', '#FF8A65', '#FF7043']
    ]
  },
  deeppurple: {
    name: 'Deep Purple Gradients',
    baseColors: [
      ['#673AB7', '#512DA8', '#4527A0', '#311B92'],
      ['#7986CB', '#673AB7', '#5E35B1', '#512DA8'],
      ['#9575CD', '#7986CB', '#673AB7', '#5E35B1'],
      ['#B39DDB', '#9575CD', '#7986CB', '#673AB7'],
      ['#D1C4E9', '#B39DDB', '#9575CD', '#7986CB']
    ]
  },
  lightblue: {
    name: 'Light Blue Gradients',
    baseColors: [
      ['#03A9F4', '#0288D1', '#0277BD', '#01579B'],
      ['#29B6F6', '#03A9F4', '#039BE5', '#0288D1'],
      ['#4FC3F7', '#29B6F6', '#03A9F4', '#039BE5'],
      ['#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4'],
      ['#B3E5FC', '#81D4FA', '#4FC3F7', '#29B6F6']
    ]
  },
  lightgreen: {
    name: 'Light Green Gradients',
    baseColors: [
      ['#8BC34A', '#689F38', '#558B2F', '#33691E'],
      ['#9CCC65', '#8BC34A', '#7CB342', '#689F38'],
      ['#AED581', '#9CCC65', '#8BC34A', '#7CB342'],
      ['#C5E1A5', '#AED581', '#9CCC65', '#8BC34A'],
      ['#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65']
    ]
  },
  warm: {
    name: 'Warm Gradients',
    baseColors: [
      ['#FF6B35', '#F7931E', '#FFD23F', '#EE4266'],
      ['#FF9A56', '#FF6B9D', '#C44569', '#F8B500'],
      ['#FF8A65', '#FF7043', '#FF5722', '#E64A19'],
      ['#FFB74D', '#FFA726', '#FF9800', '#F57C00'],
      ['#FFCC02', '#FF6F00', '#E65100', '#BF360C']
    ]
  },
  cool: {
    name: 'Cool Gradients',
    baseColors: [
      ['#667eea', '#764ba2', '#89f7fe', '#66a6ff'],
      ['#a8edea', '#fed6e3', '#89f7fe', '#66a6ff'],
      ['#209cff', '#68e0cf', '#30cfd0', '#91a7ff'],
      ['#667db6', '#0082c8', '#0052d4', '#4facfe'],
      ['#74b9ff', '#0984e3', '#6c5ce7', '#a29bfe']
    ]
  },
  sunset: {
    name: 'Sunset Gradients',
    baseColors: [
      ['#FF6B35', '#F7931E', '#FFD23F', '#EE4266'],
      ['#FF9A56', '#FF6B9D', '#C44569', '#F8B500'],
      ['#FF8A65', '#FF7043', '#FF5722', '#E64A19'],
      ['#FFB74D', '#FFA726', '#FF9800', '#F57C00'],
      ['#FFCC02', '#FF6F00', '#E65100', '#BF360C']
    ]
  },
  ocean: {
    name: 'Ocean Gradients',
    baseColors: [
      ['#1e3c72', '#2a5298', '#00b4db', '#0083b0'],
      ['#667db6', '#0082c8', '#0052d4', '#4facfe'],
      ['#43e97b', '#38f9d7', '#00d2ff', '#3a7bd5'],
      ['#89f7fe', '#66a6ff', '#667eea', '#764ba2'],
      ['#00c6ff', '#0072ff', '#2196F3', '#21CBF3']
    ]
  },
  forest: {
    name: 'Forest Gradients',
    baseColors: [
      ['#134e5e', '#71b280', '#8fbc8f', '#98fb98'],
      ['#2d5016', '#3e7b27', '#4caf50', '#81c784'],
      ['#1b4332', '#2d6a4f', '#40916c', '#52b788'],
      ['#355c7d', '#6c5b7b', '#c06c84', '#f67280'],
      ['#0f3460', '#16537e', '#1a759f', '#168aad']
    ]
  },
  cosmic: {
    name: 'Cosmic Gradients',
    baseColors: [
      ['#8360c3', '#2ebf91', '#4776e6', '#8e54e9'],
      ['#667eea', '#764ba2', '#f093fb', '#f5576c'],
      ['#4facfe', '#00f2fe', '#43e97b', '#38f9d7'],
      ['#fa709a', '#fee140', '#6a11cb', '#2575fc'],
      ['#a8edea', '#fed6e3', '#ff9a9e', '#fecfef']
    ]
  },
  neon: {
    name: 'Neon Gradients',
    baseColors: [
      ['#00ff00', '#ff00ff', '#00ffff', '#ffff00'],
      ['#ff0080', '#8000ff', '#0080ff', '#80ff00'],
      ['#ff6600', '#ff0066', '#6600ff', '#0066ff'],
      ['#ff3300', '#33ff00', '#0033ff', '#ff0033'],
      ['#ff8800', '#88ff00', '#0088ff', '#8800ff']
    ]
  },
  pastel: {
    name: 'Pastel Gradients',
    baseColors: [
      ['#ffecd2', '#fcb69f', '#ff9a9e', '#fecfef'],
      ['#a8edea', '#fed6e3', '#ff9a9e', '#fad0c4'],
      ['#d299c2', '#fef9d7', '#efd5ff', '#515ada'],
      ['#fbc2eb', '#a6c1ee', '#c2e9fb', '#a1c4fd'],
      ['#fdbb2d', '#22c1c3', '#fdbb2d', '#3b82f6']
    ]
  }
};

// Generate gradient angles and types
const gradientAngles = [0, 45, 90, 135, 180, 225, 270, 315];
const gradientTypes = ['linear', 'radial'];

// Generate descriptive names for each category
const gradientNames = {
  red: ['Crimson Fire', 'Ruby Glow', 'Cherry Burst', 'Scarlet Dream', 'Red Velvet', 'Rose Fire', 'Blood Moon', 'Cardinal Red'],
  orange: ['Sunset Blaze', 'Tangerine Dream', 'Autumn Fire', 'Copper Glow', 'Peach Fusion', 'Orange Burst', 'Coral Wave', 'Amber Light'],
  yellow: ['Golden Hour', 'Sunshine Burst', 'Lemon Drop', 'Honey Glow', 'Solar Flare', 'Canary Song', 'Butter Cup', 'Citrus Pop'],
  green: ['Emerald Forest', 'Mint Fresh', 'Jungle Mist', 'Spring Meadow', 'Pine Grove', 'Sage Whisper', 'Lime Burst', 'Forest Canopy'],
  blue: ['Ocean Depth', 'Sky High', 'Arctic Blue', 'Sapphire Glow', 'Navy Storm', 'Azure Dream', 'Electric Blue', 'Midnight Blue'],
  purple: ['Royal Crown', 'Violet Storm', 'Lavender Mist', 'Grape Fusion', 'Amethyst Glow', 'Plum Perfect', 'Purple Rain', 'Mystic Purple'],
  pink: ['Rose Petal', 'Flamingo Pink', 'Bubblegum Pop', 'Coral Reef', 'Cotton Candy', 'Cherry Blossom', 'Magenta Magic', 'Pink Paradise'],
  cyan: ['Turquoise Wave', 'Aqua Fresh', 'Cyan Storm', 'Teal Dream', 'Ice Blue', 'Crystal Clear', 'Pool Party', 'Ocean Breeze'],
  teal: ['Teal Tide', 'Seafoam Green', 'Jade River', 'Mint Ocean', 'Peacock Blue', 'Turquoise Dream', 'Aqua Marine', 'Teal Thunder'],
  gray: ['Storm Cloud', 'Silver Lining', 'Concrete Jungle', 'Steel Gray', 'Charcoal Fire', 'Platinum Elite', 'Graphite Glow', 'Ash Storm'],
  brown: ['Coffee Bean', 'Chocolate Swirl', 'Autumn Leaf', 'Caramel Cream', 'Rustic Wood', 'Mocha Magic', 'Earth Tone', 'Copper Penny'],
  indigo: ['Midnight Storm', 'Indigo Night', 'Deep Space', 'Royal Indigo', 'Navy Dreams', 'Cosmic Blue', 'Denim Blue', 'Twilight Sky'],
  lime: ['Lime Zest', 'Electric Green', 'Neon Lime', 'Green Flash', 'Acid Green', 'Chartreuse Pop', 'Lime Light', 'Spring Green'],
  amber: ['Amber Glow', 'Golden Honey', 'Caramel Swirl', 'Autumn Gold', 'Honey Drip', 'Bronze Fire', 'Golden Sunset', 'Amber Wave'],
  deeporange: ['Fire Storm', 'Burnt Orange', 'Volcano Red', 'Copper Fire', 'Rust Storm', 'Orange Flame', 'Deep Sunset', 'Molten Lava'],
  deeppurple: ['Royal Purple', 'Deep Violet', 'Cosmic Purple', 'Mystic Deep', 'Purple Storm', 'Violet Night', 'Deep Amethyst', 'Purple Reign'],
  lightblue: ['Sky Blue', 'Baby Blue', 'Ice Crystal', 'Powder Blue', 'Light Azure', 'Soft Blue', 'Cloud Nine', 'Arctic Light'],
  lightgreen: ['Mint Green', 'Spring Fresh', 'Lime Light', 'Sage Green', 'Soft Emerald', 'Light Mint', 'Garden Fresh', 'Green Meadow'],
  warm: ['Cozy Fire', 'Warm Embrace', 'Summer Day', 'Autumn Leaf', 'Golden Light', 'Campfire Glow', 'Sunny Morning', 'Heat Wave'],
  cool: ['Arctic Breeze', 'Ice Crystal', 'Cool Mint', 'Winter Sky', 'Frozen Lake', 'Snow Peak', 'Glacier Blue', 'Frost Line'],
  sunset: ['Sunset Dream', 'Golden Hour', 'Twilight Sky', 'Dawn Break', 'Evening Glow', 'Amber Horizon', 'Fire Sky', 'Sunset Beach'],
  ocean: ['Ocean Breeze', 'Deep Sea', 'Coral Reef', 'Wave Crest', 'Marine Blue', 'Aqua Flow', 'Tidal Wave', 'Ocean Depth'],
  forest: ['Forest Canopy', 'Emerald Woods', 'Pine Grove', 'Jungle Mist', 'Moss Garden', 'Woodland Path', 'Fern Valley', 'Tree Line'],
  cosmic: ['Galaxy Dust', 'Nebula Cloud', 'Star Field', 'Cosmic Ray', 'Aurora Light', 'Space Dream', 'Planet Glow', 'Meteor Shower'],
  neon: ['Electric Pulse', 'Neon Lights', 'Cyber Glow', 'Digital Wave', 'Tech Flow', 'LED Strip', 'Laser Beam', 'Circuit Board'],
  pastel: ['Soft Dreams', 'Cotton Candy', 'Pastel Sky', 'Sweet Memory', 'Gentle Touch', 'Cloud Nine', 'Baby Blue', 'Rose Petal']
};

// Create content directory if it doesn't exist
const contentDir = path.join(__dirname, '..', 'content', 'gradients');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

let totalGradients = 0;
let gradientId = 1;

// Generate gradients for each category
Object.keys(gradientCategories).forEach(categoryKey => {
  const category = gradientCategories[categoryKey];
  const categoryNames = gradientNames[categoryKey];
  
  // Generate multiple variations for each palette in the category
  category.baseColors.forEach((basePalette, paletteIndex) => {
    // Create 12 variations per palette to ensure good coverage
    for (let variation = 0; variation < 12; variation++) {
      // Add slight variations to colors
      const colors = basePalette.map(color => {
        const hex = color.replace('#', '');
        const r = parseInt(hex.substr(0, 2), 16);
        const g = parseInt(hex.substr(2, 2), 16);
        const b = parseInt(hex.substr(4, 2), 16);
        
        // Add random variation (-20 to +20)
        const newR = Math.max(0, Math.min(255, r + (Math.random() * 40 - 20)));
        const newG = Math.max(0, Math.min(255, g + (Math.random() * 40 - 20)));
        const newB = Math.max(0, Math.min(255, b + (Math.random() * 40 - 20)));
        
        return `#${Math.round(newR).toString(16).padStart(2, '0')}${Math.round(newG).toString(16).padStart(2, '0')}${Math.round(newB).toString(16).padStart(2, '0')}`;
      });
      
      // Create different gradient configurations
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
        const nameVariation = ['Pro', 'Elite', 'Premium', 'Classic', 'Modern', 'Vintage', 'Bold', 'Soft'][variation % 8];
        const gradientName = `${baseName} ${nameVariation}`;
        
        // Create slug
        const slug = `${categoryKey}-${gradientId.toString().padStart(4, '0')}`;
        
        // Generate description
        const descriptions = [
          `A stunning ${config.stops}-color ${gradientType} gradient perfect for modern ${categoryKey} designs`,
          `Eye-catching ${categoryKey} gradient with ${config.stops} beautiful color stops`,
          `Professional ${gradientType} gradient featuring ${config.stops} harmonious ${categoryKey} colors`,
          `Vibrant ${categoryKey}-themed gradient ideal for creative projects`,
          `Elegant ${config.stops}-stop ${categoryKey} gradient with a ${config.angle}° angle`
        ];
        const description = descriptions[Math.floor(Math.random() * descriptions.length)];
        
        // Create MDX content
        const mdxContent = `---
id: "${slug}"
title: "${gradientName}"
description: "${description}"
category: "${categoryKey}"
tags: ["${categoryKey}", "${gradientType}", "${config.stops}-stop", "gradient", "modern"]
colors: ${JSON.stringify(selectedColors)}
cssGradient: "${cssGradient}"
featured: ${totalGradients < 30 ? 'true' : 'false'}
createdAt: "${new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()}"
previewImage: "/gradients/${slug}.jpg"
keywords: "${categoryKey} gradient, ${gradientType} gradient, CSS gradient, ${config.stops} colors"
author: "Gradient Generator"
stops:
${selectedColors.map((color, index) => `  - color: "${color}"
    position: ${Math.round((index / (selectedColors.length - 1)) * 100)}`).join('\n')}
---

# ${gradientName}

${description}. This ${gradientType} gradient combines ${config.stops} carefully selected ${categoryKey} colors to create a visually stunning effect.

## Color Information

${selectedColors.map((color, index) => `- **Color ${index + 1}** (${color}) - Position ${Math.round((index / (selectedColors.length - 1)) * 100)}%`).join('\n')}

## Technical Details

- **Type**: ${gradientType.charAt(0).toUpperCase() + gradientType.slice(1)} gradient
- **Angle**: ${config.angle}°
- **Color Stops**: ${config.stops}
- **Category**: ${categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}

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
- ${categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1)}-themed designs
`;

        // Write the MDX file
        fs.writeFileSync(path.join(contentDir, `${slug}.mdx`), mdxContent);
        
        totalGradients++;
        gradientId++;
        
        // Log progress every 200 gradients
        if (totalGradients % 200 === 0) {
          console.log(`Generated ${totalGradients} gradients...`);
        }
      });
    });
  });
});

console.log(`\n🎨 Successfully generated ${totalGradients} category-specific gradients!`);
console.log(`📁 Files created in: ${contentDir}`);
console.log(`📊 Categories: ${Object.keys(gradientCategories).length}`);
console.log(`🎯 Average per category: ${Math.round(totalGradients / Object.keys(gradientCategories).length)}`);
console.log(`✨ Featured gradients: ${Math.min(30, totalGradients)}`);
