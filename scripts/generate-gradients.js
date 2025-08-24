import fs from 'fs';
import path from 'path';

const gradientData = [
  // Red category gradients
  { id: 'fire-sunset', title: 'Fire Sunset', category: 'red', colors: ['#FF0000', '#FF6347', '#FFB347'], description: 'Blazing fire sunset with warm orange tones' },
  { id: 'crimson-dawn', title: 'Crimson Dawn', category: 'red', colors: ['#DC143C', '#FF6B6B', '#FFB3BA'], description: 'Deep crimson morning light' },
  { id: 'ruby-passion', title: 'Ruby Passion', category: 'red', colors: ['#8B0000', '#DC143C', '#FF1493'], description: 'Passionate ruby red gradient' },
  { id: 'cherry-blossom', title: 'Cherry Blossom', category: 'red', colors: ['#FF69B4', '#FFB6C1', '#FFC0CB'], description: 'Soft cherry blossom pink' },
  { id: 'strawberry-cream', title: 'Strawberry Cream', category: 'red', colors: ['#FF6347', '#FFB347', '#FFEAA7'], description: 'Sweet strawberry and cream blend' },
  
  // Blue category gradients
  { id: 'deep-ocean', title: 'Deep Ocean', category: 'blue', colors: ['#001f3f', '#0074D9', '#39CCCC'], description: 'Mysterious deep ocean depths' },
  { id: 'sky-blue', title: 'Sky Blue', category: 'blue', colors: ['#87CEEB', '#87CEFA', '#E0F6FF'], description: 'Clear sky blue gradient' },
  { id: 'midnight-blue', title: 'Midnight Blue', category: 'blue', colors: ['#191970', '#4169E1', '#6495ED'], description: 'Deep midnight blue tones' },
  { id: 'electric-blue', title: 'Electric Blue', category: 'blue', colors: ['#0000FF', '#00BFFF', '#87CEEB'], description: 'Vibrant electric blue energy' },
  { id: 'ice-blue', title: 'Ice Blue', category: 'blue', colors: ['#B0E0E6', '#E0F6FF', '#F0F8FF'], description: 'Cool ice blue gradient' },
  
  // Green category gradients
  { id: 'emerald-forest', title: 'Emerald Forest', category: 'green', colors: ['#013220', '#228B22', '#90EE90'], description: 'Rich emerald forest canopy' },
  { id: 'mint-fresh', title: 'Mint Fresh', category: 'green', colors: ['#98FB98', '#AFEEEE', '#E0FFFF'], description: 'Fresh mint green gradient' },
  { id: 'jungle-green', title: 'Jungle Green', category: 'green', colors: ['#006400', '#32CD32', '#ADFF2F'], description: 'Lush jungle green tones' },
  { id: 'sage-garden', title: 'Sage Garden', category: 'green', colors: ['#9CAF88', '#C8D5B9', '#E8F5E8'], description: 'Peaceful sage garden colors' },
  { id: 'lime-zest', title: 'Lime Zest', category: 'green', colors: ['#32CD32', '#7FFF00', '#CCFF99'], description: 'Zesty lime green energy' },
  
  // Purple category gradients
  { id: 'royal-velvet', title: 'Royal Velvet', category: 'purple', colors: ['#4B0082', '#8A2BE2', '#DA70D6'], description: 'Luxurious royal velvet purple' },
  { id: 'lavender-dream', title: 'Lavender Dream', category: 'purple', colors: ['#E6E6FA', '#DDA0DD', '#D8BFD8'], description: 'Soft lavender dream gradient' },
  { id: 'amethyst-glow', title: 'Amethyst Glow', category: 'purple', colors: ['#663399', '#9966CC', '#CC99FF'], description: 'Mystical amethyst glow' },
  { id: 'violet-storm', title: 'Violet Storm', category: 'purple', colors: ['#8B008B', '#9932CC', '#BA55D3'], description: 'Dramatic violet storm clouds' },
  { id: 'plum-twilight', title: 'Plum Twilight', category: 'purple', colors: ['#8B008B', '#DDA0DD', '#F8F8FF'], description: 'Gentle plum twilight colors' },
  
  // Orange category gradients
  { id: 'tangerine-dream', title: 'Tangerine Dream', category: 'orange', colors: ['#FF8C00', '#FFA500', '#FFB347'], description: 'Vibrant tangerine dream gradient' },
  { id: 'autumn-leaves', title: 'Autumn Leaves', category: 'orange', colors: ['#D2691E', '#FF8C00', '#FFD700'], description: 'Beautiful autumn leaf colors' },
  { id: 'peach-sorbet', title: 'Peach Sorbet', category: 'orange', colors: ['#FFCBA4', '#FFE5B4', '#FFF8DC'], description: 'Sweet peach sorbet gradient' },
  { id: 'copper-sunset', title: 'Copper Sunset', category: 'orange', colors: ['#B87333', '#CD853F', '#F4A460'], description: 'Rich copper sunset tones' },
  { id: 'citrus-burst', title: 'Citrus Burst', category: 'orange', colors: ['#FF6347', '#FF7F50', '#FFA07A'], description: 'Fresh citrus burst energy' },
  
  // Yellow category gradients
  { id: 'golden-hour', title: 'Golden Hour', category: 'yellow', colors: ['#FFD700', '#FFED4E', '#FFF9C4'], description: 'Magical golden hour light' },
  { id: 'lemon-sunshine', title: 'Lemon Sunshine', category: 'yellow', colors: ['#FFFF00', '#FFFF99', '#FFFFCC'], description: 'Bright lemon sunshine gradient' },
  { id: 'honey-amber', title: 'Honey Amber', category: 'yellow', colors: ['#DAA520', '#FFD700', '#FFEAA7'], description: 'Sweet honey amber tones' },
  { id: 'banana-cream', title: 'Banana Cream', category: 'yellow', colors: ['#FFEB3B', '#FFF59D', '#FFF9C4'], description: 'Creamy banana gradient' },
  { id: 'sunflower-field', title: 'Sunflower Field', category: 'yellow', colors: ['#FFD54F', '#FFEB3B', '#FFF176'], description: 'Cheerful sunflower field colors' },
  
  // Pink category gradients
  { id: 'rose-garden', title: 'Rose Garden', category: 'pink', colors: ['#FF69B4', '#FFB6C1', '#FFC0CB'], description: 'Romantic rose garden gradient' },
  { id: 'cotton-candy', title: 'Cotton Candy', category: 'pink', colors: ['#FFB6C1', '#FFC0CB', '#FFE4E1'], description: 'Sweet cotton candy colors' },
  { id: 'blush-pink', title: 'Blush Pink', category: 'pink', colors: ['#FFC0CB', '#FFCCCB', '#FFE4E1'], description: 'Soft blush pink gradient' },
  { id: 'magenta-fusion', title: 'Magenta Fusion', category: 'pink', colors: ['#FF1493', '#FF69B4', '#FFB6C1'], description: 'Vibrant magenta fusion' },
  { id: 'peony-bloom', title: 'Peony Bloom', category: 'pink', colors: ['#DB7093', '#F0B7CD', '#F8E8EE'], description: 'Elegant peony bloom gradient' },
  
  // Teal category gradients
  { id: 'turquoise-bay', title: 'Turquoise Bay', category: 'teal', colors: ['#008B8B', '#20B2AA', '#AFEEEE'], description: 'Serene turquoise bay waters' },
  { id: 'seafoam-green', title: 'Seafoam Green', category: 'teal', colors: ['#2E8B57', '#66CDAA', '#B0E0E6'], description: 'Fresh seafoam green gradient' },
  { id: 'aqua-marine', title: 'Aqua Marine', category: 'teal', colors: ['#008080', '#48D1CC', '#E0FFFF'], description: 'Clear aqua marine waters' },
  { id: 'cyan-waves', title: 'Cyan Waves', category: 'teal', colors: ['#00CED1', '#00FFFF', '#E0FFFF'], description: 'Bright cyan wave gradient' },
  { id: 'jade-waters', title: 'Jade Waters', category: 'teal', colors: ['#00A86B', '#20B2AA', '#AFEEEE'], description: 'Peaceful jade water colors' },
  
  // Indigo category gradients
  { id: 'deep-space', title: 'Deep Space', category: 'indigo', colors: ['#191970', '#483D8B', '#6A5ACD'], description: 'Mysterious deep space gradient' },
  { id: 'cosmic-purple', title: 'Cosmic Purple', category: 'indigo', colors: ['#4B0082', '#6A5ACD', '#9370DB'], description: 'Cosmic purple nebula colors' },
  { id: 'galaxy-night', title: 'Galaxy Night', category: 'indigo', colors: ['#2F2F4F', '#483D8B', '#6495ED'], description: 'Starry galaxy night gradient' },
  { id: 'royal-indigo', title: 'Royal Indigo', category: 'indigo', colors: ['#4B0082', '#663399', '#8A2BE2'], description: 'Regal royal indigo tones' },
  { id: 'midnight-storm', title: 'Midnight Storm', category: 'indigo', colors: ['#191970', '#2F4F4F', '#6A5ACD'], description: 'Dramatic midnight storm clouds' },
  
  // Gray category gradients
  { id: 'silver-mist', title: 'Silver Mist', category: 'gray', colors: ['#C0C0C0', '#D3D3D3', '#F5F5F5'], description: 'Elegant silver mist gradient' },
  { id: 'charcoal-smoke', title: 'Charcoal Smoke', category: 'gray', colors: ['#36454F', '#708090', '#C0C0C0'], description: 'Sophisticated charcoal smoke' },
  { id: 'dove-gray', title: 'Dove Gray', category: 'gray', colors: ['#696969', '#A9A9A9', '#D3D3D3'], description: 'Soft dove gray gradient' },
  { id: 'steel-blue', title: 'Steel Blue', category: 'gray', colors: ['#4682B4', '#778899', '#B0C4DE'], description: 'Industrial steel blue tones' },
  { id: 'platinum-shine', title: 'Platinum Shine', category: 'gray', colors: ['#E5E4E2', '#F7F7F7', '#FFFFFF'], description: 'Luxurious platinum shine' },
  
  // Warm category gradients
  { id: 'desert-sunset', title: 'Desert Sunset', category: 'warm', colors: ['#FF4500', '#FF8C00', '#FFD700'], description: 'Warm desert sunset colors' },
  { id: 'campfire-glow', title: 'Campfire Glow', category: 'warm', colors: ['#B22222', '#FF6347', '#FFA500'], description: 'Cozy campfire glow gradient' },
  { id: 'autumn-spice', title: 'Autumn Spice', category: 'warm', colors: ['#8B4513', '#CD853F', '#F4A460'], description: 'Warm autumn spice tones' },
  { id: 'terra-cotta', title: 'Terra Cotta', category: 'warm', colors: ['#E2725B', '#F4A460', '#FFDAB9'], description: 'Earthy terra cotta gradient' },
  { id: 'sunrise-warmth', title: 'Sunrise Warmth', category: 'warm', colors: ['#FF6B35', '#F7931E', '#FFD23F'], description: 'Gentle sunrise warmth' },
  
  // Cool category gradients
  { id: 'arctic-breeze', title: 'Arctic Breeze', category: 'cool', colors: ['#B0E0E6', '#E0F6FF', '#F0F8FF'], description: 'Refreshing arctic breeze gradient' },
  { id: 'winter-frost', title: 'Winter Frost', category: 'cool', colors: ['#4682B4', '#87CEEB', '#E0F6FF'], description: 'Cool winter frost colors' },
  { id: 'glacial-blue', title: 'Glacial Blue', category: 'cool', colors: ['#4169E1', '#6495ED', '#B0E0E6'], description: 'Pristine glacial blue gradient' },
  { id: 'moonlight-silver', title: 'Moonlight Silver', category: 'cool', colors: ['#708090', '#C0C0C0', '#F8F8FF'], description: 'Serene moonlight silver tones' },
  { id: 'crystal-ice', title: 'Crystal Ice', category: 'cool', colors: ['#B0E0E6', '#E0F6FF', '#FFFFFF'], description: 'Clear crystal ice gradient' },
  
  // Nature category gradients
  { id: 'mountain-meadow', title: 'Mountain Meadow', category: 'nature', colors: ['#228B22', '#90EE90', '#F0FFF0'], description: 'Peaceful mountain meadow colors' },
  { id: 'river-stones', title: 'River Stones', category: 'nature', colors: ['#696969', '#778899', '#B0C4DE'], description: 'Smooth river stone gradient' },
  { id: 'earth-tones', title: 'Earth Tones', category: 'nature', colors: ['#8B4513', '#CD853F', '#F5DEB3'], description: 'Natural earth tone gradient' },
  { id: 'bamboo-grove', title: 'Bamboo Grove', category: 'nature', colors: ['#6B8E23', '#9ACD32', '#F0FFF0'], description: 'Tranquil bamboo grove colors' },
  { id: 'moss-garden', title: 'Moss Garden', category: 'nature', colors: ['#556B2F', '#9ACD32', '#F0FFF0'], description: 'Lush moss garden gradient' },
  
  // Luxury category gradients
  { id: 'gold-royal', title: 'Gold Royal', category: 'luxury', colors: ['#B8860B', '#FFD700', '#FFF8DC'], description: 'Opulent gold royal gradient' },
  { id: 'diamond-sparkle', title: 'Diamond Sparkle', category: 'luxury', colors: ['#E5E4E2', '#F7F7F7', '#FFFFFF'], description: 'Brilliant diamond sparkle' },
  { id: 'emerald-luxury', title: 'Emerald Luxury', category: 'luxury', colors: ['#013220', '#50C878', '#98FB98'], description: 'Luxurious emerald gradient' },
  { id: 'sapphire-elegance', title: 'Sapphire Elegance', category: 'luxury', colors: ['#082567', '#0F52BA', '#6495ED'], description: 'Elegant sapphire blue tones' },
  { id: 'pearl-luster', title: 'Pearl Luster', category: 'luxury', colors: ['#F8F6F0', '#FFFDD0', '#FFFFFF'], description: 'Lustrous pearl gradient' },
  
  // Vibrant category gradients
  { id: 'neon-rainbow', title: 'Neon Rainbow', category: 'vibrant', colors: ['#FF0080', '#FF8000', '#80FF00'], description: 'Electric neon rainbow gradient' },
  { id: 'electric-storm', title: 'Electric Storm', category: 'vibrant', colors: ['#00FFFF', '#FF00FF', '#FFFF00'], description: 'Vibrant electric storm colors' },
  { id: 'tropical-burst', title: 'Tropical Burst', category: 'vibrant', colors: ['#FF1493', '#00BFFF', '#32CD32'], description: 'Energetic tropical burst' },
  { id: 'plasma-energy', title: 'Plasma Energy', category: 'vibrant', colors: ['#FF0000', '#FF00FF', '#00FFFF'], description: 'High-energy plasma gradient' },
  { id: 'laser-light', title: 'Laser Light', category: 'vibrant', colors: ['#00FF00', '#00FFFF', '#0080FF'], description: 'Bright laser light gradient' },
  
  // Pastel category gradients
  { id: 'baby-powder', title: 'Baby Powder', category: 'pastel', colors: ['#FEFCFF', '#F8F8FF', '#E6E6FA'], description: 'Soft baby powder gradient' },
  { id: 'spring-bloom', title: 'Spring Bloom', category: 'pastel', colors: ['#FFE4E1', '#F0FFF0', '#E0F6FF'], description: 'Gentle spring bloom colors' },
  { id: 'candy-floss', title: 'Candy Floss', category: 'pastel', colors: ['#FFB6C1', '#FFEAA7', '#E0F6FF'], description: 'Sweet candy floss gradient' },
  { id: 'powder-blue', title: 'Powder Blue', category: 'pastel', colors: ['#B0E0E6', '#E0F6FF', '#F0F8FF'], description: 'Delicate powder blue tones' },
  { id: 'soft-peach', title: 'Soft Peach', category: 'pastel', colors: ['#FFEAA7', '#FFE4E1', '#FFF8DC'], description: 'Gentle soft peach gradient' },
  
  // Sunset category gradients
  { id: 'hawaiian-sunset', title: 'Hawaiian Sunset', category: 'sunset', colors: ['#FF4500', '#FF8C00', '#FFD700'], description: 'Beautiful Hawaiian sunset' },
  { id: 'malibu-dusk', title: 'Malibu Dusk', category: 'sunset', colors: ['#FF69B4', '#FF8C00', '#FFD700'], description: 'Stunning Malibu dusk colors' },
  { id: 'sahara-evening', title: 'Sahara Evening', category: 'sunset', colors: ['#8B4513', '#CD853F', '#FFD700'], description: 'Mystical Sahara evening gradient' },
  { id: 'caribbean-sunset', title: 'Caribbean Sunset', category: 'sunset', colors: ['#FF6347', '#FFA500', '#FFD700'], description: 'Vibrant Caribbean sunset' },
  { id: 'pacific-twilight', title: 'Pacific Twilight', category: 'sunset', colors: ['#4B0082', '#FF8C00', '#FFD700'], description: 'Peaceful Pacific twilight' },
  
  // Ocean category gradients
  { id: 'coral-reef', title: 'Coral Reef', category: 'ocean', colors: ['#FF7F50', '#20B2AA', '#00CED1'], description: 'Vibrant coral reef colors' },
  { id: 'deep-abyss', title: 'Deep Abyss', category: 'ocean', colors: ['#000080', '#191970', '#4682B4'], description: 'Mysterious deep ocean abyss' },
  { id: 'tropical-waters', title: 'Tropical Waters', category: 'ocean', colors: ['#00CED1', '#40E0D0', '#AFEEEE'], description: 'Clear tropical waters' },
  { id: 'whale-song', title: 'Whale Song', category: 'ocean', colors: ['#2F4F4F', '#4682B4', '#87CEEB'], description: 'Deep whale song gradient' },
  { id: 'sea-breeze', title: 'Sea Breeze', category: 'ocean', colors: ['#B0E0E6', '#87CEEB', '#E0F6FF'], description: 'Refreshing sea breeze colors' },
  
  // Forest category gradients
  { id: 'redwood-grove', title: 'Redwood Grove', category: 'forest', colors: ['#8B4513', '#228B22', '#90EE90'], description: 'Majestic redwood grove gradient' },
  { id: 'pine-forest', title: 'Pine Forest', category: 'forest', colors: ['#013220', '#228B22', '#32CD32'], description: 'Dense pine forest colors' },
  { id: 'autumn-forest', title: 'Autumn Forest', category: 'forest', colors: ['#B22222', '#FF8C00', '#228B22'], description: 'Colorful autumn forest gradient' },
  { id: 'misty-woods', title: 'Misty Woods', category: 'forest', colors: ['#2F4F4F', '#556B2F', '#9ACD32'], description: 'Mystical misty woods gradient' },
  { id: 'enchanted-forest', title: 'Enchanted Forest', category: 'forest', colors: ['#4B0082', '#228B22', '#90EE90'], description: 'Magical enchanted forest' },
  
  // Neon category gradients
  { id: 'cyber-punk', title: 'Cyber Punk', category: 'neon', colors: ['#FF00FF', '#00FFFF', '#FFFF00'], description: 'Futuristic cyber punk gradient' },
  { id: 'laser-show', title: 'Laser Show', category: 'neon', colors: ['#00FF00', '#FF0080', '#0080FF'], description: 'Electric laser show colors' },
  { id: 'neon-city', title: 'Neon City', category: 'neon', colors: ['#FF1493', '#00BFFF', '#32CD32'], description: 'Vibrant neon city lights' },
  { id: 'electric-pulse', title: 'Electric Pulse', category: 'neon', colors: ['#00FFFF', '#FF00FF', '#FFFF00'], description: 'High-voltage electric pulse' },
  { id: 'retro-wave', title: 'Retro Wave', category: 'neon', colors: ['#FF0080', '#8000FF', '#0080FF'], description: 'Nostalgic retro wave gradient' }
];

