import { Module } from "@nestjs/common";
import PostController from "./Post.Controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import PostEntity from "./Post.entity";
import PostService from "./Post.Service";
import AuthModule from "src/Auth/Auth.Module";
import UserEntity from "src/User/User.entity";

@Module({
    providers: [PostService],
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
        TypeOrmModule.forFeature([UserEntity]),
        AuthModule
    ],
    exports: [
        TypeOrmModule.forFeature([UserEntity]),
        TypeOrmModule.forFeature([PostEntity])
    ],
    controllers: [PostController],
})
export default class PostModule {}