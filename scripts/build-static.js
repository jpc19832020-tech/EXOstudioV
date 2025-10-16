const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build estático para GitHub Pages...');

// Verificar que existe el directorio de salida de Next.js
const nextOutPath = path.join(process.cwd(), 'out');
if (!fs.existsSync(nextOutPath)) {
  console.error('❌ Error: No se encontró el directorio "out". Ejecuta primero "npm run build"');
  process.exit(1);
}

// Crear archivo .nojekyll para GitHub Pages
fs.writeFileSync(path.join(nextOutPath, '.nojekyll'), '');

// Función para copiar directorios recursivamente
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

//Crear archivo .nojekyll para GitHub Pages
fs.writeFileSync(path.join(nextOutPath, '.nojekyll'), '');

// Verificar archivos críticos
const criticalFiles = [
  'index.html',
  'productos/index.html'
];

console.log('📋 Verificando archivos críticos...');
for (const file of criticalFiles) {
  const filePath = path.join(nextOutPath, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} encontrado`);
  } else {
    console.log(`⚠️ ${file} no encontrado`);
  }
}

// Verificar páginas de detalle de productos
const productosDir = path.join(nextOutPath, 'productos', 'p');
if (fs.existsSync(productosDir)) {
  const productPages = fs.readdirSync(productosDir);
  console.log(`📦 Se encontraron ${productPages.length} páginas de detalle de productos`);
}

// Listar estructura de directorios
function listDir(dir, prefix = '') {
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      console.log(`${prefix}📁 ${item}/`);
      if (prefix.length < 8) { // Limitar profundidad
        listDir(fullPath, prefix + '  ');
      }
    } else {
      console.log(`${prefix}📄 ${item}`);
    }
  });
}

console.log('\n📂 Estructura generada:');
listDir(nextOutPath);

console.log('\n✅ Build estático completado con éxito');
console.log('🌐 El sitio está listo para deploy en GitHub Pages');