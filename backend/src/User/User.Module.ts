import { Module } from "@nestjs/common";
import UserService from "./User.Service";
import UserController from "./User.Controller";
import AuthModule from "../Auth/Auth.Module";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "./User.entity";
import PostEntity from "src/Post/Post.entity";
import LikeEntity from "src/Like/Like.entity";
import FollowerEntity from "src/Follower/Follower.Entity";

@Module({
    providers: [UserService],
    controllers: [UserController],
    exports: [
        UserService,
        TypeOrmModule.forFeature([UserEntity])
    ],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([UserEntity, PostEntity, LikeEntity, FollowerEntity])
    ]
})
export default class UserModule { }