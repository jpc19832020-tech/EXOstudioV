// Templates de mensajes de WhatsApp por contexto
export const WHATSAPP_TEMPLATES = {
  PRODUCT_INQUIRY: (productName: string) =>
    `Hola EXO, estoy interesado en ${productName}. ¿Me pueden dar más información sobre precios y proceso?`,

  GENERAL_QUESTION:
    `Hola EXO, tengo una pregunta sobre el Logo Esencial`,

  FAQ_CONTACT:
    `Hola EXO, vi las preguntas frecuentes pero tengo una duda específica`,

  FOOTER_CONTACT:
    `Hola EXO, quiero saber más sobre sus servicios`,

  CUSTOM: (message: string) => message
} as const;

export type WhatsAppTemplateKey = keyof typeof WHATSAPP_TEMPLATES;