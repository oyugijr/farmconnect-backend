import { resetDatabase } from './testDb';

module.exports = async () => {
  await resetDatabase();
  console.log('Global setup completed');
};import { resetDatabase } from './testDb';

module.exports = async () => {
  await resetDatabase();
  console.log('Global setup completed');
};