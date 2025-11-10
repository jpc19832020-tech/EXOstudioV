"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, 
  Mail, 
  Send, 
  Instagram, 
  Facebook, 
  Youtube,
  Linkedin,
  Twitter,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Sparkles
} from "lucide-react";

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
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
      const whatsappMessage = encodeURIComponent(
        `*Nuevo mensaje desde la web EXO digital*\n\n` +
        `*Nombre:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Mensaje:* ${formData.message}\n\n` +
        `---\nEnviado desde exo.digital`
      );
      
      window.open(`https://wa.me/51925475680?text=${whatsappMessage}`, "_blank");
      
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
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

  const handleSocialClick = (platform: string) => {
    const socialLinks = {
      instagram: "https://www.instagram.com/exo_digitalstudio/",
      facebook: "https://www.facebook.com/people/Exo-DigitalStudio/pfbid0SJtHiwGCc4Dg2SnSLSa9BBybJfzEApEFTedGkkhzUTmzT87xZMBVtdvHZoJzH5wLl/", 
      tiktok: "https://www.tiktok.com/@exodigital_studio?_t=ZS-90UlvsZVMMm&_r=1",
      youtube: "https://www.youtube.com/@exodigitalstudio",
      linkedin: "https://www.linkedin.com/company/exo-digital-studio",
      twitter: "https://twitter.com/exodigital_studio"
    };
    
    const link = socialLinks[platform as keyof typeof socialLinks];
    if (link) {
      window.open(link, "_blank");
    }
  };

  // Definición de redes sociales
  const socialNetworks = [
    {
      name: "Instagram",
      platform: "instagram",
      icon: Instagram,
      color: "from-pink-500 to-purple-600",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
      hoverColor: "hover:bg-pink-500/20",
      description: "Contenido visual diario"
    },
    {
      name: "TikTok", 
      platform: "tiktok",
      icon: TikTokIcon,
      color: "from-black to-red-500",
      bgColor: "bg-black/10",
      borderColor: "border-black/20",
      hoverColor: "hover:bg-black/20",
      description: "Videos creativos"
    },
    {
      name: "Facebook",
      platform: "facebook", 
      icon: Facebook,
      color: "from-blue-600 to-blue-800",
      bgColor: "bg-blue-600/10",
      borderColor: "border-blue-600/20",
      hoverColor: "hover:bg-blue-600/20",
      description: "Comunidad global"
    },
    {
      name: "YouTube",
      platform: "youtube",
      icon: Youtube,
      color: "from-red-600 to-red-700", 
      bgColor: "bg-red-600/10",
      borderColor: "border-red-600/20",
      hoverColor: "hover:bg-red-600/20",
      description: "Tutoriales y demos"
    },
    {
      name: "LinkedIn",
      platform: "linkedin",
      icon: Linkedin,
      color: "from-blue-700 to-blue-800",
      bgColor: "bg-blue-700/10", 
      borderColor: "border-blue-700/20",
      hoverColor: "hover:bg-blue-700/20",
      description: "Red profesional"
    },
    {
      name: "Twitter",
      platform: "twitter",
      icon: Twitter,
      color: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-400/20", 
      hoverColor: "hover:bg-blue-400/20",
      description: "Noticias y actualizaciones"
    }
  ];

  return (
    <section id="contacto" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
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
              Conecta con nosotros
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Elige la forma que prefieras para contactarnos. Estamos disponibles en todas nuestras plataformas.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Formulario de Contacto */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 hover:border-primary/40 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-2 flex items-center gap-3">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  Envíanos un mensaje
                </h3>
                <p className="text-muted-foreground mb-6">
                  Completa el formulario y te contactaremos por WhatsApp
                </p>
                
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">¡WhatsApp abriendo!</h4>
                    <p className="text-muted-foreground">
                      Tu mensaje está listo para enviar en WhatsApp.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Nombre completo
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          className="bg-background/50 border-primary/30 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
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
                          className="bg-background/50 border-primary/30 focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
                          placeholder="tu@email.com"
                        />
                      </div>
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
                        className="bg-background/50 border-primary/30 focus:border-accent/50 focus:ring-2 focus:ring-accent/20 resize-none"
                        placeholder="Cuéntanos sobre tu proyecto..."
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 text-lg py-6"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                        />
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Enviar por WhatsApp
                          <Sparkles className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contacto Directo */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="space-y-6"
            >
              {/* WhatsApp Premium */}
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <WhatsAppIcon className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-green-500">WhatsApp</h4>
                  <p className="text-sm text-muted-foreground mb-4">Respuesta inmediata</p>
                  <Button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-500 text-white hover:bg-green-600"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Abrir WhatsApp
                  </Button>
                </div>
              </div>

              {/* Email Premium */}
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-8 h-8 text-blue-500" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-blue-500">Email</h4>
                  <p className="text-sm text-muted-foreground mb-4">Contacto formal</p>
                  <Button
                    onClick={() => window.open("mailto:exo.digitalstudio@gmail.com", "_blank")}
                    className="w-full bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Gmail
                  </Button>
                </div>
              </div>

              {/* Información adicional */}
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-2xl p-6 border border-primary/20">
                <h4 className="font-semibold mb-4">Información adicional</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Lun - Vie: 9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Lima, Perú</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>+51 925 475 680</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Redes Sociales Premium */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Síguenos en redes sociales</h3>
              <p className="text-muted-foreground">Mantente al día con nuestro contenido y novedades</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {socialNetworks.map((network, index) => (
                <motion.div
                  key={network.platform}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => handleSocialClick(network.platform)}
                    className={`w-full h-auto py-6 flex flex-col items-center gap-3 ${network.bgColor} ${network.borderColor} ${network.hoverColor} hover:scale-105 transition-all duration-300 group`}
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${network.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <network.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-sm">{network.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{network.description}</div>
                    </div>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}