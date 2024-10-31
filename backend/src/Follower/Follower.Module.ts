import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import FollowerEntity from "./Follower.Entity";
import FollowerController from "./Follower.Controller";
import FollowerService from "./Follower.Service";
import UserEntity from "../User/User.entity";
import AuthModule from "../Auth/Auth.Module";
import LikeEntity from "src/Like/Like.entity";

@Module({
    controllers: [FollowerController],
    providers: [FollowerService],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            FollowerEntity,
            UserEntity,
            LikeEntity
        ])
    ]
})
export default class FollowerModule { }