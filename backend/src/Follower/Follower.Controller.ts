import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import AuthGuard from "src/Guard/Auth.Guard";
import FollowerRequestDto from "./DTOs/Follower.Request.Dto";
import FollowerService from "./Follower.Service";

@Controller("follow")
@UseGuards(AuthGuard)
export default class FollowerController {

    constructor (
        private readonly followerService: FollowerService
    ) {}

    @Post()
    public async createFollower (@Body() {followedId, followingId}: FollowerRequestDto) {

        return await this.followerService.createFollower(+followedId, +followingId);

    }

}