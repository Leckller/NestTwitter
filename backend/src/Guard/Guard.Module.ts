import { Module } from "@nestjs/common";
import AuthGuard from "./Auth.Guard";
import UserModule from "src/User/User.Module";
import AuthModule from "src/Auth/Auth.Module";

@Module({
    providers: [AuthGuard],
    exports: [AuthGuard],
    imports: [UserModule, AuthModule]
})
export default class GuardModule {};