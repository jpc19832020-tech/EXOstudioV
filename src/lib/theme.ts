// Sistema de colores centralizado
export const theme = {
  colors: {
    primary: '#35B6FF',
    secondary: '#25D366', // WhatsApp green
    background: {
      dark: '#0D0F14',
      card: 'rgba(255,255,255,.06)',
      overlay: 'rgba(13, 15, 20, 0.98)'
    },
    text: {
      primary: '#F5F7FA',
      secondary: '#A7B2C0'
    },
    border: {
      primary: 'rgba(255,255,255,.12)',
      secondary: 'rgba(255,255,255,.08)'
    },
    shadow: {
      primary: 'rgba(53, 182, 255, 0.3)',
      secondary: 'rgba(37, 211, 102, 0.3)'
    }
  },
  gradients: {
    header: 'linear-gradient(135deg, #35B6FF 0%, #1E90FF 100%)',
    background: 'linear-gradient(135deg, #0D0F14 0%, #1B2636 45%, #243447 100%)'
  }
} as const;

// Utilidades para aplicar estilos de tema
export const getThemeColor = (path: string) => {
  return path.split('.').reduce((obj, key) => obj?.[key], theme.colors);
};

export const getThemeGradient = (name: keyof typeof theme.gradients) => {
  return theme.gradients[name];
};