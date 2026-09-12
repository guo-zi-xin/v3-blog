import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { PostsModule } from './posts/posts.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { UploadModule } from './upload/upload.module.js';

@Module({
  imports: [PrismaModule, AuthModule, PostsModule, UploadModule],
})
export class AppModule {}
