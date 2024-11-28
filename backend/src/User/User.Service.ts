import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Like, Repository } from "typeorm";
import UserEntity from "./User.entity";
import AuthService from "../Auth/Auth.Service";
import CreateUserDto from "./DTOs/CreateUser.Dto";
import { UserTypeToken } from "../types";
import GetUserResponseDto from "./DTOs/GetUser.Response.Dto";
import LoginUserDto from "./DTOs/LoginUser.Dto";
import ResponseDto from "src/Utils/Response.Dto";
import PostEntity from "src/Post/Post.entity";
import LikeEntity from "src/Like/Like.entity";
import FollowerEntity from "src/Follower/Follower.Entity";

@Injectable()
export default class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private readonly AuthService: AuthService,
        @InjectRepository(PostEntity)
        private postRepository: Repository<PostEntity>,
        @InjectRepository(LikeEntity)
        private readonly likeRepo: Repository<LikeEntity>,
        @InjectRepository(FollowerEntity)
        private readonly followerRepo: Repository<FollowerEntity>,
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

        const { address, name, photo, banner, id } = newUser;

        await this.userRepository.save(newUser);

        const token = this.AuthService.createToken({ address, banner, id: newUser.id, name, photo } as UserTypeToken);

        return new ResponseDto('Usuário criado com sucesso', true, { token, userId: id });

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

    public async getUserById(tokenId: number, userId: number) {

        const user = await this.userRepository
            .createQueryBuilder('user')
            .loadRelationCountAndMap('user.following', 'user.following')
            .loadRelationCountAndMap('user.followers', 'user.followers')
            .where(`user.id = ${userId}`)
            .select([
                'user.id',
                'user.address',
                'user.banner',
                'user.photo',
                'user.name'
            ])
            .getOne();

        if (!user) {
            return new ResponseDto('Usuário não encontrado', true, {});
        }

        const posts = await this.postRepository
            .createQueryBuilder('post')
            .loadRelationCountAndMap('post.comments', 'post.comments')
            .loadRelationCountAndMap('post.likes', 'post.likes')
            .where(`post.user.id = ${userId} AND post.isComment = false`)
            .orderBy('post.created_at', 'DESC')
            .take(5)
            .getMany();

        const userLiked = await this.likeRepo.find({
            where: {
                user: { id: tokenId },
                post: { id: In([...posts.map(p => p.id)]) },
            },
            relations: { post: true, user: true, },
            select: {
                post: { id: true },
                user: { id: true }
            }
        });

        const postsWithLikes = posts.map(p => {
            const isLiked = userLiked.some(pl => pl.post.id === p.id);
            return { ...p, isLiked }
        });

        // Verifica se o usuário segue o perfil.
        const isFollowing = await this.followerRepo.exists({
            where: { followed: { id: userId }, following: { id: tokenId } }
        });

        return new ResponseDto(`User: ${user.name}`, true, { user: { ...user, isFollowing }, posts: postsWithLikes });

    }

    public async getUserPosts(tokenId: number, userId: number, page: number) {
        const posts = await this.postRepository
            .createQueryBuilder('post')
            .loadRelationCountAndMap('post.comments', 'post.comments')
            .loadRelationCountAndMap('post.likes', 'post.likes')
            .where(`post.user.id = ${userId} AND post.isComment = false`)
            .orderBy('post.created_at', 'DESC')
            .take(5)
            .skip(5 * page)
            .getMany();

        const userLiked = await this.likeRepo.find({
            where: {
                user: { id: tokenId },
                post: { id: In([...posts.map(p => p.id)]) },
            },
            relations: { post: true, user: true, },
            select: {
                post: { id: true },
                user: { id: true }
            }
        });

        const postsWithLikes = posts.map(p => {
            const isLiked = userLiked.some(pl => pl.post.id === p.id);
            return { ...p, isLiked }
        });

        // Verifica se o usuário segue o perfil.
        const isFollowing = await this.followerRepo.exists({
            where: { followed: { id: userId }, following: { id: tokenId } }
        });

        return new ResponseDto('User Posts', true, { posts: postsWithLikes });
    }

    public async login(user: LoginUserDto) {

        const findUser = await this.userRepository.findOne({ where: { email: user.email } });

        if (!findUser) {

            throw new UnauthorizedException(new ResponseDto("Email ou senha inválidos", false, {}))

        }

        const { address, name, photo, banner, id } = findUser;

        await this.AuthService.compare(user.password, findUser.password);

        const token = this.AuthService.createToken({ address, banner, id, name, photo } as UserTypeToken);

        return new ResponseDto('Bem vindo de volta!', true, { token, userId: id });

    }

}