import { Body, Controller, Post } from "@nestjs/common";
import LikeService from "./Like.Service";
import LikeRequestDto from "./DTOs/Like.Request.Dto";

@Controller("like")
export default class LikeController {

    constructor (
        private readonly likeService: LikeService
    ) {}

    @Post()
    public async like (@Body() {postId, userId}: LikeRequestDto) {

        return await this.likeService.like(+userId, +postId);

    }

};