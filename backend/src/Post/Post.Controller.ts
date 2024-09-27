import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import AuthGuard from "../Guard/Auth.Guard";
import PostService from "./Post.Service";
import PostRequestDto from "./DTOs/Post.Request.dto";
import { GetUser } from "../decorators/User.Decorator";
import { TokenType } from "../types";

@Controller("post")
@UseGuards(AuthGuard)
export default class PostController {

    constructor(
        private readonly postService: PostService
    ) {}

    @Get("global")
    public async getGlobalPosts() {

        return await this.postService.getGlobalPosts();

    }

    @Get("circle")
    public async getCircleUserPosts(){}

    @Post()
    public async createPost(@GetUser() userInfo: TokenType, @Body() {text}: PostRequestDto) {

        return await this.postService.createPost(text, userInfo.id)

    }

}