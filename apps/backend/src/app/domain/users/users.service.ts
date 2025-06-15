import { PrismaService } from '@travel-planer/prisma-client';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@travel-planer/prisma-client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: CreateUserDto) {
    return await this.prisma.user.create({ data: user });
  }
}
