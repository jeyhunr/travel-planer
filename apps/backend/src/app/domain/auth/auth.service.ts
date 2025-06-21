import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../domain/users/users.service';
import { User } from '@prisma/client';
import { PrismaService } from '@travel-planer/prisma-client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.usersService.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: _, ...result } = user;
    return result;
  }

  async login(user: User) {
    const payload = {
      email: user.email,
      sub: user.uid,
      iat: Math.floor(Date.now() / 1000),
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        name: user.username,
      },
    };
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedTokens = await this.prisma.token.findUnique({ where: { token } });

    return !!blacklistedTokens;
  }
}
