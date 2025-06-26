import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { OpenaiService } from './openai.service';
import { JwtAuthGuard } from '../../common/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../../config';

@Controller('openai')
export class OpenAIController {
  constructor(private openaiService: OpenaiService) {}

  @Post('check')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  @UseGuards(JwtAuthGuard)
  async check(@UploadedFile() image: Express.Multer.File, @Body('language') language: string, @Req() { headers }) {
    return await this.openaiService.analyzeImageBase64(image, language, headers.authorization);
  }
}
