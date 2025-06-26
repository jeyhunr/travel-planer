import { Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CoffeeReadingService } from './coffee-reading.service';
import { JwtAuthGuard } from '../../common/guard';

@Controller('coffee-readings')
export class CoffeeReadingController {
  constructor(private coffeeReadingService: CoffeeReadingService) {}

  @Get('all/:skip/:take')
  @UseGuards(JwtAuthGuard)
  async getReadings(@Param('skip') skip: string, @Param('take') take: string) {
    return await this.coffeeReadingService.getReadings(parseInt(skip), parseInt(take));
  }

  @Get('my/:skip/:take')
  @UseGuards(JwtAuthGuard)
  async getMyReadings(@Param('skip') skip: string, @Param('take') take: string, @Req() { headers }) {
    return await this.coffeeReadingService.getReadings(parseInt(skip), parseInt(take), headers.authorization);
  }

  @Put('share/:uid')
  @UseGuards(JwtAuthGuard)
  async shareReading(@Param('uid') uid: string, @Req() { headers }) {
    return await this.coffeeReadingService.shareReading(uid, headers.authorization);
  }

  @Get('details/:uid')
  @UseGuards(JwtAuthGuard)
  async getReadingDetails(@Param('uid') uid: string) {
    return await this.coffeeReadingService.getDetails(uid);
  }
}
