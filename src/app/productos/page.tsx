"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExoHeader } from "@/components/exo-header";
import { ExoFooter } from "@/components/exo-footer";
import { ThemeProvider } from "next-themes";
import { ProductCard } from "@/components/product-card";
import { CustomProjectBanner } from "@/components/CustomProjectBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List, Sparkles, X } from "lucide-react";
import { ProductCard as ProductCardType } from "@/types/product";
import { csvParser } from "@/lib/csv-parser";
import { useRouter } from "next/navigation";

export default function ProductosPage() {
  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("name");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await csvParser.loadProducts();
        const productsData = csvParser.getVisibleProducts();
        const categoriesData = csvParser.getCategories();
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.categoria === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion_corta.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.caracteristicas.some(feature =>
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === "name") {
        return a.nombre.localeCompare(b.nombre);
      } else if (sortBy === "category") {
        return a.categoria.localeCompare(b.categoria);
      }
      return 0;
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const handleViewDetails = (slug: string) => {
    router.push(`/productos/p/${slug}`);
  };

  // Generar sugerencias inteligentes
  const searchSuggestions = useMemo(() => {
    if (searchTerm.length < 2) return [];
    
    const suggestions = new Set<string>();
    const term = searchTerm.toLowerCase();
    
    products.forEach(product => {
      // Sugerencias de nombres
      if (product.nombre.toLowerCase().includes(term)) {
        suggestions.add(product.nombre);
      }
      
      // Sugerencias de categorías
      if (product.categoria.toLowerCase().includes(term)) {
        suggestions.add(product.categoria);
      }
      
      // Sugerencias de características
      product.caracteristicas.forEach(feature => {
        if (feature.toLowerCase().includes(term)) {
          suggestions.add(feature);
        }
      });
    });
    
    return Array.from(suggestions).slice(0, 5);
  }, [searchTerm, products]);

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const searchVariants = {
    idle: { scale: 1, boxShadow: "0 0 0px rgba(59, 130, 246, 0)" },
    focused: { 
      scale: 1.02, 
      boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
      transition: { duration: 0.3 }
    },
  };

  const suggestionVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, y: 0, scale: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, y: -5, scale: 0.95,
      transition: { duration: 0.15 }
    }
  };

  // Limpiar búsqueda con animación
  const clearSearch = () => {
    setSearchTerm("");
  };

  if (isLoading) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <ExoHeader />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Cargando productos...</p>
            </div>
          </main>
          <ExoFooter />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <ExoHeader />
        
        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Nuestros Productos
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Soluciones digitales diseñadas para transformar tu negocio y acelerar tu crecimiento.
              </p>
            </motion.div>

            {/* Banner de Proyecto Personalizado */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <CustomProjectBanner />
            </motion.div>

            {/* Buscador Inteligente con Animaciones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                <div className="space-y-6">
                  {/* Buscador Principal con Autocomplete */}
                  <div className="relative">
                    <motion.div
                      variants={searchVariants}
                      animate={isSearchFocused ? "focused" : "idle"}
                      className="relative"
                    >
                      <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5 z-10" />
                      <Input
                        placeholder="🚀 Busca productos increíbles... (ej: 'logo', 'web', 'digital')"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        className="pl-12 pr-12 h-14 text-lg bg-gradient-to-r from-background/50 to-muted/20 border-2 transition-all duration-300 focus:border-primary/50"
                      />
                      {searchTerm && (
                        <motion.button
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          onClick={clearSearch}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted/50 rounded-full"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      )}
                    </motion.div>

                    {/* Dropdown de Sugerencias Animado */}
                    <AnimatePresence>
                      {isSearchFocused && searchSuggestions.length > 0 && (
                        <motion.div
                          variants={suggestionVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-xl z-50 overflow-hidden"
                        >
                          <div className="p-2">
                            <div className="text-xs text-muted-foreground px-3 py-2 font-medium">
                              ✨ Sugerencias populares
                            </div>
                            {searchSuggestions.map((suggestion, index) => (
                              <motion.button
                                key={suggestion}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => {
                                  setSearchTerm(suggestion);
                                  setIsSearchFocused(false);
                                }}
                                className="w-full text-left px-3 py-2 hover:bg-muted/50 rounded-md transition-colors flex items-center gap-2 text-sm"
                              >
                                <Search className="w-3 h-3 text-muted-foreground" />
                                {suggestion}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Filtros y Controles */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Category Filter */}
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="h-12 bg-gradient-to-r from-muted/30 to-background/50">
                        <SelectValue placeholder="📂 Filtrar por categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">🏷️ Todas las categorías</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {/* Sort */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="h-12 bg-gradient-to-r from-muted/30 to-background/50">
                        <SelectValue placeholder="🔤 Ordenar resultados" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">🔤 Ordenar por nombre</SelectItem>
                        <SelectItem value="category">📂 Ordenar por categoría</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Results count con acciones */}
                    <div className="flex items-center justify-between h-12">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="text-sm px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30"
                        >
                          {filteredProducts.length} resultado{filteredProducts.length !== 1 ? 's' : ''}
                        </Badge>
                      </motion.div>
                      {(selectedCategory !== "all" || searchTerm || sortBy !== "name") && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedCategory("all");
                            setSearchTerm("");
                            setSortBy("name");
                          }}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1 hover:bg-muted/50 rounded-md"
                        >
                          🧹 Limpiar filtros
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Indicadores de filtros activos */}
                  <AnimatePresence>
                    {(selectedCategory !== "all" || searchTerm) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-wrap gap-2 pt-2 border-t border-border/50"
                      >
                        <span className="text-sm text-muted-foreground font-medium">🔥 Filtros activos:</span>
                        {searchTerm && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Badge variant="outline" className="text-xs bg-primary/10 border-primary/30">
                              🔍 "{searchTerm}"
                            </Badge>
                          </motion.div>
                        )}
                        {selectedCategory !== "all" && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                          >
                            <Badge variant="outline" className="text-xs bg-secondary/10 border-secondary/30">
                              📂 {selectedCategory}
                            </Badge>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold mb-4">No se encontraron productos</h3>
                <p className="text-muted-foreground mb-6">
                  Intenta ajustar los filtros o términos de búsqueda más específicos.
                </p>
                <Button 
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchTerm("");
                    setSortBy("name");
                  }}
                  className="bg-gradient-to-r from-primary to-secondary"
                >
                  🧹 Limpiar filtros
                </Button>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.slug} variants={itemVariants}>
                    <ProductCard
                      product={product}
                      onViewDetails={handleViewDetails}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </main>
        
        <ExoFooter />
      </div>
    </ThemeProvider>
  );
}