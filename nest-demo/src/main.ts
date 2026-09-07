import { mkdirSync } from 'fs';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const uploadsDir = join(process.cwd(), 'uploads');
  mkdirSync(uploadsDir, { recursive: true });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useStaticAssets(uploadsDir, { prefix: '/uploads/' });

  await app.listen(3000);
  console.log('🚀 NestJS demo running at http://localhost:3000');
  console.log('   文章接口: GET/POST /posts');
  console.log('   上传接口: POST /upload  (字段名 file)');
}

bootstrap();
