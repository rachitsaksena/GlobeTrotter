import { Injectable } from '@nestjs/common';
import type { Destination } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { getRandomDatum } from 'common/utils/getRandom';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DestinationsService {
  constructor(private prismaService: PrismaService) {}

  async getPreviousOrNewDestinationHints(userId: string): Promise<{
    hints: Destination['clues'];
  }> {
    // 1. Check for an incomplete session
    const incompleteSession = await this.prismaService.gameSession.findFirst({
      where: { userId, isComplete: false },
      select: { destinationId: true },
    });

    // 2. If an incomplete session exists, return the pending destination
    if (incompleteSession) {
      const destination = await this.prismaService.destination.findUnique({
        where: { city: incompleteSession.destinationId },
      });
      return { hints: destination!.clues };
    }

    // 3. Get the user's solved destinations
    const solvedDestinations = await this.prismaService.gameSession.findMany({
      where: { userId, isCorrect: true },
      select: { destinationId: true },
    });

    // 4. Fetch a random unsolved destination using TABLESAMPLE
    let destinations = await this.prismaService.$queryRaw<Destination[]>`
      SELECT * FROM "Destination"
      TABLESAMPLE BERNOULLI (1)
      ${solvedDestinations.length ? Prisma.sql`WHERE "city" NOT IN (${Prisma.join(solvedDestinations.map((d) => d.destinationId))})` : Prisma.empty}
      LIMIT 1
    `;

    // 5. If no destination is found, retry with a larger sample size
    if (!destinations[0]) {
      destinations = await this.prismaService.$queryRaw<Destination[]>`
        SELECT * FROM "Destination"
        ${solvedDestinations.length ? Prisma.sql`WHERE "city" NOT IN (${Prisma.join(solvedDestinations.map((d) => d.destinationId))})` : Prisma.empty}
        LIMIT 1
      `;
    }

    // 6. If still no destination, return a message
    if (!destinations?.length) {
      return { hints: [] };
    }

    const destination = getRandomDatum(destinations)!;

    // 7. Create a new game session for the fetched destination
    await this.prismaService.gameSession.create({
      data: {
        userId,
        destinationId: destination.city,
      },
    });

    return { hints: destination.clues };
  }
}
