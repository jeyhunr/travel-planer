import { CreateUserDto } from '@travel-planer/prisma-client';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return user.password === user.repeatPassword
      ? await this.usersService.createUser(user)
      : new UnauthorizedException('Passwords do not match! Please try again.');
  }
}
