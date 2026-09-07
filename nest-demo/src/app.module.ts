import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [PostsModule, UploadModule],
})
export class AppModule {}
