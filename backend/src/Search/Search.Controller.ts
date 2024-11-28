import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { SearchService } from "./Search.Service";
import { SearchRequestDto } from "./DTOs/Search.Request.Dto";
import AuthGuard from "src/Guard/Auth.Guard";
import { GetUser } from "src/decorators/User.Decorator";
import { TokenType } from "src/types";

@Controller('search')
@UseGuards(AuthGuard)
export class SearchController {

    constructor(
        private readonly searchService: SearchService
    ) { }

    @Get(':page')
    public async search(@GetUser() token: TokenType, @Body() { text }: SearchRequestDto, @Param('page') page: string) {

        return await this.searchService.search(+token.id, text, +page);

    }

}
