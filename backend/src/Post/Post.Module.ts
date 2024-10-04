import { Module } from "@nestjs/common";
import PostController from "./Post.Controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import PostEntity from "./Post.entity";
import PostService from "./Post.Service";
import AuthModule from "../Auth/Auth.Module";
import UserEntity from "../User/User.entity";
import LikeEntity from "src/Like/Like.entity";

@Module({
    providers: [PostService],
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
        TypeOrmModule.forFeature([UserEntity]),
        TypeOrmModule.forFeature([LikeEntity]),
        AuthModule
    ],
    exports: [
        TypeOrmModule.forFeature([PostEntity])
    ],
    controllers: [PostController],
})
export default class PostModule {}