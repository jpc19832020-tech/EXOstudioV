"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExoHeader } from "@/components/exo-header";
import { ExoFooter } from "@/components/exo-footer";
import { ThemeProvider } from "next-themes";
import { ProductCard } from "@/components/product-card";
import { CustomProjectBanner } from "@/components/CustomProjectBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, Grid, List } from "lucide-react";
import { ProductCard as ProductCardType } from "@/types/product";
import { csvParser } from "@/lib/csv-parser";
import { useRouter } from "next/navigation";

export default function ProductosPage() {
  const [products, setProducts] = useState<ProductCardType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductCardType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
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

            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar productos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nombre</SelectItem>
                      <SelectItem value="category">Categoría</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Results count */}
                  <div className="flex items-center justify-center">
                    <Badge variant="secondary">
                      {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Banner de Proyecto Personalizado */}
            <CustomProjectBanner />

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <h3 className="text-2xl font-semibold mb-4">No se encontraron productos</h3>
                <p className="text-muted-foreground mb-6">
                  Intenta ajustar los filtros o términos de búsqueda.
                </p>
                <Button onClick={() => {
                  setSelectedCategory("all");
                  setSearchTerm("");
                  setSortBy("name");
                }}>
                  Limpiar filtros
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