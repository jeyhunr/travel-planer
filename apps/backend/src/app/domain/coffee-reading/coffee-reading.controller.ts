import { Controller, Get, Param } from '@nestjs/common';
import { CoffeeReadingService } from './coffee-reading.service';

@Controller('coffee-readings')
export class CoffeeReadingController {
  constructor(private coffeeReadingService: CoffeeReadingService) {}

  @Get('all/:skip/:take')
  async getReadings(@Param('skip') skip: string, @Param('take') take: string) {
    return await this.coffeeReadingService.getReadings(parseInt(skip), parseInt(take));
  }
}
