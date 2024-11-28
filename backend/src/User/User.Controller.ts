import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import CreateUserDto from "./DTOs/CreateUser.Dto";
import AuthGuard from "../Guard/Auth.Guard";
import UserService from "./User.Service";
import LoginUserDto from "./DTOs/LoginUser.Dto";
import { TokenType } from "src/types";
import { GetUser } from "src/decorators/User.Decorator";

@Controller('user')
export default class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    public async createUser(@Body() { address, banner, email, name, password, photo }: CreateUserDto) {

        return await this.userService.createUser({ address, banner, email, name, password, photo });

    }

    @Get("address/:address")
    @UseGuards(AuthGuard)
    public async getUserByAddress(@Param('address') address) {

        return await this.userService.getUserByAddress(address);

    }

    @Get("id/:id")
    @UseGuards(AuthGuard)
    public async getUserById(@GetUser() userInfo: TokenType, @Param() { id }: { id: string }) {

        return await this.userService.getUserById(+userInfo.id, +id);

    }

    @Get("id/:id/:page")
    @UseGuards(AuthGuard)
    public async getUserPosts(@GetUser() userInfo: TokenType, @Param() { id, page }: { id: string, page: string }) {

        return await this.userService.getUserPosts(+userInfo.id, +id, +page);

    }

    @Post("login")
    public async login(@Body() { email, password }: LoginUserDto) {

        return await this.userService.login({ email, password });

    }

}