import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import CommentEntity from "./Comment.Entity";
import CommentControler from "./Comment.Controller";
import CommentService from "./Comment.Service";
import AuthModule from "src/Auth/Auth.Module";
import UserEntity from "src/User/User.entity";
import PostEntity from "src/Post/Post.entity";

@Module({
    controllers: [CommentControler],
    providers: [CommentService],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            CommentEntity,
            UserEntity,
            PostEntity
        ])
    ]

})
export default class CommentModule { }