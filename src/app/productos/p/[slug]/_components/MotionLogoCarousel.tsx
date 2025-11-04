"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

interface MotionLogoCarouselProps {
  videos: string[];
}

export function MotionLogoCarousel({ videos }: MotionLogoCarouselProps) {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Mock videos if none provided
  const mockVideos = [
    "/EXOstudioV/videos/logo-animation-1.mp4",
    "/EXOstudioV/videos/logo-animation-2.mp4",
    "/EXOstudioV/videos/logo-animation-3.mp4"
  ];

  const videoSources = videos.length > 0 ? videos : mockVideos;

  useEffect(() => {
    if (isInView && isPlaying) {
      videoRefs.current[currentVideo]?.play();
    } else {
      videoRefs.current[currentVideo]?.pause();
    }
  }, [isInView, currentVideo, isPlaying]);

  const handleVideoChange = (index: number) => {
    // Pause current video
    if (videoRefs.current[currentVideo]) {
      videoRefs.current[currentVideo].pause();
    }
    
    setCurrentVideo(index);
    
    // Play new video after a brief delay
    setTimeout(() => {
      if (videoRefs.current[index] && isPlaying) {
        videoRefs.current[index].play();
      }
    }, 100);
  };

  const togglePlayPause = () => {
    if (videoRefs.current[currentVideo]) {
      if (isPlaying) {
        videoRefs.current[currentVideo].pause();
      } else {
        videoRefs.current[currentVideo].play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={ref} className="relative py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Del boceto al símbolo en movimiento
          </h2>
          <p className="text-xl" style={{ color: '#A7B2C0' }}>
            Tu logo cobrando vida en cada interacción
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main video container */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-8">
            {/* Blueprint grid overlay */}
            <div 
              className="absolute inset-0 z-10 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(53, 182, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(53, 182, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px'
              }}
            />

            {/* Video */}
            <video
              ref={(el) => {
                videoRefs.current[currentVideo] = el;
              }}
              src={videoSources[currentVideo]}
              autoPlay={isPlaying}
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{ filter: 'contrast(1.1) saturate(1.1)' }}
              onError={(e) => {
                // Fallback to placeholder if video fails
                const target = e.target as HTMLVideoElement;
                target.style.display = 'none';
              }}
            />

            {/* Fallback placeholder */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ backgroundColor: '#243447' }}
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#35B6FF' }}
                >
                  <Volume2 className="w-8 h-8 text-white" />
                </div>
                <p className="text-lg">Animación del logo</p>
              </div>
            </div>

            {/* Controls overlay */}
            <div className="absolute bottom-6 right-6 flex items-center gap-4 z-20">
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(255,255,255,.12)'
                }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Video thumbnails */}
          <div className="grid grid-cols-3 gap-4">
            {videoSources.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleVideoChange(index)}
                className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  currentVideo === index 
                    ? 'border-cyan-500' 
                    : 'border-transparent hover:border-cyan-500/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div 
                  className="absolute inset-0"
                  style={{ backgroundColor: '#243447' }}
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: '#35B6FF' }}
                    >
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-white">Variación {index + 1}</span>
                  </div>
                </div>

                {currentVideo === index && (
                  <motion.div
                    layoutId="active-video"
                    className="absolute inset-0 border-2 rounded-xl"
                    style={{ borderColor: '#35B6FF' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="text-center mt-12 max-w-2xl mx-auto"
        >
          <p className="text-lg leading-relaxed" style={{ color: '#A7B2C0' }}>
            Cada animación está diseñada para comunicar los valores de tu marca, 
            desde sutilezas elegantes hasta movimientos audaces que captan la atención.
          </p>
        </motion.div>
      </div>
    </section>
  );
}