import { Body, Controller, Delete, Get, Post, UseGuards } from "@nestjs/common";
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

    @Post()
    public async createPost(@GetUser() userInfo: TokenType, @Body() {text,bgColor,textColor}: PostRequestDto) {

        return await this.postService.createPost({text,bgColor,textColor}, userInfo.id)

    }

    @Delete()
    public async deletePost(@GetUser() userInfo: TokenType, @Body() {postId}) {

        return await this.postService.deletePost(userInfo, postId)

    }

}