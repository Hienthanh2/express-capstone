import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { ImageModule } from './image/image.module';
import { AuthModule } from './auth/auth.module';
import mySqlConfig from './config/mysql.config';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guards/jwt.guard';
import { JwtStrategy } from './auth/strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(), // keep the config module import first to read to env variables
    TypeOrmModule.forRootAsync({ useFactory: () => mySqlConfig() }),
    CommentModule,
    UserModule,
    ImageModule,
    AuthModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtGuard }, JwtStrategy],
})
export class AppModule {}
