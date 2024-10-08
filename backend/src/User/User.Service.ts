import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import UserEntity from "./User.entity";
import AuthService from "../Auth/Auth.Service";
import CreateUserDto from "./DTOs/CreateUser.Dto";
import { TokenType, UserTypeToken } from "../types";
import GetUserResponseDto from "./DTOs/GetUser.Response.Dto";
import LoginUserDto from "./DTOs/LoginUser.Dto";
import ResponseDto from "src/Utils/Response.Dto";

@Injectable()
export default class UserService {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private readonly AuthService: AuthService
    ) { }

    public async createUser(user: CreateUserDto) {

        if (await this.userRepository.findOne({ where: { email: user.email } })) {

            throw new BadRequestException(new ResponseDto("Já existe um usuário com este email.", false, {}));

        }

        if (await this.userRepository.findOne({ where: { address: user.address } })) {

            throw new BadRequestException(new ResponseDto('Já existe um usuário com este @', false, {}));

        }

        const newUser = this.userRepository.create(user);

        newUser.password = await this.AuthService.encrypt(user.password);

        const { address, name, photo, banner, id, bgColor, textColor } = newUser;

        await this.userRepository.save(newUser);

        const token = this.AuthService.createToken({ address, banner, id: newUser.id, name, photo } as UserTypeToken);

        return new ResponseDto('Usuário criado com sucesso', true, {
            token, user: {
                id, name, photo, address, banner, bgColor, textColor
            }
        });

    }

    public async getUserByAddress(address: string) {

        const user = await this.userRepository.findOne({ where: { address }, relations: { posts: true } });

        if (!user) {

            return new NotFoundException(new ResponseDto('Usuário não encontrado', false, {}));

        }

        const { banner, name, posts, photo, textColor, bgColor } = user;

        return new ResponseDto("Usuário encontrado", true, new GetUserResponseDto(
            banner, name, photo, address, posts, bgColor, textColor));

    }

    public async login(user: LoginUserDto) {

        const findUser = await this.userRepository.findOne({ where: { email: user.email } });

        if (!findUser) {

            throw new UnauthorizedException(new ResponseDto("Email ou senha inválidos", false, {}))

        }

        const { address, name, photo, banner, id, bgColor, textColor } = findUser;

        await this.AuthService.compare(user.password, findUser.password);

        const token = this.AuthService.createToken({ address, banner, id, name, photo } as UserTypeToken);

        return new ResponseDto('Bem vindo de volta!', true, {
            token, user: {
                id, name, photo, address, banner, bgColor, textColor
            }
        });

    }

    public async editColors({ bgColor, textColor, user }: { user: TokenType, bgColor: string, textColor: string }) {

        const findUser = await this.userRepository.findOne({
            where: { id: user.id },
            select: { id: true, bgColor: true, textColor: true, }
        });

        if (!findUser) {

            return new NotFoundException(new ResponseDto('Usuário não encontrado', false, {}));

        }

        findUser.bgColor = bgColor;
        findUser.textColor = textColor;

        await this.userRepository.save(findUser);

        return new ResponseDto("Alterações realizadas com sucesso", true, { user: findUser });

    }

}