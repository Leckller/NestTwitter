import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import CreateUserDto from "./DTOs/CreateUser.Dto";
import GetUserDto from "./DTOs/GetUser.Dto";
import AuthGuard from "src/Guard/Auth.Guard";

@Controller('user')
export default class UserController {

    @Post()
    public createUser (@Body() body: CreateUserDto) {

    }

    @Get()
    @UseGuards(AuthGuard)
    public getUser (): GetUserDto {

        return new GetUserDto();
        
    }


}