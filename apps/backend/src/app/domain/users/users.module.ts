import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaClientModule } from '@travel-planer/prisma-client';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaClientModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
