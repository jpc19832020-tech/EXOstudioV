"use client";

import { ReactNode } from "react";

interface LogoBlueprintLayoutProps {
  children: ReactNode;
}

export function LogoBlueprintLayout({ children }: LogoBlueprintLayoutProps) {
  return (
    <div 
      className="min-h-screen text-white overflow-x-hidden"
      style={{
        backgroundColor: '#0D0F14',
        color: '#F5F7FA',
        '--muted-color': '#A7B2C0',
        '--primary-color': '#35B6FF',
        '--secondary-color': '#243447',
        '--glass-bg': 'rgba(255,255,255,.06)',
        '--border-color': 'rgba(255,255,255,.12)',
        '--glow-shadow': '0 0 28px rgba(53,182,255,.25)',
        '--hero-gradient': 'linear-gradient(135deg, #0D0F14 0%, #1B2636 45%, #243447 100%)'
      } as React.CSSProperties}
    >
      {/* Blueprint grid pattern overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-8 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(53, 182, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(53, 182, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      {/* Golden ratio arcs - very subtle */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full border border-blue-500/5"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 25%, 0 25%)'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full border border-blue-500/5"
          style={{
            clipPath: 'polygon(0 75%, 100% 75%, 100% 100%, 0 100%)'
          }}
        />
      </div>
      
      {/* Anchor points */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-1 h-1 bg-blue-500/20 rounded-full" />
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-500/20 rounded-full" />
        <div className="absolute bottom-32 left-1/3 w-1 h-1 bg-blue-500/20 rounded-full" />
        <div className="absolute bottom-20 right-1/4 w-1 h-1 bg-blue-500/20 rounded-full" />
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}