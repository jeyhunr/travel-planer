import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaClientModule, PrismaService } from '@travel-planer/prisma-client';
import { CoffeeReadingController } from './coffee-reading.controller';
import { CoffeeReadingService } from './coffee-reading.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [CoffeeReadingController],
  providers: [CoffeeReadingService, JwtService, PrismaService],
})
export class CoffeeReadingModule {}
