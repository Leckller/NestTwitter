import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import FollowerEntity from "./Follower.Entity";
import FollowerController from "./Follower.Controller";
import FollowerService from "./Follower.Service";
import UserEntity from "../User/User.entity";
import AuthModule from "../Auth/Auth.Module";

@Module({
    controllers: [FollowerController],
    providers: [FollowerService],
    exports: [
        TypeOrmModule.forFeature([
            FollowerEntity
        ])
    ],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            FollowerEntity,
            UserEntity
        ])
    ]
})
export default class FollowerModule {}