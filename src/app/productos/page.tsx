"use client";

import { ExoHeader } from "@/components/exo-header";
import { ExoFooter } from "@/components/exo-footer";
import { ThemeProvider } from "next-themes";

export default function ProductosPage() {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-background text-foreground flex flex-col">
          <ExoHeader />
          
          <main className="flex-1 flex items-center justify-center">
            <div className="container mx-auto px-4 py-32 text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Productos
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Próximamente encontrarás aquí todos nuestros productos y soluciones digitales.
              </p>
              <div className="mt-8">
                <a 
                  href="/" 
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  Volver al inicio
                </a>
              </div>
            </div>
          </main>
          
          <ExoFooter />
        </div>
      </ThemeProvider>
    </>
  );
}