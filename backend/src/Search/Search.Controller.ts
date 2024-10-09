import { Body, Controller, Get, UseGuards } from "@nestjs/common";
import { SearchService } from "./Search.Service";
import { SearchRequestDto } from "./DTOs/Search.Request.Dto";
import AuthGuard from "src/Guard/Auth.Guard";

@Controller('search')
@UseGuards(AuthGuard)
export class SearchController {

    constructor(
        private readonly searchService: SearchService
    ) { }

    @Get()
    public async search(@Body() { text }: SearchRequestDto) {

        return await this.searchService.search(text);

    }

}
