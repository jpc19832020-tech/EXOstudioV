const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Iniciando test de build...');

try {
  // Limpiar builds anteriores
  console.log('🧹 Limpiando builds anteriores...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true });
  }
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true });
  }

  // Ejecutar build
  console.log('🔨 Ejecutando npm run build...');
  execSync('npm run build', { stdio: 'inherit' });

  // Verificar salida
  console.log('📋 Verificando salida del build...');
  
  if (fs.existsSync('out')) {
    console.log('✅ Directorio out creado');
    
    // Listar archivos importantes
    const importantFiles = [
      'out/index.html',
      'out/productos/index.html',
      'out/.nojekyll'
    ];

    importantFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`✅ ${file} existe`);
      } else {
        console.log(`❌ ${file} no existe`);
      }
    });

    // Contar páginas de productos
    if (fs.existsSync('out/productos/p')) {
      const productPages = fs.readdirSync('out/productos/p', { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
      
      console.log(`📦 Páginas de detalle encontradas: ${productPages.length}`);
      productPages.forEach(page => {
        const indexPath = `out/productos/p/${page}/index.html`;
        if (fs.existsSync(indexPath)) {
          console.log(`  ✅ ${page}/index.html`);
        } else {
          console.log(`  ❌ ${page}/index.html no encontrado`);
        }
      });
    }

    // Verificar contenido del index principal
    try {
      const indexContent = fs.readFileSync('out/index.html', 'utf8');
      if (indexContent.includes('EXOstudioV')) {
        console.log('✅ Index.html contiene basePath correcto');
      } else {
        console.log('⚠️ Index.html puede no tener el basePath correcto');
      }
    } catch (error) {
      console.log('❌ Error leyendo index.html');
    }

  } else {
    console.log('❌ No se creó el directorio out');
  }

  console.log('✅ Test de build completado');

} catch (error) {
  console.error('❌ Error en el test de build:', error.message);
  process.exit(1);
}