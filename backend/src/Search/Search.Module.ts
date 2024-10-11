import { Module } from "@nestjs/common";
import { SearchController } from "./Search.Controller";
import { SearchService } from "./Search.Service";
import { TypeOrmModule } from "@nestjs/typeorm";
import PostEntity from "src/Post/Post.entity";
import UserEntity from "src/User/User.entity";
import AuthModule from "src/Auth/Auth.Module";

@Module({
    controllers: [SearchController],
    providers: [SearchService],
    exports: [SearchService],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            PostEntity,
            UserEntity,
        ])
    ]
})
export class SearchModule { }