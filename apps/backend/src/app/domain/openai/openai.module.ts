import { Module } from '@nestjs/common';
import { PrismaClientModule } from '@travel-planer/prisma-client';
import { OpenAIController } from './openai.controller';
import { OpenaiService } from './openai.service';

@Module({
  imports: [PrismaClientModule],
  controllers: [OpenAIController],
  providers: [OpenaiService],
})
export class OpenAIModule {}
