import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import CommentEntity from "./Comment.Entity";
import AuthGuard from "src/Guard/Auth.Guard";
import CommentControler from "./Comment.Controller";
import CommentService from "./Comment.Service";
import AuthModule from "src/Auth/Auth.Module";

@Module({
    controllers: [CommentControler],

    exports: [
        CommentService,
        TypeOrmModule.forFeature([
            CommentEntity
        ])
    ],

    providers: [CommentService],

    imports: [
        AuthModule,
        TypeOrmModule.forFeature([
            CommentEntity
        ])
    ]

})
export default class CommentModule { }