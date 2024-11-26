import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository } from "typeorm";
import UserEntity from "./User.entity";
import AuthService from "../Auth/Auth.Service";
import CreateUserDto from "./DTOs/CreateUser.Dto";
import { TokenType, UserTypeToken } from "../types";
import GetUserResponseDto from "./DTOs/GetUser.Response.Dto";
import LoginUserDto from "./DTOs/LoginUser.Dto";
import ResponseDto from "src/Utils/Response.Dto";
import PostEntity from "src/Post/Post.entity";

@Injectable()
export default class UserService {

    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private readonly AuthService: AuthService,
        @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
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

        const { address, name, photo, banner } = newUser;

        await this.userRepository.save(newUser);

        const token = this.AuthService.createToken({ address, banner, id: newUser.id, name, photo } as UserTypeToken);

        return new ResponseDto('Usuário criado com sucesso', true, { token });

    }

    public async getUserByAddress(address: string) {

        const user = await this.userRepository.findOne({
            where: { address: Like(`%${address}%`) },
            relations: { posts: true }
        });

        if (!user) {

            return new NotFoundException(new ResponseDto('Usuário não encontrado', false, {}));

        }

        const { banner, name, posts, photo } = user;

        return new ResponseDto("Usuário encontrado", true, new GetUserResponseDto(
            banner, name, photo, address, posts
        ));

    }

    public async getUserById(id: number, page: number) {

        const user = await this.userRepository
            .createQueryBuilder('user')
            .loadRelationCountAndMap('user.following', 'user.following')
            .loadRelationCountAndMap('user.followers', 'user.followers')
            .where(`user.id = ${id}`)
            .select([
                'user.id',
                'user.address',
                'user.banner',
                'user.photo',
                'user.name'
            ])
            .getOne();

        const posts = await this.postRepository
            .createQueryBuilder('post')
            .loadRelationCountAndMap('post.comments', 'post.comments')
            .loadRelationCountAndMap('post.likes', 'post.likes')
            .where(`post.user.id = ${id} AND post.isComment = false`)
            .take(10)
            .skip(10 & page)
            .getMany();


        return new ResponseDto(`User: ${user.name}`, true, { user, posts });

    }

    public async login(user: LoginUserDto) {

        const findUser = await this.userRepository.findOne({ where: { email: user.email } });

        if (!findUser) {

            throw new UnauthorizedException(new ResponseDto("Email ou senha inválidos", false, {}))

        }

        const { address, name, photo, banner, id } = findUser;

        await this.AuthService.compare(user.password, findUser.password);

        const token = this.AuthService.createToken({ address, banner, id, name, photo } as UserTypeToken);

        return new ResponseDto('Bem vindo de volta!', true, { token });

    }

}