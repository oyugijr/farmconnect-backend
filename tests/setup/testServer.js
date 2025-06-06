import app from '../../../src/app';
import prisma from './testDb';

let server;

export const startServer = async () => {
  await prisma.$connect();
  server = app.listen(4001);
  return server;
};

export const stopServer = async () => {
  await prisma.$disconnect();
  server.close();
};