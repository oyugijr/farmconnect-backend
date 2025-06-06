import request from 'supertest';
import app from '../../../src/app';
import prisma from '../../setup/testDb';

describe('Market API', () => {
  let authToken;

  beforeAll(async () => {
    // Create test user and get token
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Market Tester',
        location: 'Nairobi',
        primaryProduce: 'tomatoes'
      });
    authToken = response.body.token;

    // Seed market data
    await prisma.marketPrice.create({
      data: {
        product: 'tomatoes',
        price: 52.5,
        market: 'Gikomba',
        trend: 'rising',
        change: 2.5,
        recordedAt: new Date()
      }
    });
  });

  test('GET /market/prices - should require authentication', async () => {
    const response = await request(app)
      .get('/api/market/prices?product=tomatoes');
    expect(response.status).toBe(401);
  });

  test('GET /market/prices - should return market data', async () => {
    const response = await request(app)
      .get('/api/market/prices?product=tomatoes')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('currentPrice');
    expect(response.body.trend).toBe('rising');
  });
});