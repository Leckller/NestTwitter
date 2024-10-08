import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '.';
import GuardModule from './Guard/Guard.Module';
import UserModule from './User/User.Module';
import AuthModule from './Auth/Auth.Module';
import PostModule from './Post/Post.Module';
import LikeModule from './Like/Like.Module';
import FollowerModule from './Follower/Follower.Module';
import { SearchModule } from './Search/Search.Module';

@Module({
  exports: [GuardModule, AuthModule, UserModule],
  imports: [
    GuardModule,
    UserModule,
    AuthModule,
    PostModule,
    LikeModule,
    SearchModule,
    FollowerModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: Number(process.env.DB_PORT) || 3306,
      host: process.env.DB_HOST || "localhost",
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "nestwitter",
      entities: [entities.LikeEntity, entities.PostEntity, entities.UserEntity, entities.FollowerEntity],
    })
  ],
})
export class AppModule { }
