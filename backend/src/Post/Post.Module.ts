import { Module } from "@nestjs/common";
import PostController from "./Post.Controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import PostEntity from "./Post.entity";
import PostService from "./Post.Service";
import AuthModule from "../Auth/Auth.Module";
import UserEntity from "../User/User.entity";
import LikeEntity from "src/Like/Like.entity";
import CommentEntity from "src/Comment/Comment.Entity";

@Module({
    providers: [PostService],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            LikeEntity,
            UserEntity,
            PostEntity,
            CommentEntity
        ]),
    ],
    controllers: [PostController],
})
export default class PostModule { }