import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import LikeEntity from "./Like.Entity";
import LikeController from "./Like.Controller";
import LikeService from "./Like.Service";
import UserEntity from "../User/User.Entity";
import PostEntity from "../Post/Post.Entity";
import AuthModule from "../Auth/Auth.Module";

@Module({
    controllers: [LikeController],
    exports: [
        TypeOrmModule.forFeature([LikeEntity])
    ],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([LikeEntity]),
        TypeOrmModule.forFeature([UserEntity]),
        TypeOrmModule.forFeature([PostEntity])
    ],
    providers: [LikeService]
})
export default class LikeModule { }