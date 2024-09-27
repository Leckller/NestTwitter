import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import AuthGuard from "src/Guard/Auth.Guard";
import PostService from "./Post.Service";
import PostRequestDto from "./DTOs/Post.Request.dto";
import { GetUser } from "src/decorators/User.Decorator";
import { TokenType } from "src/types";

@Controller("post")
@UseGuards(AuthGuard)
export default class PostController {

    constructor(
        private readonly postService: PostService
    ) {}

    @Get("global")
    public async getGlobalPosts() {}

    @Get("circle")
    public async getCircleUserPosts(){}

    @Post()
    public async createPost(@GetUser() userInfo: TokenType, @Body() {text}: PostRequestDto) {

        return await this.postService.createPost(text, userInfo.id)

    }

}