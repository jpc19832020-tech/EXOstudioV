# Despliegue en GitHub Pages

Tu proyecto ya está configurado para desplegarse automáticamente en GitHub Pages usando GitHub Actions.

## 🚀 Configuración realizada

1. **Next.js configurado para exportación estática**
   - Archivo `next.config.ts` modificado con `output: 'export'`
   - Imágenes configuradas como `unoptimized: true`
   - Base path configurado para `/EXOstudioV`

2. **Workflow de GitHub Actions actualizado**
   - Archivo `.github/workflows/deploy-pages.yml` configurado
   - Construye la aplicación antes de desplegar
   - Usa el directorio `out` generado por Next.js

3. **Scripts de build agregados**
   - Script `build:static` agregado a `package.json`

## 📋 Pasos para desplegar

### 1. Subir tu código a GitHub

Si aún no tienes un repositorio:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/EXOstudioV.git
git push -u origin main
```

### 2. Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en `Settings` (Configuración)
3. En el menú izquierdo, haz clic en `Pages`
4. En `Source`, selecciona `GitHub Actions`

### 3. Activar GitHub Actions

1. Ve a la pestaña `Actions` en tu repositorio
2. Si es la primera vez, haz clic en `I understand my workflows, go ahead and enable them`

## 🔄 Flujo de despliegue automático

Cada vez que hagas un push a la rama `main`:

1. GitHub Actions se ejecutará automáticamente
2. Construirá tu aplicación Next.js
3. Generará la versión estática
4. La desplegará en GitHub Pages

## 🌐 Acceder a tu sitio

Una vez completado el despliegue, tu sitio estará disponible en:
```
https://tu-usuario.github.io/EXOstudioV
```

## ⚠️ Limitaciones importantes

### Funcionalidades no disponibles en GitHub Pages

1. **Socket.IO**: Las funcionalidades de websocket no funcionarán
2. **API Routes**: Las rutas de API que requieren servidor no funcionarán
3. **Base de datos (Prisma)**: No se puede conectar a una base de datos directamente
4. **Server-side rendering**: Solo funciona el contenido estático

### Alternativas recomendadas

Si necesitas estas funcionalidades, considera usar:

- **Vercel**: Perfecto para Next.js con todas las funcionalidades
- **Netlify**: Soporta funciones serverless
- **Railway**: Soporta bases de datos y backend completo

## 🔧 Personalización

### Cambiar el nombre del repositorio

Si cambias el nombre del repositorio, actualiza estas líneas en `next.config.ts`:

```typescript
basePath: process.env.NODE_ENV === 'production' ? '/nuevo-nombre' : '',
assetPrefix: process.env.NODE_ENV === 'production' ? '/nuevo-nombre' : '',
```

### Dominio personalizado

1. En `Settings > Pages`, configura tu dominio personalizado
2. Actualiza el `metadataBase` en `src/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://tu-dominio.com'),
  // ... resto del metadata
};
```

## 🐛 Solución de problemas

### Error 404 en rutas

Asegúrate de que `trailingSlash: true` esté configurado en `next.config.ts`.

### Imágenes no cargan

Verifica que `images: { unoptimized: true }` esté configurado y que las rutas de las imágenes sean relativas.

### Build falla

Revisa los logs de GitHub Actions en la pestaña `Actions` de tu repositorio.

## 📊 Estado actual

✅ Configuración estática completada  
✅ GitHub Actions configurado  
✅ Build local exitoso  
✅ Listo para desplegar  

Tu proyecto está listo para ser desplegado en GitHub Pages. Haz push a tu repositorio y el despliegue se realizará automáticamente.