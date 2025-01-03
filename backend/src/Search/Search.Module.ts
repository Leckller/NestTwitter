import { Module } from "@nestjs/common";
import { SearchController } from "./Search.Controller";
import { SearchService } from "./Search.Service";
import { TypeOrmModule } from "@nestjs/typeorm";
import PostEntity from "src/Post/Post.entity";
import UserEntity from "src/User/User.entity";
import AuthModule from "src/Auth/Auth.Module";
import LikeEntity from "src/Like/Like.entity";
import FollowerEntity from "src/Follower/Follower.Entity";

@Module({
    controllers: [SearchController],
    providers: [SearchService],
    exports: [SearchService],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            PostEntity,
            UserEntity,
            LikeEntity,
            FollowerEntity
        ])
    ]
})
export class SearchModule { }