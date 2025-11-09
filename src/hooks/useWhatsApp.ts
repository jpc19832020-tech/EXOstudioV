import { WHATSAPP_CONFIG } from '@/config/constants';
import { WHATSAPP_TEMPLATES, WhatsAppTemplateKey } from '@/config/whatsapp-templates';

export const useWhatsApp = () => {
  const sendMessage = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${WHATSAPP_CONFIG.BASE_URL}${WHATSAPP_CONFIG.NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const sendTemplate = (template: WhatsAppTemplateKey, ...args: any[]) => {
    let message = '';

    switch (template) {
      case 'PRODUCT_INQUIRY':
        if (args[0]) {
          message = WHATSAPP_TEMPLATES.PRODUCT_INQUIRY(args[0]);
        }
        break;
      case 'GENERAL_QUESTION':
        message = WHATSAPP_TEMPLATES.GENERAL_QUESTION;
        break;
      case 'FAQ_CONTACT':
        message = WHATSAPP_TEMPLATES.FAQ_CONTACT;
        break;
      case 'FOOTER_CONTACT':
        message = WHATSAPP_TEMPLATES.FOOTER_CONTACT;
        break;
      case 'CUSTOM':
        if (args[0]) {
          message = WHATSAPP_TEMPLATES.CUSTOM(args[0]);
        }
        break;
    }

    if (message) {
      sendMessage(message);
    }
  };

  return {
    sendMessage,
    sendTemplate
  };
};