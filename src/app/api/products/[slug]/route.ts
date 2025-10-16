import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const csvPath = path.join(process.cwd(), 'data', 'products.csv');
    
    if (!fs.existsSync(csvPath)) {
      return NextResponse.json(
        { error: 'Products file not found' },
        { status: 404 }
      );
    }

    const csvContent = fs.readFileSync(csvPath, 'utf-8');
    const product = findProductBySlug(csvContent, slug);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error reading product:', error);
    return NextResponse.json(
      { error: 'Failed to read product' },
      { status: 500 }
    );
  }
}

function findProductBySlug(csvContent: string, slug: string) {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length < 2) return null;

  const headers = lines[0].split(';').map(h => h.trim());
  
  for (let i = 1; i < lines.length; i++) {
    try {
      const values = lines[i].split(';').map(v => v.trim());
      const product: any = {};
      
      headers.forEach((header, index) => {
        product[header] = values[index] || '';
      });

      if (product.slug === slug) {
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
            return product;
          }
        }
      }
    } catch (error) {
      console.error(`Error parsing line ${i + 1}:`, error);
    }
  }
  
  return null;
}