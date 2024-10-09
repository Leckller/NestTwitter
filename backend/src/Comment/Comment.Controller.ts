import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import AuthGuard from "src/Guard/Auth.Guard";
import CommentService from "./Comment.Service";
import CreateCommentRequestDto from "./DTOs/CreateComment.Request.Dto";
import { GetUser } from "src/decorators/User.Decorator";
import { TokenType } from "src/types";

@Controller('Comment')
@UseGuards(AuthGuard)
export default class CommentControler {

    constructor(
        private readonly CommentService: CommentService
    ) { }

    @Post()
    public async createComment(@GetUser() { id }: TokenType, @Body() { postId, text }: CreateCommentRequestDto) {

        return await this.CommentService.createComment({ postId: +postId, text }, +id);

    }

}