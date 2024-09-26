import { Module } from "@nestjs/common";
import AuthService from "./Auth.Service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    providers: [AuthService],
    exports: [AuthService],
    imports: [
        JwtModule.register({
        secret: process.env.JWT_PASSWORD || 'abcd123'
        }),
    ]
})
export default class AuthModule {};