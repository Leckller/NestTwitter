import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import LikeService from "./Like.Service";
import LikeRequestDto from "./DTOs/Like.Request.Dto";
import AuthGuard from "../Guard/Auth.Guard";
import { GetUser } from "../decorators/User.Decorator";
import { UserTypeToken } from "../types";

@Controller("like")
@UseGuards(AuthGuard)
export default class LikeController {

    constructor(
        private readonly likeService: LikeService
    ) { }

    @UseGuards(AuthGuard)
    @Post()
    public async like(@GetUser() { id }: UserTypeToken, @Body() { postId }: LikeRequestDto) {

        return await this.likeService.like(+id, +postId);

    }

    @Get(':postId/:page')
    public async getLikes(@Param() { postId, page }) {

        return await this.likeService.getLikesByPost(+postId, page);

    }

};