import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
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
    ) { }

    @Get("global/:page")
    public async getGlobalPosts(@Param('page') page) {

        return await this.postService.getGlobalPosts(+page);

    }

    @Get("details/:postId/:page")
    public async getPostsDetails(@Param() { postId, page }) {

        return await this.postService.postDetails(+postId, +page);

    }

    @Post()
    public async createPost(@GetUser() userInfo: TokenType, @Body() { text, bgColor, textColor }: PostRequestDto) {

        return await this.postService.createPost({ text, bgColor, textColor }, userInfo.id)

    }

    @Delete()
    public async deletePost(@GetUser() userInfo: TokenType, @Body() { postId }) {

        return await this.postService.deletePost(+userInfo.id, postId)

    }

}