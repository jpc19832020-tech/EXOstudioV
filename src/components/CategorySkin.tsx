"use client";

import { CATEGORY_SKINS, DEFAULT_SKIN } from "@/lib/theme";

export function CategorySkin({
  categoria,
  children,
}: { 
  categoria: string; 
  children: React.ReactNode;
}) {
  const skin = CATEGORY_SKINS[categoria as keyof typeof CATEGORY_SKINS] ?? DEFAULT_SKIN;

  const style: React.CSSProperties = {
    // variables CSS scopiadas SOLO dentro del producto
    ['--c-primary' as any]: skin.primary,
    ['--c-secondary' as any]: skin.secondary,
    ['--c-bg' as any]: skin.bg,
    ['--c-text' as any]: skin.text,
    ['--c-accent' as any]: skin.accent,
    ['--c-border' as any]: skin.border,
  };

  return (
    <section className="product-skin" style={style}>
      {children}
    </section>
  );
}