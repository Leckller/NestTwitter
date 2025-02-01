import { Module } from "@nestjs/common";
import PostController from "./Post.Controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import PostEntity from "./Post.Entity";
import PostService from "./Post.Service";
import AuthModule from "../Auth/Auth.Module";
import UserEntity from "../User/User.Entity";
import LikeEntity from "src/Like/Like.Entity";
import CommentEntity from "src/Comment/Comment.Entity";

@Module({
    providers: [PostService],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            LikeEntity,
            UserEntity,
            PostEntity,
            CommentEntity,
            LikeEntity
        ]),
    ],
    controllers: [PostController],
})
export default class PostModule { }