import request from 'supertest';
import app from '../../../src/app';
import prisma from '../../setup/testDb';

describe('Auth API', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterEach(async () => {
    await prisma.user.deleteMany();
  });

  test('POST /auth/register - should register new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Farmer',
        location: 'Nakuru',
        primaryProduce: 'tomatoes'
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body.user.name).toBe('Test Farmer');
  });

  test('POST /auth/register - should reject invalid data', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        name: '',
        location: 'Nakuru',
        primaryProduce: 'invalid'
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toContain('Invalid product type');
  });
});