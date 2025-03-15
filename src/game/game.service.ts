import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { getRandomDatum } from 'common/utils/getRandom';

@Injectable()
export class GameService {
  constructor(private prismaService: PrismaService) {}

  async submitGuess({
    userId,
    guess,
  }: {
    userId: string;
    guess: string;
  }): Promise<
    { isCorrect: true; funFact: string } | { isCorrect: false; trivia: string }
  > {
    const ongoingSession = await this.prismaService.gameSession.findFirst({
      where: { userId, isComplete: false },
    });

    if (!ongoingSession) {
      throw new BadRequestException('No ongoing session found');
    }

    const destinations = await this.prismaService.destination.findMany({
      where: { city: { in: [guess, ongoingSession.destinationId] } },
    });

    const userDestination = destinations.find((d) => d.city === guess);
    const correctDestination = destinations.find(
      (d) => d.city === ongoingSession.destinationId,
    )!;

    const isCorrect = correctDestination?.city === userDestination?.city;

    if (!isCorrect) {
      return {
        isCorrect,
        trivia: getRandomDatum(correctDestination.trivia ?? [])!,
      };
    }

    await this.prismaService.$transaction(async (tx) => {
      await tx.gameSession.updateMany({
        where: {
          userId,
          destinationId: ongoingSession.destinationId,
          isComplete: false,
        },
        data: { isComplete: true, isCorrect },
      });
      await tx.user.update({
        where: { id: userId },
        data: { score: { increment: 1 } },
      });
    });

    return {
      isCorrect,
      funFact: getRandomDatum(correctDestination.fun_facts ?? [])!,
    };
  }
}
