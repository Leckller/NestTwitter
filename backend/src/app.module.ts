import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import GuardModule from './Guard/Guard.Module';
import UserModule from './User/User.Module';
import AuthModule from './Auth/Auth.Module';
import PostModule from './Post/Post.Module';
import LikeModule from './Like/Like.Module';
import { SearchModule } from './Search/Search.Module';
import CommentModule from './Comment/Comment.Module';
import FollowerModule from './Follower/Follower.Module';
import SeedModule from './DB/Seeds/Seed.Module';
import LikeEntity from './Like/Like.Entity';
import PostEntity from './Post/Post.Entity';
import UserEntity from './User/User.Entity';
import FollowerEntity from './Follower/Follower.Entity';
import CommentEntity from './Comment/Comment.Entity';

@Module({
  exports: [GuardModule, AuthModule, UserModule],
  imports: [

    GuardModule, UserModule, AuthModule,
    PostModule, LikeModule, SearchModule,
    CommentModule, FollowerModule, SeedModule,

    TypeOrmModule.forRoot({
      type: 'sqlite',
      // port: Number(process.env.DB_PORT) || 3306,
      // host: process.env.DB_HOST || "localhost",
      // username: process.env.DB_USERNAME || "root",
      // password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "nestwitter.db",
      synchronize: true,
      entities: [
        LikeEntity, PostEntity, UserEntity,
        FollowerEntity, CommentEntity
      ],
    })
  ],
})
export class AppModule { }
