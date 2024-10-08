import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import CreateUserDto from "./DTOs/CreateUser.Dto";
import AuthGuard from "../Guard/Auth.Guard";
import UserService from "./User.Service";
import GetUserRequestDto from "./DTOs/GetUser.Request.Dto";
import GetUserResponseDto from "./DTOs/GetUser.Response.Dto";
import LoginUserDto from "./DTOs/LoginUser.Dto";
import editColorsRequestDto from "./DTOs/EditColors.Request.Dto";
import { GetUser } from "src/decorators/User.Decorator";
import { UserTypeToken } from "src/types";

@Controller('user')
export default class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Post()
    public async createUser(@Body() { address, banner, email, name, password, photo }: CreateUserDto) {

        return await this.userService.createUser({ address, banner, email, name, password, photo });

    }

    @Get("/:address")
    @UseGuards(AuthGuard)
    public async getUserByAddress(@Param('address') address) {

        return await this.userService.getUserByAddress(address);

    }

    @Post("login")
    public async login(@Body() { email, password }: LoginUserDto) {

        return await this.userService.login({ email, password });

    }

    @Post("EditColors")
    @UseGuards(AuthGuard)
    public async editColors(@GetUser() user: UserTypeToken, @Body() { bgColor, textColor }: editColorsRequestDto) {

        return await this.userService.editColors({ bgColor, textColor, user });

    }

}