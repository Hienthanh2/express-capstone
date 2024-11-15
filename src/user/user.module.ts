import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Image } from 'src/image/entities/image.entity';
import { ImageSave } from 'src/image/entities/imageSave.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Comment, Image, ImageSave])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
