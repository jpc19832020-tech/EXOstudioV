const fs = require('fs');
const path = require('path');

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

// Copiar y procesar archivos HTML
const serverAppPath = '.next/server/app';
if (fs.existsSync(serverAppPath)) {
  fs.readdirSync(serverAppPath)
    .filter(file => file.endsWith('.html'))
    .forEach(file => {
      const filePath = path.join(serverAppPath, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Reemplazar rutas absolutas con el basePath para GitHub Pages
      content = content.replace(/href="\//g, 'href="/EXOstudioV/');
      content = content.replace(/src="\//g, 'src="/EXOstudioV/');
      content = content.replace(/href='\//g, "href='/EXOstudioV/");
      content = content.replace(/src='\//g, "src='/EXOstudioV/");
      
      fs.writeFileSync(path.join('out', file), content);
    });
}

console.log('Build estático completado con éxito');