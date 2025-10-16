const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔄 Iniciando build estático...');

// Generar datos estáticos de productos
console.log('📊 Generando datos estáticos de productos...');
execSync('node scripts/generate-products-data.js', { stdio: 'inherit' });

// Crear directorio out si no existe
if (!fs.existsSync('out')) {
  fs.mkdirSync('out', { recursive: true });
}

// Función para copiar directorios recursivamente
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  fs.readdirSync(src).forEach(file => {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Copiar archivos estáticos
copyDir('.next/static', 'out/_next/static');
copyDir('public', 'out');

// Copiar también el contenido de _next/static a _next/static en out
if (fs.existsSync('.next/static')) {
  copyDir('.next/static', 'out/_next/static');
}

// Copiar y procesar archivos HTML
const serverAppPath = '.next/server/app';
if (fs.existsSync(serverAppPath)) {
  fs.readdirSync(serverAppPath)
    .filter(file => file.endsWith('.html'))
    .forEach(file => {
      const filePath = path.join(serverAppPath, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Reemplazar rutas absolutas con el basePath para GitHub Pages
      // Next.js no está aplicando el basePath correctamente en el build estático
      content = content.replace(/href="\//g, 'href="/EXOstudioV/');
      content = content.replace(/src="\//g, 'src="/EXOstudioV/');
      content = content.replace(/href='\//g, "href='/EXOstudioV/");
      content = content.replace(/src='\//g, "src='/EXOstudioV/");
      
      fs.writeFileSync(path.join('out', file), content);
    });
}

console.log('Build estático completado con éxito');