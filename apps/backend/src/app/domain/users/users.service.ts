import { ChangePasswordDto, PrismaService } from '@travel-planer/prisma-client';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '@travel-planer/prisma-client';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  private saltOrRounds = this.configService.get<number>('SALT_OR_ROUNDS', 10);

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService
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
        throw new ConflictException('Email or username is already exists');
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

  async changePassword(changePasswordDto: ChangePasswordDto, token: string) {
    try {
      const { currentPassword, password, repeatPassword } = changePasswordDto;
      const decoded = this.jwtService.decode(token.split(' ')[1]);
      const email = decoded.email;

      if (password !== repeatPassword) {
        throw new BadRequestException('Passwords do not match');
      }

      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);

      await this.prisma.user.update({
        where: { uid: user.uid },
        data: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
      });

      return { message: 'Password changed successfully' };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Error changing password');
    }
  }

  async getMe(token: string): Promise<Partial<User> | null> {
    try {
      const decoded = this.jwtService.decode(token.split(' ')[1]);
      const email = decoded.email;

      return this.prisma.user.findUnique({
        where: { email },
        select: {
          email: true,
          firstName: true,
          lastName: true,
          username: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error getting user');
    }
  }
}
