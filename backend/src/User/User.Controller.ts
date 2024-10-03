import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import CreateUserDto from "./DTOs/CreateUser.Dto";
import AuthGuard from "../Guard/Auth.Guard";
import UserService from "./User.Service";
import GetUserRequestDto from "./DTOs/GetUser.Request.Dto";
import GetUserResponseDto from "./DTOs/GetUser.Response.Dto";
import LoginUserDto from "./DTOs/LoginUser.Dto";

@Controller('user')
export default class UserController {

    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    public async createUser (@Body() {address, banner, email, name, password, photo}: CreateUserDto) {

        // return -> {Token}
        return await this.userService.createUser({address, banner, email, name, password, photo});

    }

    @Get("/:address")
    @UseGuards(AuthGuard)
    public async getUserByAddress (@Param('address') address) {

        return await this.userService.getUserByAddress(address);

    }

    @Post("login")
    public async login (@Body() {email, password}: LoginUserDto) {
        
        // return -> {Token}
        return await this.userService.login({ email, password});

    }


}