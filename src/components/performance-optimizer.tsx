"use client";

import { useEffect, useRef } from "react";

// Componente para optimizar el rendimiento de animaciones y scroll
export function PerformanceOptimizer() {
  const frameRef = useRef<number | undefined>(undefined);
  const tickingRef = useRef(false);

  useEffect(() => {
    // Optimizar el rendimiento del scroll
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      if (!tickingRef.current) {
        frameRef.current = requestAnimationFrame(() => {
          // Reducir la frecuencia de actualización durante el scroll rápido
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }

      // Throttle scroll events
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Realizar operaciones pesadas solo cuando el scroll se detiene
        tickingRef.current = false;
      }, 150);
    };

    // Reducir la calidad de las animaciones en dispositivos más lentos
    const checkPerformance = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;
      
      if (connection) {
        // Si la conexión es lenta, reducir animaciones
        if (connection.saveData || 
            (connection.effectiveType && connection.effectiveType.includes('2g'))) {
          document.documentElement.setAttribute('data-reduced-motion', 'true');
        }
      }
      
      // Detectar dispositivos de bajo rendimiento
      const memory = (navigator as any).deviceMemory;
      if (memory && memory < 4) { // Menos de 4GB de RAM
        document.documentElement.setAttribute('data-reduced-motion', 'true');
      }
    };

    // Optimizar la carga de imágenes
    const lazyLoadImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src!;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    };

    // Prevenir reflows innecesarios
    const preventLayoutShifts = () => {
      // Añadir dimensiones a las imágenes que no las tienen
      const images = document.querySelectorAll('img:not([width]):not([height])');
      images.forEach(img => {
        // Si la imagen ya está cargada, establecer sus dimensiones naturales
        if ((img as HTMLImageElement).complete) {
          img.setAttribute('width', (img as HTMLImageElement).naturalWidth.toString());
          img.setAttribute('height', (img as HTMLImageElement).naturalHeight.toString());
        } else {
          img.addEventListener('load', () => {
            img.setAttribute('width', (img as HTMLImageElement).naturalWidth.toString());
            img.setAttribute('height', (img as HTMLImageElement).naturalHeight.toString());
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    checkPerformance();
    lazyLoadImages();
    preventLayoutShifts();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      clearTimeout(scrollTimeout);
    };
  }, []);

  return null; // Este componente no renderiza nada visible
}

// Hook para optimizar animaciones basadas en el rendimiento
export function useOptimizedAnimation(threshold = 0.1) {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Verificar si el usuario prefiere movimiento reducido
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    // Verificar si el dispositivo tiene capacidades gráficas limitadas
    const checkDeviceCapabilities = () => {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
      
      if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          // Si es un renderer de bajo rendimiento, reducir animaciones
          if (renderer.includes('Mali') || renderer.includes('Adreno 3') || renderer.includes('Adreno 2')) {
            setShouldAnimate(false);
          }
        }
      }
    };

    checkDeviceCapabilities();

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return {
    shouldAnimate: shouldAnimate && !reducedMotion,
    reducedMotion,
    animationProps: shouldAnimate && !reducedMotion ? {} : { initial: false, animate: false, transition: { duration: 0 } }
  };
}

import { useState } from 'react';