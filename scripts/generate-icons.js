import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Função para criar um ícone SVG base
function createBaseIcon() {
  return `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#22c55e;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="512" height="512" rx="128" fill="url(#bg)"/>
  
  <!-- Shield -->
  <path d="M256 64L384 128v128c0 88.4-71.6 160-160 160S64 344.4 64 256V128L256 64z" 
        fill="white" opacity="0.9"/>
  
  <!-- Mosquito -->
  <g transform="translate(256, 256) scale(0.6)">
    <!-- Body -->
    <ellipse cx="0" cy="0" rx="8" ry="20" fill="#2d3748" transform="rotate(45)"/>
    
    <!-- Wings -->
    <path d="M-15 -10 Q-25 -5 -15 0 Q-25 5 -15 10" stroke="#4a5568" stroke-width="2" fill="none"/>
    <path d="M15 -10 Q25 -5 15 0 Q25 5 15 10" stroke="#4a5568" stroke-width="2" fill="none"/>
    
    <!-- Head -->
    <circle cx="0" cy="-15" r="6" fill="#2d3748"/>
    
    <!-- Eyes -->
    <circle cx="-2" cy="-17" r="1.5" fill="white"/>
    <circle cx="2" cy="-17" r="1.5" fill="white"/>
    
    <!-- Antennae -->
    <line x1="-3" y1="-20" x2="-6" y2="-25" stroke="#2d3748" stroke-width="1"/>
    <line x1="3" y1="-20" x2="6" y2="-25" stroke="#2d3748" stroke-width="1"/>
  </g>
  
  <!-- Text -->
  <text x="256" y="420" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">
    G
  </text>
</svg>`;
}

// Função para converter SVG para PNG usando Canvas (simulado)
function svgToPng(svgContent, size) {
  // Em um ambiente real, você usaria uma biblioteca como sharp ou canvas
  // Aqui vamos apenas criar um arquivo SVG com o tamanho correto
  const svgWithSize = svgContent.replace('width="512" height="512"', `width="${size}" height="${size}"`);
  return svgWithSize;
}

// Tamanhos de ícones necessários
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Criar diretório de ícones se não existir
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Gerar ícones
console.log('Gerando ícones do PWA...');

const baseIcon = createBaseIcon();

iconSizes.forEach(size => {
  const iconContent = svgToPng(baseIcon, size);
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(iconsDir, filename);
  
  // Como não temos conversão real SVG->PNG, vamos criar um arquivo SVG temporário
  const svgFilename = `icon-${size}x${size}.svg`;
  const svgFilepath = path.join(iconsDir, svgFilename);
  
  fs.writeFileSync(svgFilepath, iconContent);
  console.log(`✅ Criado: ${svgFilename}`);
});

// Criar ícones de atalho
const shortcutIcons = [
  {
    name: 'quiz-shortcut',
    content: `
<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" rx="16" fill="#3b82f6"/>
  <text x="48" y="60" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">?</text>
</svg>`
  },
  {
    name: 'report-shortcut',
    content: `
<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
  <rect width="96" height="96" rx="16" fill="#ef4444"/>
  <path d="M48 20L60 40H36L48 20z" fill="white"/>
  <rect x="44" y="40" width="8" height="36" fill="white"/>
</svg>`
  }
];

shortcutIcons.forEach(icon => {
  const filepath = path.join(iconsDir, `${icon.name}.svg`);
  fs.writeFileSync(filepath, icon.content);
  console.log(`✅ Criado: ${icon.name}.svg`);
});

console.log('\n🎉 Ícones gerados com sucesso!');
console.log('📁 Localização: public/icons/');
console.log('\n⚠️  Nota: Os arquivos foram criados como SVG.');
console.log('   Para produção, converta para PNG usando uma ferramenta como:');
console.log('   - https://convertio.co/svg-png/');
console.log('   - https://cloudconvert.com/svg-to-png');
console.log('   - Ou use uma biblioteca como "sharp" para conversão automática');
