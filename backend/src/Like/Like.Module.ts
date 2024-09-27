import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import LikeEntity from "./Like.entity";
import LikeController from "./Like.Controller";
import LikeService from "./Like.Service";
import UserEntity from "src/User/User.entity";
import PostEntity from "src/Post/Post.entity";

@Module({
    controllers: [LikeController],
    exports: [
        TypeOrmModule.forFeature([LikeEntity])
    ],
    imports: [
        TypeOrmModule.forFeature([LikeEntity]),
        TypeOrmModule.forFeature([UserEntity]),
        TypeOrmModule.forFeature([PostEntity])
    ],
    providers: [LikeService]
})
export default class LikeModule {}