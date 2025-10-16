import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), 'data', 'products.csv');
    
    if (!fs.existsSync(csvPath)) {
      return NextResponse.json(
        { error: 'Products file not found' },
        { status: 404 }
      );
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const products = parseCSV(csvContent);
    
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Error reading products:', error);
    return NextResponse.json(
      { error: 'Failed to read products' },
      { status: 500 }
    );
  }
}

function parseCSV(csvContent: string) {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(';').map(h => h.trim());
  const products: any[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    try {
      const values = lines[i].split(';').map(v => v.trim());
      const product: any = {};
      
      headers.forEach((header, index) => {
        product[header] = values[index] || '';
      });

      // Parse characteristics
      product.caracteristicas = product.caracteristicas 
        ? product.caracteristicas.split(/[,;]/).map((c: string) => c.trim()).filter((c: string) => c)
        : [];

      // Parse images
      product.imagenes = product.imagenes 
        ? product.imagenes.split(',').map((img: string) => img.trim()).filter((img: string) => img)
        : [];

      // Parse price
      let precio: number | null = null;
      if (product.precio && product.precio.trim()) {
        const parsedPrice = parseFloat(product.precio.replace(',', '.'));
        if (!isNaN(parsedPrice)) {
          precio = parsedPrice;
        }
      }
      product.precio = precio;

      // Validate currency
      let moneda: 'PEN' | 'USD' | '' = '';
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