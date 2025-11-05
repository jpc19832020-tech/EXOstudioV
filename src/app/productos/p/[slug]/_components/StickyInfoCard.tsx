"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, Clock, ChevronLeft, X } from "lucide-react";
import Image from "next/image";
import { ProfessionalResult } from "./ProfessionalResult";

interface StickyInfoCardProps {
  name: string;
  category: string;
  shortDesc: string;
  price: {
    amount: number | null;
    currency: string;
    formatted: string;
  };
  features: string[];
  image: string;
  onWhatsapp: () => void;
}

export function StickyInfoCard({
  name,
  category,
  shortDesc,
  price,
  features,
  image,
  onWhatsapp
}: StickyInfoCardProps) {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [isCardVisible, setIsCardVisible] = useState<boolean>(false);
  return (
    <>
      {/* Desktop sticky card */}
      {isCardVisible && (
        <motion.div 
          className="hidden lg:block fixed top-24 right-8 w-80 z-40"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div 
            className="rounded-2xl p-6 backdrop-blur-xl border"
            style={{
              backgroundColor: 'rgba(255,255,255,.06)',
              borderColor: 'rgba(255,255,255,.12)',
              boxShadow: '0 0 28px rgba(53,182,255,.25)'
            }}
          >
            {/* Product image */}
            <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6">
              <Image
                src={image}
                alt={name}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 320px"
              />
            </div>

            {/* Product info */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{name}</h3>
                  <Badge 
                    variant="secondary"
                    className="text-xs"
                    style={{ backgroundColor: '#243447', color: '#F5F7FA' }}
                  >
                    {category}
                  </Badge>
                </div>
                <p className="text-sm" style={{ color: '#A7B2C0' }}>
                  {shortDesc}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{price.formatted}</span>
                <div className="flex items-center gap-1 text-xs" style={{ color: '#35B6FF' }}>
                  <Clock className="w-3 h-3" />
                  <span>Primera propuesta en 48 h</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                {features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#35B6FF' }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="relative">
                <Button
                  onClick={() => {
                    onWhatsapp();
                    setShowResult(true);
                  }}
                  size="lg"
                  className="w-full rounded-full font-semibold transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: '#35B6FF',
                    boxShadow: '0 0 28px rgba(53, 182, 255, 0.25)'
                  }}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Cotizar por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Toggle button for sticky card */}
      <motion.div 
        className="hidden lg:flex fixed top-24 right-8 z-40 flex-col gap-3"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {/* Arrow toggle button */}
        <motion.button
          onClick={() => setIsCardVisible(!isCardVisible)}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: '#35B6FF',
            boxShadow: '0 0 20px rgba(53, 182, 255, 0.3)'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isCardVisible ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <ChevronLeft className="w-6 h-6 text-white" />
          )}
        </motion.button>

        {/* WhatsApp button */}
        <motion.button
          onClick={onWhatsapp}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor: '#25D366',
            boxShadow: '0 0 20px rgba(37, 211, 102, 0.3)'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </motion.button>
      </motion.div>

      {/* Mobile floating bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-4">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl p-4 backdrop-blur-xl border"
          style={{
            backgroundColor: 'rgba(255,255,255,.06)',
            borderColor: 'rgba(255,255,255,.12)',
            boxShadow: '0 0 28px rgba(53,182,255,.25)'
          }}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-sm">{name}</h3>
              <p className="text-lg font-bold">{price.formatted}</p>
            </div>
            <Button
              onClick={onWhatsapp}
              size="lg"
              className="rounded-full font-semibold px-6"
              style={{
                backgroundColor: '#35B6FF',
                boxShadow: '0 0 28px rgba(53, 182, 255, 0.25)'
              }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Cotizar
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Professional Result Modal */}
      <ProfessionalResult isVisible={showResult} onClose={() => setShowResult(false)} />
    </>
  );
}