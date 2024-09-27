import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import LikeService from "./Like.Service";
import LikeRequestDto from "./DTOs/Like.Request.Dto";
import AuthGuard from "../Guard/Auth.Guard";
import { GetUser } from "../decorators/User.Decorator";
import { UserTypeToken } from "../types";

@Controller("like")
@UseGuards(AuthGuard)
export default class LikeController {

    constructor (
        private readonly likeService: LikeService
    ) {}

    @Post()
    public async like (@GetUser() {id}: UserTypeToken,@Body() {postId}: LikeRequestDto) {

        return await this.likeService.like(+id, +postId);

    }

};