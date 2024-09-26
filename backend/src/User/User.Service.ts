import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import UserEntity from "./User.entity";
import AuthService from "src/Auth/Auth.Service";
import CreateUserDto from "./DTOs/CreateUser.Dto";
import { UserTypeToken } from "src/types";

@Injectable()
export default class UserService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        private readonly AuthService: AuthService
    ) {}

    public async createUser (user: CreateUserDto) {

        if(await this.userRepository.findOne({where: {email: user.email}})) {
            
            throw new BadRequestException("Já existe um usuário com este email.");

        }

        if (await this.userRepository.findOne({where: {address: user.address}})) {

            throw new BadRequestException('Já existe um usuário com este @');

        }

        const newUser = this.userRepository.create(user);
        
        const {address, name, photo, banner, id} = newUser;

        await this.userRepository.save(newUser);

        return this.AuthService.createToken({address, banner, id, name, photo} as UserTypeToken)

    }

}