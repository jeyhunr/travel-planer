import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './domain/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './domain/auth/auth.module';
import * as Joi from 'joi';
import { OpenAIModule } from './domain/openai/openai.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CoffeeReadingModule } from './domain/coffee-reading/coffee-raading.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    OpenAIModule,
    CoffeeReadingModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        SALT_OR_ROUNDS: Joi.number().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        OPENAI_API_KEY: Joi.string().required(),
        OPENAI_MODEL: Joi.string().required(),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
