import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import PostEntity from "./Post.entity";
import { Repository } from "typeorm";
import UserEntity from "../User/User.entity";
import ResponseDto from "src/Utils/Response.Dto";
import PostRequestDto from "./DTOs/Post.Request.dto";
import LikeEntity from "src/Like/Like.entity";

@Injectable()
export default class PostService {

    constructor(
        @InjectRepository(PostEntity) private readonly postRepository: Repository<PostEntity>,
        @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(LikeEntity) private readonly likeRepository: Repository<LikeEntity>,
    ) { }

    private async findUser(userId: number) {

        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {

            throw new NotFoundException(new ResponseDto("Usuário inválido! Faça o login novamente.", false, {}))

        }

        return user;

    }

    public async createPost({ bgColor, text, textColor }: PostRequestDto, userId: number) {

        const user = await this.findUser(userId);

        const post = this.postRepository.create({ bgColor, text, textColor, user: user, likes: [] });

        await this.postRepository.save(post);

        const responsePost = {
            ...post,
            user: {
                id: post.user.id,
                address: post.user.address,
                photo: post.user.photo,
                name: post.user.name,
                bgColor: post.user.bgColor,
                textColor: post.user.textColor,
            },
            // likes: 0 as any usar isso aqui mais tarde
        } as PostEntity

        return new ResponseDto("Post criado!", true, { ...responsePost });

    }

    public async getGlobalPosts(page = 0) {

        const posts = await this.postRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.user", "user")
            .leftJoinAndSelect("post.likes", "like")
            // Conta quantos likes tem
            .loadRelationCountAndMap("post.likes", "post.likes")
            .select([
                "post",
                "user.id", "user.address", "user.photo", "user.name", "user.bgColor", "user.textColor",
            ])
            .take(10)
            .skip(page * 10)
            .getMany();

        return new ResponseDto("Global posts", true, { posts });

    }

    public async deletePost(userId: number, postId: number) {

        try {
            const post = await this.postRepository.findOne({ where: { id: postId }, relations: { user: true } });

            if (!post) {

                throw new NotFoundException(new ResponseDto("Post não encontrado", false, {}));

            }

            if (post.user.id !== userId) {

                throw new BadRequestException(new ResponseDto("Você não tem permissão para fazer isso", false, {}));

            }


            await this.postRepository.delete(post);

            return new ResponseDto("Post deletado", true, {});

        } catch {

            throw new BadRequestException(new ResponseDto("Erro no servidor.", false, {}));

        }

    }

}