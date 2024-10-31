import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import AuthService from "src/Auth/Auth.Service";
import CommentEntity from "src/Comment/Comment.Entity";
import FollowerEntity from "src/Follower/Follower.Entity";
import LikeEntity from "src/Like/Like.entity";
import PostEntity from "src/Post/Post.entity";
import UserEntity from "src/User/User.entity";
import SeedService from "./Seed.Service";
import { JwtService } from "@nestjs/jwt";

@Module({
  providers: [AuthService, SeedService, JwtService],
  imports: [
    TypeOrmModule.forFeature([
      UserEntity,
      PostEntity,
      LikeEntity,
      CommentEntity,
      FollowerEntity
    ])
  ]
})
export default class SeedModule { }