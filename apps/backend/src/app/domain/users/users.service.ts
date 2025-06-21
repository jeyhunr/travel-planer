import { PrismaService } from '@travel-planer/prisma-client';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '@travel-planer/prisma-client';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  private saltOrRounds = this.configService.get<number>('SALT_OR_ROUNDS', 10);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { repeatPassword, ...userData } = createUserDto;

      const hashedPassword = await bcrypt.hash(createUserDto.password, this.saltOrRounds);

      const user = await this.prisma.user.create({
        data: {
          ...userData,
          password: hashedPassword,
        },
      });

      return { message: `User ${user.email} created successfully.` };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ConflictException('email already exists');
      }

      throw new InternalServerErrorException('error creating user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
