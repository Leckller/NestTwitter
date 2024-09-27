import { Module } from "@nestjs/common";
import PostController from "./Post.Controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import PostEntity from "./Post.entity";
import PostService from "./Post.Service";
import AuthModule from "src/Auth/Auth.Module";

@Module({
    providers: [PostService],
    imports: [
        TypeOrmModule.forFeature([PostEntity]),
        AuthModule
    ],
    exports: [
        TypeOrmModule.forFeature([PostEntity])
    ],
    controllers: [PostController],
})
export default class PostModule {}