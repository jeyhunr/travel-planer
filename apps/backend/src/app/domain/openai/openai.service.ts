import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@travel-planer/prisma-client';
import { readFileSync } from 'fs';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openaiClient: OpenAI;
  private readonly openAiModel = this.configService.get<string>('OPENAI_MODEL', 'gpt-4o');

  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {
    this.openaiClient = new OpenAI({
      apiKey: configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async analyzeImageBase64(
    file: Express.Multer.File,
    lang: string,
    token: string
  ): Promise<{ message: string; uid: string }> {
    try {
      const decodedToken = this.jwtService.decode(token.split(' ')[1]);
      const email = decodedToken.email;
      const buffer = readFileSync(file.path);
      const base64Image = buffer.toString('base64');
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;

      const prompt = `
        You are an expert in tasseography (coffee ground reading), skilled in interpreting symbolic patterns formed by coffee grounds inside a coffee cup.

        The output must be written entirely in this language: ${lang}.

        Please analyze the image provided, which shows the inside of a coffee cup with remaining coffee grounds.

        Your task:

        Carefully examine the visible shapes and patterns in the coffee grounds.

        Identify only plausible symbolic shapes or figures (such as animals, objects, letters, faces, or natural forms) — avoid any imaginary or highly speculative interpretations.

        For each recognized shape, provide:

        Its approximate position within the cup, using spatial terms like:

        top left

        top center

        top right

        middle left

        center

        middle right

        bottom left

        bottom center

        bottom right

        A visual description that is detailed and precise — at least 2 sentences explaining the pattern’s form and appearance.

        A symbolic or traditional meaning based on known tasseography interpretations.

        Even if the patterns are abstract or ambiguous, try to extract only realistic symbols and offer a thoughtful interpretation.

        Respond **only** with the following JSON structure, and ensure all content is translated into: **${lang}**

        JSON format:
        {
          "symbols_detected": [
            {
              "shape": "name of the shape or symbol",
              "position": "approximate location within the cup (e.g. top right, center, bottom left)",
              "description": "brief visual description of the pattern",
              "meaning": "symbolic or traditional meaning"
            }
            // ...more symbols
          ],
          "overall_interpretation": "summary reading based on the combination of detected symbols",
          "language": "${lang}"
        }

        If no symbols are detected, return:

        {
          "symbols_detected": [],
          "overall_interpretation": "No meaningful symbols could be identified in the coffee grounds.",
          "language": "${lang}"
        }
        `;

      const response = await this.openaiClient.chat.completions.create({
        model: this.openAiModel,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: imageUrl } },
            ],
          },
        ],
      });

      const user = await this.prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const rawContent = response.choices[0].message?.content ?? '';
      const cleaned = this.extractJsonFromMarkdown(rawContent);
      const analysis = JSON.parse(cleaned);

      const data = await this.prisma.coffeeReading.create({
        data: {
          language: analysis.language,
          overallInterpretation: analysis.overall_interpretation,
          userUid: user.uid,
          imageUrl: file.path,
          symbols: {
            create: analysis.symbols_detected.map((symbol) => ({
              shape: symbol.shape,
              position: symbol.position,
              description: symbol.description,
              meaning: symbol.meaning,
            })),
          },
        },
      });

      return { message: 'Image analysis completed successfully.', uid: data.uid };
    } catch (error) {
      Logger.log(error);
      throw new InternalServerErrorException('Error analyzing image.');
    }
  }

  private extractJsonFromMarkdown(input: string): string {
    return input.replace(/```(?:json)?/g, '').trim();
  }
}
