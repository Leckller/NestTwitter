import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import CreateUserDto from "./DTOs/CreateUser.Dto";
import GetUserDto from "./DTOs/GetUser.Dto";
import AuthGuard from "src/Guard/Auth.Guard";
import UserService from "./User.Service";

@Controller('user')
export default class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    public async createUser (@Body() {address, banner, email, name, password, photo}: CreateUserDto) {

        return await this.userService.createUser({address, banner, email, name, password, photo});

    }

    @Get()
    @UseGuards(AuthGuard)
    public getUser (): GetUserDto {

        return new GetUserDto();

    }


}