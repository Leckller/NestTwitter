import { Module } from "@nestjs/common";
import AuthGuard from "./Auth.Guard";

@Module({
    providers: [AuthGuard],
    exports: [AuthGuard],
})
export default class GuardModule {};