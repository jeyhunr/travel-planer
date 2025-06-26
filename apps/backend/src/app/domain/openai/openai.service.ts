import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openaiClient: OpenAI;
  private readonly openAiModel = this.configService.get<string>('OPENAI_MODEL', 'gpt-4o');

  constructor(private readonly configService: ConfigService) {
    this.openaiClient = new OpenAI({
      apiKey: configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async analyzeImageBase64(file: Express.Multer.File, lang: string): Promise<string> {
    try {
      const buffer = readFileSync(file.path);
      const base64Image = buffer.toString('base64');
      const imageUrl = `data:image/jpeg;base64,${base64Image}`;

      const prompt = `
        You are an expert in tasseography (coffee ground reading), skilled in interpreting symbolic patterns formed by coffee grounds inside a coffee cup.

        The output must be written entirely in this language: **${lang}**.

        Please analyze the image provided, which shows the inside of a coffee cup with remaining coffee grounds.

        Your task:
        1. Examine the shapes and patterns visible in the coffee grounds.
        2. Identify any symbolic shapes or figures (such as animals, objects, letters, faces, or natural forms).
        3. For each detected shape, describe its approximate position within the cup, using spatial terms like:
          - top left
          - top center
          - top right
          - middle left
          - center
          - middle right
          - bottom left
          - bottom center
          - bottom right
        4. Give a short visual description of the shape and a symbolic or traditional interpretation.

        Even if the patterns are abstract or ambiguous, provide a creative interpretation.

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

      return response.choices[0].message?.content;
    } catch (error) {
      throw new InternalServerErrorException('Error analyzing image.');
    }
  }
}
