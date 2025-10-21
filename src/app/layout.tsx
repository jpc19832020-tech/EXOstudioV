import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EXO digital studio | Tecnología que fluye",
  description: "Creamos productos digitales elegantes y veloces para diferenciar tu marca. Diseño y desarrollo con foco en rendimiento y estética.",
  keywords: ["EXO digital studio", "desarrollo web", "diseño digital", "productos digitales", "tecnología", "UX/UI"],
  authors: [{ name: "EXO digital studio" }],
  openGraph: {
    title: "EXO digital studio | Tecnología que fluye",
    description: "Creamos productos digitales elegantes y veloces para diferenciar tu marca.",
    url: "https://exo.digital",
    siteName: "EXO digital studio",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "EXO digital studio - Tecnología que fluye",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EXO digital studio | Tecnología que fluye",
    description: "Creamos productos digitales elegantes y veloces para diferenciar tu marca.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-277S9JRF4W"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-277S9JRF4W');
          `}
        </Script>
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
