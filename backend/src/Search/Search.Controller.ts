import { Body, Controller, Get, Param, UseGuards } from "@nestjs/common";
import { SearchService } from "./Search.Service";
import { SearchRequestDto } from "./DTOs/Search.Request.Dto";
import AuthGuard from "src/Guard/Auth.Guard";

@Controller('search')
@UseGuards(AuthGuard)
export class SearchController {

    constructor(
        private readonly searchService: SearchService
    ) { }

    @Get(':page')
    public async search(@Body() { text }: SearchRequestDto, @Param('page') page: string) {

        return await this.searchService.search(text, +page);

    }

}
