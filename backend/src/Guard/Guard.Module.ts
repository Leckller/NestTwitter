import { Module } from "@nestjs/common";
import AuthGuard from "./Auth.Guard";
import UserModule from "src/User/User.Module";
import AuthModule from "src/Auth/Auth.Module";
import { TypeOrmModule } from "@nestjs/typeorm";
import UserEntity from "src/User/User.entity";

@Module({
    providers: [AuthGuard],
    exports: [AuthGuard],
    imports: [
        UserModule,
        AuthModule,
        TypeOrmModule.forFeature([
            UserEntity
        ])
    ]
})
export default class GuardModule {};