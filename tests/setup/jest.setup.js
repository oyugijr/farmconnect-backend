import { resetDatabase } from './testDb';

beforeEach(async () => {
  await resetDatabase();
});

afterAll(async () => {
  // Cleanup any resources
});