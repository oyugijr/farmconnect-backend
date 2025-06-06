import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export const resetDatabase = async () => {
  const tablenames = await prisma.$queryRaw`
    SELECT tablename FROM pg_tables 
    WHERE schemaname = 'public'
  `;

  for (const { tablename } of tablenames) {
    if (tablename !== '_prisma_migrations') {
      try {
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
        );
      } catch (error) {
        console.error({ error });
      }
    }
  }
};

export const seedTestData = async () => {
  // Create test user
  const user = await prisma.user.create({
    data: {
      id: uuidv4(),
      name: 'Test Farmer',
      location: 'Nakuru',
      primaryProduce: 'tomatoes',
      targetPrice: 45,
      phone: '+254700000000'
    }
  });

  // Create market data
  await prisma.marketPrice.create({
    data: {
      id: uuidv4(),
      product: 'tomatoes',
      price: 52.5,
      market: 'Gikomba Market',
      trend: 'rising',
      change: 7.0,
      recordedAt: new Date()
    }
  });

  // Create buyer
  await prisma.buyer.create({
    data: {
      id: uuidv4(),
      name: 'Green Valley Suppliers',
      location: 'Kiambu',
      phone: '+254712345678',
      product: 'tomatoes',
      quantity: '500kg weekly',
      rating: 4.8,
      active: true
    }
  });

  return { user };
};

export default prisma;