import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import CommentEntity from "./Comment.Entity";
import CommentControler from "./Comment.Controller";
import CommentService from "./Comment.Service";
import AuthModule from "src/Auth/Auth.Module";
import UserEntity from "src/User/User.Entity";
import PostEntity from "src/Post/Post.Entity";
import LikeEntity from "src/Like/Like.Entity";

@Module({
    controllers: [CommentControler],
    providers: [CommentService],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            CommentEntity,
            UserEntity,
            PostEntity,
            LikeEntity,
        ])
    ]

})
export default class CommentModule { }