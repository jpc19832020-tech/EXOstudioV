"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, MessageCircle, Eye } from "lucide-react";
import { ProductCard as ProductCardType } from "@/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: ProductCardType;
  onViewDetails: (slug: string) => void;
}

// Componente de logo de WhatsApp
const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(product.cta_whatsapp);
    window.open(`https://wa.me/51925475680?text=${message}`, "_blank");
  };

  const handleViewDetails = () => {
    onViewDetails(product.slug);
  };

  // Truncate description to 2 lines
  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
        <CardHeader className="space-y-4">
          {/* Product Image */}
          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
            <Image
              src={product.imagenPrincipal}
              alt={`${product.nombre} - vista principal`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{product.nombre}</CardTitle>
            <Badge variant="secondary" className="text-xs">
              {product.categoria}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <p className="text-muted-foreground leading-relaxed line-clamp-2">
            {truncateDescription(product.descripcion_corta)}
          </p>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Características:</h4>
            <ul className="space-y-2">
              {product.caracteristicas.slice(0, 3).map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0" />
                  {feature}
                </li>
              ))}
              {product.caracteristicas.length > 3 && (
                <li className="text-xs text-muted-foreground italic">
                  +{product.caracteristicas.length - 3} características más...
                </li>
              )}
            </ul>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <span className="text-lg font-semibold">
              {product.precio.formatted}
            </span>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={handleWhatsAppClick}
            >
              <WhatsAppIcon className="w-4 h-4 mr-2" />
              Cotizar
            </Button>
            <Button
              size="sm"
              className="flex-1"
              onClick={handleViewDetails}
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver detalles
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}