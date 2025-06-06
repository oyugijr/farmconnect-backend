import prisma from './testDb';

module.exports = async () => {
  await prisma.$disconnect();
  console.log('Global teardown completed');
};