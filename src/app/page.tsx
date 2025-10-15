"use client";

import { ExoHeader } from "@/components/exo-header";
import { ExoHero } from "@/components/exo-hero";
import { ExoFooter } from "@/components/exo-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { SEOJsonLD } from "@/components/seo-json-ld";
import { ThemeProvider } from "next-themes";

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
          </main>
          <ExoFooter />
          <WhatsAppFloat />
        </div>
      </ThemeProvider>
    </>
  );
}