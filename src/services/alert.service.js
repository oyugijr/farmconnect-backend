import WebSocket from 'ws';
import prisma from '../config/database.js';
import logger from '../utils/logger.js';

const clients = new Map();

export const initializeWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    ws.on('message', async (message) => {
      try {
        const { token, product } = JSON.parse(message);
        const user = await authenticateUser(token);
        
        clients.set(ws, { userId: user.id, product });
        
        ws.send(JSON.stringify({
          type: 'CONNECTION_SUCCESS',
          message: `Connected to ${product} price alerts`
        }));
      } catch (error) {
        logger.error('WebSocket error:', error);
        ws.close();
      }
    });

    ws.on('close', () => {
      clients.delete(ws);
    });
  });
};

export const broadcastPriceAlert = async (product, priceData) => {
  clients.forEach((client, ws) => {
    if (client.product === product && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'PRICE_ALERT',
        data: priceData
      }));
    }
  });
};