import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import CreateUserDto from "./DTOs/CreateUser.Dto";
import AuthGuard from "../Guard/Auth.Guard";
import UserService from "./User.Service";
import GetUserRequestDto from "./DTOs/GetUser.Request.Dto";
import GetUserResponseDto from "./DTOs/GetUser.Response.Dto";

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

    @Get()
    @UseGuards(AuthGuard)
    public async getUser (@Body() {address}: GetUserRequestDto): Promise<GetUserResponseDto> {

        return await this.userService.getUserByAddress(address);

    }

    @Post("login")
    public async login (@Body() {address, banner, email, name, password, photo}: CreateUserDto) {
        
        // return -> {Token}
        return await this.userService.login({address, banner, email, name, password, photo});

    }


}