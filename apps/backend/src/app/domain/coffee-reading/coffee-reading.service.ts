import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@travel-planer/prisma-client';

@Injectable()
export class CoffeeReadingService {
  constructor(private prisma: PrismaService) {}

  getReadings(skip: number, take: number) {
    try {
      return this.prisma.coffeeReading.findMany({
        select: {
          uid: true,
          overallInterpretation: true,
          imageUrl: true,
          createdAt: true,
          User: { select: { username: true } },
        },
        skip,
        take,
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          isShared: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error getting coffee readings');
    }
  }
}
