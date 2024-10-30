import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import AuthGuard from "../Guard/Auth.Guard";
import FollowerRequestDto from "./DTOs/Follower.Request.Dto";
import FollowerService from "./Follower.Service";
import { GetUser } from "../decorators/User.Decorator";
import { UserTypeToken } from "../types";

@Controller("follow")
@UseGuards(AuthGuard)
export default class FollowerController {

    constructor(
        private readonly followerService: FollowerService
    ) { }

    @Post()
    public async follow(@GetUser() { id }: UserTypeToken, @Body() { followedId }: FollowerRequestDto) {

        return await this.followerService.createFollower(+followedId, +id);

    }

    @Get("circle/:page")
    public async circleFollows(@GetUser() { id }: UserTypeToken, @Param('page') page) {

        return await this.followerService.getPostsByFollows(+id, +page);

    }

}