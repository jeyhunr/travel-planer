import { ChangePasswordDto, CreateUserDto } from '@travel-planer/prisma-client';
import { Body, Controller, Post, Put, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return user.password === user.repeatPassword
      ? await this.usersService.createUser(user)
      : new UnauthorizedException('Passwords do not match! Please try again.');
  }

  @Put('update-password')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() user: ChangePasswordDto, @Req() { headers }) {
    return user.password === user.repeatPassword
      ? await this.usersService.changePassword(user, headers.authorization)
      : new UnauthorizedException('Passwords do not match! Please try again.');
  }
}
