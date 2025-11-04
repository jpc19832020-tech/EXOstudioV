"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { X, ZoomIn, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";

interface MasonryGalleryProps {
  images: string[];
}

export function MasonryGallery({ images }: MasonryGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Mock gallery images if none provided
  const galleryImages = images.length > 0 ? images : [
    "/EXOstudioV/Imagenes_de_productos/logos/hero.png",
    "/EXOstudioV/Imagenes_de_productos/logos/mock-1.png",
    "/EXOstudioV/Imagenes_de_productos/logos/mock-2.png",
    "/EXOstudioV/Imagenes_de_productos/logos/hero.png",
    "/EXOstudioV/Imagenes_de_productos/logos/mock-1.png",
    "/EXOstudioV/Imagenes_de_productos/logos/mock-2.png"
  ];

  // Define masonry layout
  const masonryLayout = [
    { span: 'col-span-2', images: galleryImages.slice(0, 2) },
    { span: 'col-span-1', images: galleryImages.slice(2, 3) },
    { span: 'col-span-1', images: galleryImages.slice(3, 4) },
    { span: 'col-span-3', images: galleryImages.slice(4, 5) },
    { span: 'col-span-1', images: galleryImages.slice(5, 6) },
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    const newIndex = direction === 'prev' 
      ? (selectedImage - 1 + galleryImages.length) % galleryImages.length
      : (selectedImage + 1) % galleryImages.length;
    
    setSelectedImage(newIndex);
  };

  return (
    <>
      <section ref={ref} className="relative py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Galería adicional
            </h2>
            <p className="text-xl" style={{ color: '#A7B2C0' }}>
              Explora más aplicaciones y variaciones del diseño
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {masonryLayout.map((row, rowIndex) => (
              <div key={rowIndex} className={`space-y-6 ${row.span}`}>
                {row.images.map((image, imageIndex) => {
                  const globalIndex = galleryImages.indexOf(image);
                  return (
                    <motion.div
                      key={globalIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.1 + globalIndex * 0.05
                      }}
                      className="group relative overflow-hidden rounded-2xl cursor-pointer"
                      style={{
                        backgroundColor: 'rgba(255,255,255,.06)',
                        borderColor: 'rgba(255,255,255,.12)'
                      }}
                      onClick={() => openLightbox(globalIndex)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="relative w-full aspect-[4/3] md:aspect-square">
                        <Image
                          src={image}
                          alt={`Galería ${globalIndex + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        
                        {/* Overlay on hover */}
                        <motion.div
                          className="absolute inset-0 flex items-center justify-center"
                          style={{
                            background: 'linear-gradient(to top, rgba(13, 15, 20, 0.8), transparent)'
                          }}
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ZoomIn className="w-8 h-8 text-white" />
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(13, 15, 20, 0.95)' }}
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-[90vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[4/3] md:aspect-square rounded-2xl overflow-hidden">
                <Image
                  src={galleryImages[selectedImage]}
                  alt={`Galería ${selectedImage + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => navigateImage('prev')}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(255,255,255,.12)'
                }}
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={() => navigateImage('next')}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(255,255,255,.12)'
                }}
              >
                <ArrowRight className="w-6 h-6 text-white" />
              </button>

              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(255,255,255,.12)'
                }}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(255,255,255,.12)'
                }}
              >
                <p className="text-sm text-white">
                  {selectedImage + 1} / {galleryImages.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}