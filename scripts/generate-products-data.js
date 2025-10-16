const fs = require('fs');
const path = require('path');

function parseCSV(csvContent) {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(';').map(h => h.trim());
  const products = [];
  
  for (let i = 1; i < lines.length; i++) {
    try {
      const values = lines[i].split(';').map(v => v.trim());
      const product = {};
      
      headers.forEach((header, index) => {
        product[header] = values[index] || '';
      });

      // Parse characteristics
      product.caracteristicas = product.caracteristicas 
        ? product.caracteristicas.split(/[,;]/).map(c => c.trim()).filter(c => c)
        : [];

      // Parse images
      product.imagenes = product.imagenes 
        ? product.imagenes.split(',').map(img => img.trim()).filter(img => img)
        : [];

      // Parse price
      let precio = null;
      if (product.precio && product.precio.trim()) {
        const parsedPrice = parseFloat(product.precio.replace(',', '.'));
        if (!isNaN(parsedPrice)) {
          precio = parsedPrice;
        }
      }
      product.precio = precio;

      // Validate currency
      let moneda = '';
      if (product.moneda === 'PEN' || product.moneda === 'USD') {
        moneda = product.moneda;
      }
      product.moneda = moneda;

      // Default CTA WhatsApp if not provided
      product.cta_whatsapp = product.cta_whatsapp?.trim() || `Me interesa ${product.nombre}`;

      // Validate product
      if (product.nombre && product.slug && product.imagenes && product.imagenes.length > 0 && product.estado === 'visible') {
        // Check if main image exists
        const mainImagePath = path.join(process.cwd(), product.imagenes[0]);
        if (fs.existsSync(mainImagePath)) {
          products.push(product);
        } else {
          console.warn(`Main image not found: ${product.imagenes[0]} for product ${product.nombre}`);
        }
      }
    } catch (error) {
      console.error(`Error parsing line ${i + 1}:`, error);
    }
  }
  
  return products;
}

function formatPrice(precio, moneda) {
  if (precio === null || isNaN(precio)) {
    return "Cotizar";
  }

  const symbols = {
    'PEN': 'S/',
    'USD': 'US$',
  };
  
  const symbol = symbols[moneda] || '';
  return `${symbol} ${precio.toFixed(2)}`;
}

function processProductsToCards(products) {
  return products.map(product => {
    const formattedPrice = formatPrice(product.precio, product.moneda);
    
    return {
      nombre: product.nombre,
      slug: product.slug,
      categoria: product.categoria,
      descripcion_corta: product.descripcion_corta,
      caracteristicas: product.caracteristicas,
      precio: {
        amount: product.precio,
        currency: product.moneda,
        formatted: formattedPrice
      },
      imagenPrincipal: product.imagenes[0],
      imagenesAdicionales: product.imagenes.slice(1),
      cta_whatsapp: product.cta_whatsapp
    };
  });
}

function processProductToDetail(product) {
  const formattedPrice = formatPrice(product.precio, product.moneda);
  
  return {
    nombre: product.nombre,
    slug: product.slug,
    categoria: product.categoria,
    descripcion_corta: product.descripcion_corta,
    caracteristicas: product.caracteristicas,
    precio: {
      amount: product.precio,
      currency: product.moneda,
      formatted: formattedPrice
    },
    imagenPrincipal: product.imagenes[0],
    imagenesAdicionales: product.imagenes.slice(1),
    todasLasImagenes: product.imagenes,
    cta_whatsapp: product.cta_whatsapp
  };
}

function main() {
  try {
    console.log('🔄 Generando datos estáticos de productos...');
    
    const csvPath = path.join(process.cwd(), 'data', 'products.csv');
    
    if (!fs.existsSync(csvPath)) {
      console.error('❌ Error: No se encuentra el archivo data/products.csv');
      process.exit(1);
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const products = parseCSV(csvContent);
    
    if (products.length === 0) {
      console.warn('⚠️ No hay productos visibles para procesar');
    }
    
    console.log(`✅ Se procesaron ${products.length} productos válidos`);
    
    // Process products for cards
    const productCards = processProductsToCards(products);
    
    // Process products for details
    const productDetails = {};
    products.forEach(product => {
      productDetails[product.slug] = processProductToDetail(product);
    });
    
    // Create output directory
    const outputDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write products data
    fs.writeFileSync(
      path.join(outputDir, 'products.json'),
      JSON.stringify(productCards, null, 2)
    );
    
    // Write product details data
    fs.writeFileSync(
      path.join(outputDir, 'product-details.json'),
      JSON.stringify(productDetails, null, 2)
    );
    
    console.log('✅ Datos estáticos generados exitosamente');
    console.log(`📁 ${outputDir}/products.json`);
    console.log(`📁 ${outputDir}/product-details.json`);
    
  } catch (error) {
    console.error('❌ Error generando datos estáticos:', error);
    process.exit(1);
  }
}

main();