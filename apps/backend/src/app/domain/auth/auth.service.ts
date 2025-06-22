import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../domain/users/users.service';
import { User } from '@prisma/client';
import { PrismaService } from '@travel-planer/prisma-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: ConfigService
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
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
    });

    await this.prisma.token.create({ data: { token: accessToken, userUid: user.uid } });

    return {
      access_token: accessToken,
    };
  }

  async isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedTokens = await this.prisma.token.findFirst({ where: { token } });

    return !!blacklistedTokens;
  }

  async revokeToken(token: string) {
    await this.prisma.token.deleteMany({ where: { token } });

    return { message: 'Token revoked.' };
  }
}
