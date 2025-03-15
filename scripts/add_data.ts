import { PrismaClient, type Destination } from '@prisma/client';

const DESTINATIONS = [];

async function main(): Promise<void> {
  const prisma = new PrismaClient();

  try {
    for (const destination of DESTINATIONS) {
      await prisma.destination.create({
        data: destination as Destination,
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }

  process.exit(0);
}

main();
