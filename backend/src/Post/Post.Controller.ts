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
    public async getGlobalPosts(@GetUser() userInfo: TokenType, @Param('page') page: string) {

        return await this.postService.getGlobalPosts(+userInfo.id, +page);

    }

    // Detalhes de um post por ID
    @Get("details/:postId")
    public async getPostsDetails(@GetUser() userInfo: TokenType, @Param() { postId }) {

        return await this.postService.postDetails(+userInfo.id, +postId);

    }

    // Pega os comentários de um post
    @Get("comments/:postId/:page")
    public async getPostComments(@GetUser() userInfo: TokenType, @Param() { postId, page }: { postId: string, page: string }) {

        return await this.postService.getPostComments(+userInfo.id, +postId, +page);

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