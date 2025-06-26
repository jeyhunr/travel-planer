import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@travel-planer/prisma-client';

@Injectable()
export class CoffeeReadingService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async getReadings(skip: number, take: number, token?: string) {
    try {
      let where: any = {};

      if (token) {
        const decodedToken = this.jwtService.decode(token.split(' ')[1]) as { email: string };
        const email = decodedToken.email;

        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user) {
          where = { ...where, userUid: user.uid };
        }
      } else {
        where = { ...where, isShared: true };
      }

      const posts = await this.prisma.coffeeReading.findMany({
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
        where,
      });

      return posts.map((x) => ({
        uid: x.uid,
        overallInterpretation: x.overallInterpretation,
        user: x.User.username,
        imageUrl: x.imageUrl,
        createdAt: x.createdAt,
      }));
    } catch (error) {
      throw new InternalServerErrorException('Error getting coffee readings');
    }
  }

  async shareReading(uid: string, token: string) {
    try {
      const decodedToken = this.jwtService.decode(token.split(' ')[1]) as { email: string };
      const email = decodedToken.email;

      const user = await this.prisma.user.findUnique({ where: { email } });
      if (user) {
        await this.prisma.coffeeReading.update({
          where: { uid, userUid: user.uid },
          data: { isShared: true },
        });
      } else {
        throw new InternalServerErrorException('User not found');
      }

      return { message: 'Coffee reading shared successfully.' };
    } catch (error) {
      throw new InternalServerErrorException('Error sharing coffee reading');
    }
  }
}
