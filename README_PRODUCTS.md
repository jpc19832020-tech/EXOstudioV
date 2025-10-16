# Sistema de Productos EXOstudioV

Este documento describe cómo gestionar el sistema de productos basado en CSV para EXOstudioV.

## 📁 Estructura de Archivos

```
EXOstudioV/
├── data/
│   └── products.csv              # Fuente de datos de productos
├── Imagenes_de_productos/         # Carpeta de imágenes de productos
├── src/
│   ├── types/
│   │   └── product.ts           # Tipos TypeScript para productos
│   ├── lib/
│   │   └── csv-parser.ts        # Utilidad para procesar CSV
│   ├── components/
│   │   ├── product-card.tsx     # Componente de tarjeta de producto
│   │   └── exo-products.tsx     # Componente de sección de productos
│   └── app/
│       ├── productos/
│       │   ├── page.tsx         # Página de listado de productos
│       │   └── p/[slug]/
│       │       └── page.tsx     # Página de detalle de producto
└── .github/workflows/
    └── build-products.yml       # Workflow de automatización
```

## 📝 Cómo Agregar/Editar Productos

### 1. Editar el CSV

Abre el archivo [`data/products.csv`](data/products.csv) y agrega/edita los productos siguiendo esta estructura:

```csv
nombre;slug;categoria;descripcion_corta;caracteristicas;precio;moneda;imagenes;estado;cta_whatsapp
```

**Campos obligatorios:**

- **nombre**: Nombre del producto (ej: "Smart Card")
- **slug**: Identificador único, minúsculas, sin espacios (ej: "smart-card")
- **categoria**: Categoría del producto (ej: "Tarjetas Digitales")
- **descripcion_corta**: Descripción breve (máx. 2 líneas en tarjeta)
- **caracteristicas**: Lista separada por ; o , (ej: "Diseño personalizable;Análisis de interacciones")
- **precio**: Número (si está vacío, muestra "Cotizar")
- **moneda**: PEN para "S/" o USD para "US$"
- **imagenes**: Rutas relativas separadas por comas (ej: "Imagenes_de_productos/hero.png,Imagenes_de_productos/mock-1.png")
- **estado**: "visible" o "oculto"
- **cta_whatsapp**: Mensaje prellenado para WhatsApp (opcional, usa "Me interesa {nombre}" por defecto)

### 2. Agregar Imágenes

Coloca las imágenes en la carpeta [`Imagenes_de_productos/`](Imagenes_de_productos/):

- Formatos soportados: PNG, JPG, WebP
- La primera imagen en el campo `imagenes` será la principal
- Nombra los archivos de forma descriptiva
- Optimiza las imágenes para web (recomendado: max 500KB por imagen)

### 3. Ejemplo Completo

```csv
nombre;slug;categoria;descripcion_corta;caracteristicas;precio;moneda;imagenes;estado;cta_whatsapp
Smart Card;smart-card;Tarjetas Digitales;Tarjeta de presentación inteligente. Comparte tu información instantáneamente.;Diseño personalizable;Análisis de interacciones;Compatibilidad universal;Actualización en tiempo real;100;PEN;Imagenes_de_productos/hero.png,Imagenes_de_productos/mock-1.png;visible;Me interesa la Smart Card EXO
```

## 🚀 Despliegue Automático

El sistema se despliega automáticamente cuando:

### Disparadores Automáticos
- **Push a main**: Cuando se modifica:
  - `data/products.csv`
  - Cualquier archivo en `Imagenes_de_productos/`
  - Componentes de productos
  - Archivos de configuración del sistema

### Disparadores Manuales
- **workflow_dispatch**: Puedes ejecutar manualmente el workflow desde GitHub Actions
- Opción para forzar reconstrucción completa

### Proceso de Build
1. ✅ Validación de estructura del CSV
2. ✅ Verificación de existencia de imágenes
3. ✅ Build del sitio estático
4. ✅ Validación de salida del build
5. ✅ Deploy a GitHub Pages

## 🌐 URLs Generadas

### Listado de Productos
```
https://jpc19832020-tech.github.io/EXOstudioV/productos/
```

### Páginas de Detalle
```
https://jpc19832020-tech.github.io/EXOstudioV/productos/p/{slug}/
```

Ejemplo:
```
https://jpc19832020-tech.github.io/EXOstudioV/productos/p/smart-card/
```

## 📱 WhatsApp Integration

El sistema integra WhatsApp con:

- **Número global**: 51925475680
- **Mensaje personalizado**: Usa el campo `cta_whatsapp` del CSV
- **Mensaje por defecto**: "Me interesa {nombre}" si no se especifica

## 🔧 Validaciones y Tolerancia a Fallos

### Validaciones Automáticas
- ✅ Productos con `estado = visible` únicamente
- ✅ Verificación de campos críticos (nombre, slug, imágenes)
- ✅ Unicidad de slug (prioriza primera aparición)
- ✅ Existencia de archivos de imagen
- ✅ Formato de moneda válido (PEN/USD)

### Manejo de Errores
- ⚠️ Productos con datos incompletos no se publican
- ⚠️ Imágenes no encontradas se reportan en el log
- ⚠️ Slugs duplicados se reportan y solo el primero se publica
- ⚠️ Monedas no reconocidas se tratan como "Cotizar"

## 🎨 Características del Frontend

### Página de Listado
- 📊 Grid responsivo de tarjetas
- 🔍 Búsqueda por nombre, descripción y características
- 🏷️ Filtrado por categoría
- 📋 Ordenamiento por nombre/categoría
- 📱 Diseño mobile-first

### Página de Detalle
- 🖼️ Galería de imágenes
- 💰 Precio formateado (S/ o US$)
- ✅ Lista de características
- 📲 Botón de WhatsApp directo
- 🔗 Navegación de regreso al catálogo

## 🛠️ Desarrollo Local

### Requisitos
- Node.js 20+
- npm

### Instalación
```bash
npm install
```

### Desarrollo
```bash
npm run dev
```

### Build Estático
```bash
npm run build:static
```

## 📈 Monitoreo y Logs

El sistema genera logs automáticos durante el build:

- ✅ Productos procesados exitosamente
- ⚠️ Advertencias de productos omitidos
- ❌ Errores críticos que impiden el build

Revisa los logs en GitHub Actions para diagnosticar problemas.

## 🔮 Funcionalidades Futuras

- 🌐 Generación de WebP automática
- 📊 Sistema de búsqueda local
- 🗺️ Generación de sitemap.xml
- 🖼️ OG images por producto
- 📈 Análisis de interacciones
- 🎨 Temas personalizados por producto

## 🆘 Soporte

Si encuentras problemas:

1. Revisa la estructura del CSV
2. Verifica que las imágenes existan
3. Consulta los logs del build en GitHub Actions
4. Asegúrate de seguir el formato de los campos obligatorios

---

**Última actualización**: Octubre 2024
**Versión**: 1.0.0