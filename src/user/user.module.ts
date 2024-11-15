import { AuthModule } from 'src/auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ImageSave } from 'src/image/entities/imageSave.entity';
import { ImageModule } from 'src/image/image.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => ImageModule),
    TypeOrmModule.forFeature([User, ImageSave]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
