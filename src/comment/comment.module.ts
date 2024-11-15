import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { ImageModule } from 'src/image/image.module';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    AuthModule,
    UserModule,
    ImageModule,
    TypeOrmModule.forFeature([Comment]),
  ],
})
export class CommentModule {}
