import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { parse } from 'yaml';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    const swaggerFilePath = resolve(__dirname, '../doc/api.yaml');
    const swaggerFileData = await readFile(swaggerFilePath);
    const stringifiedSwaggerData = String(swaggerFileData);

    const document: OpenAPIObject = parse(stringifiedSwaggerData);

    SwaggerModule.setup('/doc', app, document);
  } catch (err) {
    const errorMessage = 'Swagger Open API UI setup error: %O';

    console.error(errorMessage, err);
  }

  app.useGlobalPipes(new ValidationPipe());

  const PORT = process.env.PORT || 4000;

  await app.listen(PORT);
}

bootstrap();
