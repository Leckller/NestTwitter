import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import AuthGuard from "src/Guard/Auth.Guard";
import CommentService from "./Comment.Service";
import CreateCommentRequestDto from "./DTOs/CreateComment.Request.Dto";
import { GetUser } from "src/decorators/User.Decorator";
import { TokenType } from "src/types";
import GetCommentsByUserDto from "./DTOs/GetCommentsByUser.Dto";

@Controller('comment')
@UseGuards(AuthGuard)
export default class CommentControler {

    constructor(
        private readonly CommentService: CommentService
    ) { }

    @UseGuards(AuthGuard)
    @Post()
    public async createComment(@GetUser() { id }: TokenType, @Body() { postId, text }: CreateCommentRequestDto) {

        return await this.CommentService.createComment({ postId: +postId, text }, +id);

    }

    @UseGuards(AuthGuard)
    @Get(':page/:userId')
    public async getCommentsByUser(@Param() { page, userId }) {

        return await this.CommentService.getCommentsByUser(+userId, +page);

    }
}