const contentDir = path.join(process.cwd(), 'content', 'gradients');

// Ensure directory exists
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

gradientData.forEach((gradient, index) => {
  const mdxContent = `---
id: "${gradient.id}"
title: "${gradient.title}"
description: "${gradient.description}"
category: "${gradient.category}"
tags: ["${gradient.category}", "gradient", "design", "color"]
colors: ${JSON.stringify(gradient.colors)}
cssGradient: "linear-gradient(135deg, ${gradient.colors.join(', ')})"
featured: ${index < 10 ? 'true' : 'false'}
createdAt: "${new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()}"
previewImage: "/gradients/${gradient.id}.jpg"
keywords: "${gradient.title.toLowerCase()}, ${gradient.category} gradient, CSS gradient, color design"
author: "Design Team"
---

# ${gradient.title}

${gradient.description}

## Color Palette

${gradient.colors.map((color, i) => `- **Color ${i + 1}** (${color}) - ${i === 0 ? 'Primary' : i === gradient.colors.length - 1 ? 'Accent' : 'Secondary'} tone`).join('\n')}

## Perfect For

- Web design projects
- UI/UX applications
- Brand identity design
- Digital art and graphics
- Modern website backgrounds

## CSS Code

\`\`\`css
.${gradient.id}-gradient {
  background: linear-gradient(135deg, ${gradient.colors.join(', ')});
}
\`\`\`

## Usage Tips

This gradient works well for:
- Hero sections and headers
- Button and interactive elements
- Card backgrounds
- Section dividers
- Creative design elements
`;

  const filePath = path.join(contentDir, `${gradient.id}.mdx`);
  fs.writeFileSync(filePath, mdxContent);
});

console.log(`Created ${gradientData.length} gradient files successfully!`);
