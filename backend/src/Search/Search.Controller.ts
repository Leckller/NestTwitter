import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { SearchService } from "./Search.Service";
import AuthGuard from "src/Guard/Auth.Guard";
import { GetUser } from "src/decorators/User.Decorator";
import { TokenType } from "src/types";

@Controller('search')
@UseGuards(AuthGuard)
export class SearchController {

    constructor(
        private readonly searchService: SearchService
    ) { }
    @Get('users/:text/:page')
    public async searchUsers(@GetUser() token: TokenType, @Param() { text, page }: { text: string, page: string }) {
        return await this.searchService.searchUsers(+token.id, text, +page);
    }

    @Get('posts/:text/:page')
    public async searchPosts(@GetUser() token: TokenType, @Param() { text, page }: { text: string, page: string }) {
        return await this.searchService.searchPosts(+token.id, text, +page);
    }

    @Get('/:text')
    public async search(@GetUser() token: TokenType, @Param() { text }: { text: string }) {

        return await this.searchService.search(+token.id, text);

    }

}
