import twilio from 'twilio';
import logger from '../utils/logger.js';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

export const sendWhatsAppMessage = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`
    });
    return true;
  } catch (error) {
    logger.error('WhatsApp message failed:', error);
    return false;
  }
};