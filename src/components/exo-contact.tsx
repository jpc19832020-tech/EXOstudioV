"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Send, Instagram, Facebook } from "lucide-react";

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

export function ExoContact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Construir mensaje para WhatsApp
      const whatsappMessage = encodeURIComponent(
        `*Nuevo mensaje desde la web EXO digital*\n\n` +
        `*Nombre:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Mensaje:* ${formData.message}\n\n` +
        `---\nEnviado desde exo.digital`
      );
      
      // Abrir WhatsApp con el mensaje
      window.open(`https://wa.me/51925475680?text=${whatsappMessage}`, "_blank");
      
      // Mostrar éxito y limpiar formulario
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Hola, quiero contactarlos desde su web.`);
    window.open(`https://wa.me/51925475680?text=${message}`, "_blank");
  };

  // Componente SVG para TikTok
  const TikTokIcon = ({ className }: { className?: string }) => (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.26 6.26 0 0 0-1-.05A6.27 6.27 0 0 0 2.81 15.66a6.27 6.27 0 0 0 10.69 4.46 5.94 5.94 0 0 0 1.83-4.31V8.82a8.16 8.16 0 0 0 4.77 1.52v-3.65Z" 
        fill="currentColor"
      />
    </svg>
  );

  const handleSocialClick = (platform: string) => {
    const socialLinks = {
      instagram: "https://instagram.com/exo.digital",
      facebook: "https://facebook.com/exo.digital", 
      tiktok: "https://tiktok.com/@exo.digital"
    };
    
    const link = socialLinks[platform as keyof typeof socialLinks];
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <section id="contacto" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Contacto
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Hablemos de tu proyecto. Estamos listos para transformar tus ideas en realidad digital.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact form */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
                <h3 className="text-2xl font-semibold mb-6">Envíanos un mensaje</h3>
                
                <p className="text-muted-foreground mb-6">
                  Al enviar este formulario, se abrirá WhatsApp con tu mensaje listo para enviar.
                </p>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">¡Abriendo WhatsApp!</h4>
                    <p className="text-muted-foreground">
                      Tu mensaje está listo para enviar en WhatsApp.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nombre
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-background/50 border-border/50 focus:border-primary/50"
                        placeholder="Tu nombre"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-background/50 border-border/50 focus:border-primary/50"
                        placeholder="tu@email.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Mensaje
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-background/50 border-border/50 focus:border-primary/50 resize-none"
                        placeholder="Cuéntanos sobre tu proyecto..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Enviar por WhatsApp
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Quick contact */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-8"
            >
              {/* WhatsApp CTA */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-border/50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                    <WhatsAppIcon className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">WhatsApp directo</h3>
                    <p className="text-muted-foreground">Respuesta inmediata</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Prefieres hablar directamente? Escríbenos por WhatsApp para una respuesta rápida.
                </p>
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 text-white hover:bg-green-600"
                >
                  <WhatsAppIcon className="w-4 h-4 mr-2" />
                  Abrir WhatsApp
                </Button>
              </div>

              {/* Email contact */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Email</h3>
                    <p className="text-muted-foreground">Contacto formal</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-6">
                  Para consultas más detalladas o propuestas comerciales.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open("mailto:hola@exo.digital", "_blank")}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  hola@exo.digital
                </Button>
              </div>

              {/* Social Media */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
                <h3 className="text-xl font-semibold mb-6">Contáctanos en redes sociales</h3>
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleSocialClick("instagram")}
                    className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-gradient-to-br hover:from-pink-500/10 hover:to-orange-500/10 hover:border-pink-500/50"
                  >
                    <Instagram className="w-6 h-6 text-pink-500" />
                    <span className="text-xs">Instagram</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleSocialClick("tiktok")}
                    className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-black/10 hover:border-black/50"
                  >
                    <TikTokIcon className="w-6 h-6" />
                    <span className="text-xs">TikTok</span>
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleSocialClick("facebook")}
                    className="flex flex-col items-center gap-2 h-auto py-4 hover:bg-blue-500/10 hover:border-blue-500/50"
                  >
                    <Facebook className="w-6 h-6 text-blue-500" />
                    <span className="text-xs">Facebook</span>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}