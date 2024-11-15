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

    // Últimos 10 posts publicados
    @Get("global/:page")
    public async getGlobalPosts(@Param('page') page) {

        return await this.postService.getGlobalPosts(+page);

    }

    // Detalhes de um post por ID
    @Get("details/:postId")
    public async getPostsDetails(@Param() { postId }) {

        return await this.postService.postDetails(+postId);

    }

    // Pega os comentários de um post
    @Get("comments/:postId/:page")
    public async getPostComments(@Param() { postId, page }: { postId: string, page: string }) {

        return await this.postService.getPostComments(+postId, +page);

    }

    // Criação de um post
    @Post()
    public async createPost(@GetUser() userInfo: TokenType, @Body() { text }: PostRequestDto) {

        return await this.postService.createPost({ text }, userInfo.id)

    }

    // Apaga de um post
    @Delete()
    public async deletePost(@GetUser() userInfo: TokenType, @Body() { postId }) {

        return await this.postService.deletePost(+userInfo.id, postId)

    }

}