import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import LikeService from "./Like.Service";
import LikeRequestDto from "./DTOs/Like.Request.Dto";
import AuthGuard from "../Guard/Auth.Guard";
import { GetUser } from "../decorators/User.Decorator";
import { UserTypeToken } from "../types";
import LikeGetDto from "./DTOs/Like.Get.Dto";

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

    @Get()
    public async getLikes(@Body() {postId}: LikeGetDto) {

        return await this.likeService.getLikesByPost(+postId);

    }

};