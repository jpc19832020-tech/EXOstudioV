"use client";

import { ExoHeader } from "@/components/exo-header";
import { ExoHero } from "@/components/exo-hero";
import { ExoPresentation } from "@/components/exo-presentation";
import { ExoProducts } from "@/components/exo-products";
import { ExoContact } from "@/components/exo-contact";
import { ExoFooter } from "@/components/exo-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { SEOJsonLD } from "@/components/seo-json-ld";
import { ThemeProvider } from "next-themes";
import { Head } from "next/head";

export default function Home() {
  return (
    <>
      <SEOJsonLD />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="min-h-screen bg-background text-foreground">
          <ExoHeader />
          <main>
            <ExoHero />
            <ExoPresentation />
            <ExoProducts />
            <ExoContact />
          </main>
          <ExoFooter />
          <WhatsAppFloat />
        </div>
      </ThemeProvider>
    </>
  );
}