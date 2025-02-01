import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import AuthService from "src/Auth/Auth.Service";
import CommentEntity from "src/Comment/Comment.Entity";
import FollowerEntity from "src/Follower/Follower.Entity";
import LikeEntity from "src/Like/Like.Entity";
import PostEntity from "src/Post/Post.Entity";
import UserEntity from "src/User/User.Entity";
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