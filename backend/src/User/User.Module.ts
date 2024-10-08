import { Module } from "@nestjs/common";
import UserService from "./User.Service";
import UserController from "./User.Controller";
import AuthModule from "../Auth/Auth.Module";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "./User.entity";

@Module({
    providers: [UserService],
    controllers: [UserController],
    exports: [
        UserService,
        TypeOrmModule.forFeature([UserEntity])
    ],
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([UserEntity])
    ]
})
export default class UserModule {}